> Use npm for polymer instead of bower. https://github.com/aruntk/kickstart-meteor-polymer/tree/npm

> Use app-route element for routing instead of flow router https://github.com/aruntk/kickstart-meteor-polymer-with-app-route

# Synthesis is meteor + polymer

![synthesis1](https://cloud.githubusercontent.com/assets/6007432/14216652/9da7131a-f867-11e5-9f84-6dd75d60dd45.gif)

## Usage

### Running

vulcanize the public/imports.html file to build.html before starting meteor

```sh
vulcanize --inline-css --inline-scripts --strip-comments public/imports.html > imports/ui/build.html && meteor

```
 or run the run shell file kept in root folder

```sh
./run.sh
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

###Directory structure

![synth](https://cloud.githubusercontent.com/assets/6007432/16890239/5ce6756e-4b0a-11e6-8198-59fa2b8d6b08.png)

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

  <script src='/bower_components/webcomponentsjs/webcomponents-lite.min.js'></script>
  <link rel="import" href="/build.html">
</head>
<body class="fullbleed">
  <mwc-layout id="demo-landing">
    <div region="header"></div>
    <div region="main"></div>
  </mwc-layout>
</body>
```
####Routing . 

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



bower_components are kept inside public/bower_components folder.

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





