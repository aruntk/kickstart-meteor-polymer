Polymer({
  is:"test-element",
  behaviors:[mwcMixin], //reactive data source mwc:mixin
  getMeteorData:function(){
    this.set("status",Meteor.status().status);
  },
  properties:{
    name:{
      type:String,
      value:"Arun Kumar"
    },
    nickname:{
      type:String,
      value:"tkay"
    },
    show:{type:String,
      value:"show"},
      nndHidden:{
        type:Boolean,
        value:true
      },
      status:{
        type:String
      }
  },
  showNickName:function(){
    this.nndHidden = !this.nndHidden;
    this.show = this.nndHidden ? "show" : "hide";
  }

})


