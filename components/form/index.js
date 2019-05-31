//Component Object
import api from '../../utils/api'
import {isPoneAvailable} from '../../utils/tool'
Component({
  properties: {
    mineLists: {
      type:Array
    },
    showDialog: {
      type:Boolean
    },
    isHid: {
      type: Boolean
    },
    msg:{
      type:Object
    },
    cutdown:{
      type:Boolean
    }

  },
  data: {
    isClearShow:false,
    isPhoneClearShow:false,
    isCodeClearShow:false,
    iswxClearShow:false,
    name: '',
    phone:'',
    code:'',
    wx:'',
    introduce:'',
    isSendCode:false,
    time:60,
    textNum:0,
    hide2: true,
    toastDurating: 2500,
    type: 'success',
    desMsg:''
  },
  methods: {
    toggleDialog() {
      this.setData({
        showDialog: !this.data.showDialog,
             isHid: !this.data.isHid,
      });
    },
    textIntroduce(e){
      var value = e.detail.value;
      if (value === null || value === undefined || value.length === 0) {
         this.setData({
            textNum: 0,
            introduce:''
         });
       } else {
         this.setData({
            textNum: value.length,
            msg:{'introduce':value},
            introduce: value
         });
          this.sendMsg()
       }
    },
    watchName: function(e) {
      var value = e.detail.value;
       if (value === null || value === undefined || value.length === 0) {
         this.setData({
            isClearShow: false
         });
       } else {
         this.setData({
            name: value,
            msg:{'name':value},
            isClearShow: true
         });
         this.sendMsg()
       }
    },
    watchPhone: function(e) {
      var value = e.detail.value;
       var cursor = e.detail.cursor;
       if (value === null || value === undefined || value.length === 0) {
         this.setData({
            isPhoneClearShow: false
         });
       } else {
         this.setData({
            phone: value,
            msg:{'mobile':value},
            isPhoneClearShow: true
         });
         this.sendMsg()
       }
    },
    watchCode: function(e) {
      var value = e.detail.value;
       var cursor = e.detail.cursor;
       if (value === null || value === undefined || value.length === 0) {
         this.setData({
            isCodeClearShow: false
         });
       } else {
         this.setData({
            code: value,
            msg:{'card_id':value},
            isCodeClearShow: true
         });
         this.sendMsg()
       }
    },
    watchwx: function(e) {
      var value = e.detail.value;
       var cursor = e.detail.cursor;
       if (value === null || value === undefined || value.length === 0) {
         this.setData({
            iswxClearShow: false
         });
       } else {
         this.setData({
            wx: value,
            msg:{'wx':value},
            iswxClearShow: true
         });
         this.sendMsg()
       }
    },
    clearName: function () {
      this.setData({
         isClearShow: false,
         name:''
       });
    },
    clearwx: function () {
      this.setData({
         iswxShow: false,
         wx:''
       });
    },
    clearPhone: function () {
      this.setData({
         isPhoneClearShow: false,
         phone:''
       });
    },
    clearCode: function () {
      this.setData({
         isCodeClearShow: false,
         code:''
       });
    },
    getCode(){
      let that = this;
      console.log(isPoneAvailable(that.data.phone));
      this.triggerEvent('')
      if(!isPoneAvailable(that.data.phone)){
          that.setData({
            hide2: false,
            type: 'error',
            desMsg: '手机号输入有误，请您重新检查！'
          })
          setTimeout(()=>{
            that.setData({
              hide2: !that.data.hide2 
            })
          },that.data.toastDurating)
      } else {
        this.setData({
          isSendCode: true
        })
        console.log(this.data.cutdown)
        if(this.data.cutdown){
          let timer = setInterval(()=>{
            let t = this.data.time -1;
            this.setData({
              time:t
            })
            if (this.data.time === 0) {
              clearInterval(timer);
              this.setData({
                isSendCode: false,
                time:60
              })
            } 
          },1000)
        }
        
      }
      
      if (this.data.isSendCode) {
        this.postCode()
      }
      
    },
    sendMsg(){
      this.triggerEvent('parentEvent',{name:this.data.name,mobile:this.data.phone,wx:this.data.wx,code:this.data.code,introduce:this.data.introduce})
    },
    postCode(){
      let that = this;
      let msg = {
        mobile: that.data.phone,
        type: 1
      }
      that.triggerEvent('postCode',msg)
    }
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
  
