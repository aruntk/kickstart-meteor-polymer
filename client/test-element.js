Polymer({
  is:"test-element",
  behaviors:[mwcMixin], //reactive data source mwc:mixin
  getMeteorData:function(){
    this.set("status",Meteor.status().status);
  },
  properties:{
    status:{
      type:Object
    }
  }
})
