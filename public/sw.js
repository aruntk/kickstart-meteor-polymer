const HTMLToCache = '/';
const version = 'kmp-1'; // remember to change this version before every deployment

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(version).then((cache) => {
    cache.add(HTMLToCache).then(self.skipWaiting());
  }));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map((cacheName) => {
      if (version !== cacheName) {
        return caches.delete(cacheName);
      }
      return null;
    }))).then(self.clients.claim())
  );
});

function removeHash(element) {
  if (typeof element === 'string') {
    return element.split('?hash=')[0];
  }
  return null;
}
function hasHash(element) {
  if (typeof element === 'string') {
    return /\?hash=.*/.test(element);
  }
  return null;
}

function hasSameHash(firstUrl, secondUrl) {
  if (typeof firstUrl === 'string' && typeof secondUrl === 'string') {
    return /\?hash=(.*)/.exec(firstUrl)[1] === /\?hash=(.*)/.exec(secondUrl)[1];
  }
  return null;
}

self.addEventListener('fetch', (event) => {
  const requestToFetch = event.request.clone();
  event.respondWith(
    caches.match(event.request.clone()).then((cached) => {
      // We don't return cached HTML (except if fetch failed)
      if (cached) {
        const resourceType = cached.headers.get('content-type');
        // We only return non css/js/html cached response e.g images
        if (!hasHash(event.request.url) && !/text\/html/.test(resourceType)) {
          return cached;
        }

        // If the CSS/JS didn't change since it's been cached, return the cached version
        if (hasHash(event.request.url) && hasSameHash(event.request.url, cached.url)) {
          return cached;
        }
      }
      return fetch(requestToFetch).then((response) => {
        const clonedResponse = response.clone();
        const contentType = clonedResponse.headers.get('content-type');
        const noResponse = !clonedResponse || clonedResponse.status !== 200 || clonedResponse.type !== 'basic';
        if (noResponse || /\/sockjs\//.test(event.request.url)) {
          return response;
        }

        if (/html/.test(contentType)) {
          caches.open(version).then(cache => cache.put(HTMLToCache, clonedResponse));
        } else {
          // Delete old version of a file
          if (hasHash(event.request.url)) {
            caches.open(version).then(cache => cache.keys().then(keys => keys.forEach((asset) => {
              if (new RegExp(removeHash(event.request.url)).test(removeHash(asset.url))) {
                cache.delete(asset);
              }
            })));
          }

          caches.open(version).then(cache => cache.put(event.request, clonedResponse));
        }
        return response;
      }).catch(() => {
        if (hasHash(event.request.url)) return caches.match(event.request.url);
        // If the request URL hasn't been served from cache and isn't sockjs we suppose it's HTML
        else if (!/\/sockjs\//.test(event.request.url)) return caches.match(HTMLToCache);
        // Only for sockjs
        return new Response('No connection to the server', {
          status: 503,
          statusText: 'No connection to the server',
          headers: new Headers({ 'Content-Type': 'text/plain' }),
        });
      });
    })
  );
});
