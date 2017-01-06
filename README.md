> Use npm for polymer instead of bower. https://github.com/aruntk/kickstart-meteor-polymer/tree/npm

> Use app-route element for routing instead of flow router https://github.com/aruntk/kickstart-meteor-polymer-with-app-route

# Synthesis is meteor + polymer

![synthesis1](https://cloud.githubusercontent.com/assets/6007432/14216652/9da7131a-f867-11e5-9f84-6dd75d60dd45.gif)

## Usage

### Installation.

#### Clone the repo 
```sh
git clone git@github.com:aruntk/kickstart-meteor-polymer.git your-app-folder
```
[change remote url](https://help.github.com/articles/changing-a-remote-s-url/).

#### Building

Type the following in shell. Script install bower components and npm packages.
```sh
#shell
cd your-app-folder
./build.sh
```
cleanup bower_components script is also there in build.sh

#### Add a component 

components are inside imports/ui/bower_components

1. Install it as `./bower.sh install --save example-component`.

2. Input component name `example-component` to import `example-component/example-component.html`. If you want to import something else (for eg behavior/script/css) skip this step by pressing enter and then manually add it to the `imports/ui/imports.html` file.


### Running
```sh
meteor
```
### Polymer Settings

Create client/lib/settings.js

Why lib directory ? Settings code should run before anything else. 

```js
/* client/lib/settings.js */
window.Polymer = {
  //dom: 'shadow',
  lazyRegister: true
};
```
### Offline First

Service worker caching is enabled in this app. 

Service Worker - [public/sw.js](public/sw.js).

Initializing - [client/main.js](client/main.js). 

Web Manifest - [public/web.manifest.js](public/web.manifest.js). [client/main.html](client/main.html#L5).

More about Service Worker - https://developers.google.com/web/fundamentals/getting-started/primers/service-workers

This will cache all your assets, js, html, css etc.

What this wont do - It'll not cache db data. 

To do this there are two methods

1. Minimongo caching - Use [ground:db](https://github.com/GroundMeteor/db)

2. Use [iron-local-storage](https://elements.polymer-project.org/elements/iron-localstorage)

To check this feature 

1. Browser console -> Network tab -> check offline -> Reload window
2. Open the app in mobile chrome browser. Select settings -> add to home screen. Go to home screen and click on the mwc icon.

How to open app on mobile browser - https://developers.google.com/web/tools/chrome-devtools/remote-debugging/

### Directory structure

![synth](https://cloud.githubusercontent.com/assets/6007432/21349548/882a7e88-c6d8-11e6-9a69-512e7294553f.png)

you can add js in separate file or you can add it inside the element html file using script tag.

client/your-element.html



```js
//client/main.js

import '../imports/startup/client/router.js';

```

```html
<!-- client/main.html -->
<head>
  <title>Synthesis</title>
  <style>
body{
  padding:0px;
  margin:0px;
}
  </style>
</head>
<body class="fullbleed">
  <mwc-layout id="demo-landing">
    <div region="header"></div>
    <div region="main"></div>
  </mwc-layout>
</body>
```
#### Routing . 

```js
//client/your-router.js

FlowRouter.wait();

document.addEventListener("WebComponentsReady", function() {

  FlowRouter.initialize({
  });
});

FlowRouter.route("/:view?", {
  name:'landing',
  triggersEnter:[function(c,r){
    if(!c.params.view)
      r("/home");
  }],
  action:function(params,queryParams){
    mwcLayout.render("demo-landing",{"main":"test-layout"});
  }
});


import '../../ui/layouts/test-layout.js';

```

```js
//imports/ui/layouts/test-layout.js
import './test-layout.html';

Polymer({
  is:"test-layout",
  behaviors:[mwcMixin,mwcRouter],
  tracker:function(){
    this.set("status",Meteor.status().status);
  },
  
...

});

```

```html

<link rel="import" href="../components/test-element.html">
<dom-module id="test-layout">
  <style>
  /*style goes here */
    ... 
    
  </style>
  <template>
    <paper-header-panel class="fit layout">
    
     ...
     
    </paper-header-panel>
  </template>
</dom-module>

```


bower_components are kept inside imports/ui/bower_components folder.

bower.json

```json
{
    "dependencies": {
        "paper-elements": "PolymerElements/paper-elements#^1.0.5",
        "iron-pages": "PolymerElements/iron-pages#^1.0.0",
        "polymer": "Polymer/polymer#^1.0.0"
    },
    "name": "synthesis-demo",
    "version": "0.0.1"
}

```



### Docs

Use meteor data reactively inside polymer components - https://github.com/meteorwebcomponents/mixin/blob/master/README.md

Reactively route polymer projects with flowrouter - https://github.com/meteorwebcomponents/router/blob/master/README.md

How to render polymer elements with mwc:layout - https://github.com/meteorwebcomponents/layout/blob/master/README.md




### Forum 

https://forums.meteor.com/t/polymer-meteor-with-meteor-webcomponents-packages/20536




### MWC packages included.

[mwc:synthesis](https://github.com/meteorwebcomponents/synthesis) -  Synthesis is meteor + polymer.

[mwc:mixin](https://github.com/meteorwebcomponents/mixin) -  Polymer data package

[mwc:router](https://github.com/meteorwebcomponents/router) - Flowrouter with polymer


[MWC Layout](https://github.com/meteorwebcomponents/layout) - polymer layout renderer . Added using bower.



### Other Packages Used

[Flow Router](https://github.com/kadirahq/flow-router) - Carefully Designed Client Side Router for Meteor


