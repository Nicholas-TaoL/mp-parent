//Component Object
Component({
  properties: {
    mineLists: {
      type:Array
    },
    showDialog: {
      type: Boolean
    },
    isHid : {
      type: Boolean
    }

  },
  data: {
  },
  methods: {
    toggleDialog() {
      this.setData({
        showDialog: !this.data.showDialog,
        isHid: false,
      });
      this.triggerEvent('parentEvent', false)
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
  
