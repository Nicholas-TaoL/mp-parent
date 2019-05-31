//Component Object
Component({
  properties: {
    mineLists: {
      type: Array
    },
    showDialog: {
      type: false
    },
    hide: {
      type:Boolean
    },
    toastDurating:{
      type: Number
    },
    type:{
      type:String
    },
    desMsg: {
      type: String
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
    closeToast(){
      let that = this;
      this.setData({
        hide: !that.data.hide
      })
      this.triggerEvent('close')
    }
  },
  created: function() {
    
  },
  attached: function() {

  },
  ready: function() {
    let that = this;    
    console.log(that.data.toastDurating);
    
    setTimeout(()=>{
      that.setData({
        hide: !that.data.hide 
      })
    },that.data.toastDurating)

  },
  moved: function() {

  },
  detached: function() {

  },
});
  
