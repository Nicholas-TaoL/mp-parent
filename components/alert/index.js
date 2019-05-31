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
    type:{
      type:String
    },
    desMsg: {
      type: String
    }

  },
  data: {
    msgs:[],
    focus: true,
    inputValue:''
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
    },
    inputing(e){

      this.setData({
        inputValue:e.detail.value
      })

    },
    cancelBtnTap(){
      this.triggerEvent('parentCancel')
    },
    sendBtnTap(){
      if (this.data.inputValue) {
        this.triggerEvent('parentSend',this.data.inputValue)
      }
      
    }
  },
  created: function() {

  },
  attached: function() {
    let msgs = this.data.desMsg.split('；')
    this.setData({
      msgs:msgs
    })
    
  },
  ready: function() {

  },
  moved: function() {

  },
  detached: function() {

  },
});
  
