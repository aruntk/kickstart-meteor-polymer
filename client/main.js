import '../imports/startup/client/router.js';

Meteor.startup(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((err) => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
});
