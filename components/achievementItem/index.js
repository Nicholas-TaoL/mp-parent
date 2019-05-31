//Component Object
Component({
  properties: {
    mineLists: {
      type:Array
    },
    showDialog: {
      type:false
    },
    value: {
      type:Object
    },
    type: {
      type:String
    }

  },
  data: {
    basUrl:'https://api.qiandengli.com/attachment/wx_images',

  },
  methods: {
    toggleDialog() {
      this.setData({
        showDialog: !this.data.showDialog
      });
    },
  },
  created: function() {
    

  },
  attached: function() {

  },
  ready: function() {

  },
  moved: function() {

  },
  detached: function() {

  },
});
  
