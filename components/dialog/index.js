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
    },
    toastTitle: {
      type : String
    }

  },
  data: {
    msgs:[],
    basUrl:'https://api.qiandengli.com/attachment/wx_images',
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
    goToSQ(){
      let that = this;
      this.setData({
        hide: !that.data.hide
      })
    },
    onGotUserInfo(e) {
      console.log(e);
      
      let that = this;
  
      wx.login({
  
        success (res) {
          
          if (res.code) { // 登录成功，获取用户信息
            that.triggerEvent('goToSQ',res.code)
          } 
          else {
            that.setData({
              hide2: false,
              type: 'error',
              desMsg: '登录失败,请稍后再试！'
            })
            setTimeout(()=>{
            that.setData({
              hide: !that.data.hide
            })
          },1500) 

          }
        },
        file(e){

          this.triggerEvent('close')

        }
      })
    },
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
  
