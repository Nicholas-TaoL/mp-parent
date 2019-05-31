//Component Object
const app = getApp();

  
Component({
  properties: {
    mineLists: {
      type:Array
    },
    showDialog: {
      type:false
    }

  },
  data: {
  },
  methods: {
    toggleDialog() {
      this.setData({
        showDialog: !this.data.showDialog
      });
    },
    shareClick(){
      this.triggerEvent('parentShare')
    },
  },
  created: function() {
console.log(this.data);

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
  
