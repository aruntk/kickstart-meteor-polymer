# Synthesis is meteor + polymer

![synthesis1](https://cloud.githubusercontent.com/assets/6007432/14216652/9da7131a-f867-11e5-9f84-6dd75d60dd45.gif)

## Setup


#### clone the repo

`git clone git@github.com:aruntk/kickstart-meteor-polymer.git`

#### Install npm dependencies

`npm install`

>Do not use meteor npm install. Instead use npm install @polymer/components-name


## Usage

###Directory structure

![synth](https://cloud.githubusercontent.com/assets/6007432/14591625/5bea78d6-0532-11e6-82aa-7f86caf6798d.png)

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

// ***** Loading order is important. ******

import 'webcomponents.js/webcomponents-lite.min.js'
import "@polymer/polymer/polymer.html";
import '../../ui';

```

```js
//imports/ui/layouts/test-layout.js
import './test-layout.html';
import "@polymer/iron-pages/iron-pages.html";

Polymer({
  is:"test-layout",
  behaviors:[mwcMixin,mwcRouter],
  getMeteorData:function(){
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

> IMPORTANT. Inside @polymer/neon-animation/web-animations.html
> change `<script src="../web-animations-js/web-animations-next-lite.min.js"></script>` to `<script src="../../web-animations-js/web-animations-next-lite.min.js"></script>`

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




