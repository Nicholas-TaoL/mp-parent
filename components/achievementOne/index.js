//Component Object
Component({
  properties: {
    achieveOnes: {
      type:Array
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
    saveImg() {
      this.triggerEvent('saveImgClivk')
    }
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
  
