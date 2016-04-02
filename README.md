# Synthesis is meteor + polymer

![synthesis1](https://cloud.githubusercontent.com/assets/6007432/14216652/9da7131a-f867-11e5-9f84-6dd75d60dd45.gif)

## Usage

Define your elements in the client folder.

you can add js in separate file or you can add it inside the element html file using script tag.

client/test-element.html


```html
<dom-module id="test-element">
  <template>
        name : {{name}}
  </template>
</dom-module>
```
client/test-element.js

```js
Polymer({
  is:"test-element",
  properties:{
    name:{
      type:String,
      value:"Arun Kumar"
  }
})
```

Define an index file anywhere in any file. 
You can add separate files for head and body, define multiple head/body tags.

client/your-index.html
```html

<head>
  <title>Synthesis</title>
</head>

<body class="fullbleed">

  <mwc-layout id="demo-landing">
    <div region="main"></div>
  </mwc-layout>

</body>

```
Routing . client/your-router.js

```js

FlowRouter.wait();

document.addEventListener("WebComponentsReady", function() {
  FlowRouter.initialize({});
});

FlowRouter.route("/", {
  name:'demo',
  action:function(p,q){
    mwcLayout.render("demo-layout",{"main":"test-element"});
  }
});

```

bower_components are kept inside public folder.

bower.json (public/bower.json)

```json
{
    "dependencies": {
        "iron-elements": "PolymerElements/iron-elements#^1.0.0",
        "neon-elements": "PolymerElements/neon-elements#^1.0.0",
        "paper-elements": "PolymerElements/paper-elements#^1.0.5",
        "polymer": "Polymer/polymer#^1.0.0"
    },
    "name": "mwc-synthesis",
    "version": "0.0.1"
}

```

config.vulcanize

```json

{
  "polyfill": "/bower_components/webcomponentsjs/webcomponents.min.js",
  "imports": [
    "/bower_components/font-roboto/roboto.html",
    "/bower_components/iron-elements/iron-elements.html",
    "/bower_components/paper-elements/paper-elements.html",
    "/bower_components/neon-animation/neon-animation.html",
    "/bower_components/mwc-layout/mwc-layout.html",
    "/bower_components/polymer/polymer.html"
  ]
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

[differential:vulcanize](https://atmospherejs.com/differential/vulcanize) to vulcanize polymer elements instead of adding them in the head directly.

[Flow Router](https://github.com/kadirahq/flow-router) - Carefully Designed Client Side Router for Meteor
