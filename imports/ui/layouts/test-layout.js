import './test-layout.html';

Polymer({
  is:"test-layout",
  behaviors:[mwcMixin,mwcRouter],
  tracker:function(){
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


