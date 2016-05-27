import './test-layout.html';
import '../components/test-element.js';
import "@polymer/paper-elements/paper-elements.html";
import "@polymer/paper-styles/paper-styles.html";
import "@polymer/iron-pages/iron-pages.html";
import "@polymer/iron-flex-layout/classes/iron-flex-layout.html";

Polymer({
  is:"test-layout",
  behaviors:[mwcMixin,mwcRouter],
  getMeteorData:function(){
    this.set("status",Meteor.status().status);
    if(!Meteor.isCordova){
      this.notCordova = true;
    }
  },
  properties:{
    mwcRoute:{
      type:Object,
      name:"landing",
      params:{"view":"home"}
    },
    status:{
      type:String
    },
    notCordova:Boolean

  },
  second:function(){
    this.set("mwcRoute.params.view", "second"); 
  },
  home:function(){

    this.set("mwcRoute.params.view", "home"); 
  }
});


