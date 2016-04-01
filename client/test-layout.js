Polymer({
  is:"test-layout",
  behaviors:[mwcMixin,mwcRouter],
  getMeteorData:function(){
    this.set("status",Meteor.status().status);
  },
  properties:{
    mwcRoute:{
      type:Object,
      name:"landing",
      params:{"view":"home"}
    },
    status:{
      type:String
    }

  },
  second:function(){
    this.set("mwcRoute.params.view", "second"); 
  },
  home:function(){

    this.set("mwcRoute.params.view", "home"); 
  }
});


