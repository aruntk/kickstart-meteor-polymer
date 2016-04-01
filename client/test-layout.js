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
  edit:function(){
    this.set("mwcRoute.params.view", "edit"); 
  },
  home:function(){

    this.set("mwcRoute.params.view", "home"); 
  }
});


