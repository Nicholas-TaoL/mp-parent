import api from "../../utils/api";

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo   : false,
    msg           : {},
    course_id     : '',
    share_id      : '',
    type          : '',
    hide2         : true,
    toastDurating : 2200,
    sType         : 'success',
    desMsg        : '',
    shareMsg      : {}
  },

  //事件处理函数
  payed(){

    let that = this;
    let id   = app.globalData.id;

    api.getMiniProgramPay(id, (res) => {
      
      that.wxPay(res.data.data);

    })
    
  },
  wxPay(value){

    let data  = value;
    let that  = this;
    console.log(value);
    
    wx.requestPayment({
      timeStamp       : `${data.timestamp}`,
      nonceStr        : `${data.nonceStr}`,
      package         : `${data.package}`,
      signType        : 'MD5',
      paySign         : `${data.paySign}`,
      success(res) { 
        console.log(res);
        
        that.shareBtn()
        
      },
      fail(res) {
        wx.showToast({
          title      : '支付失败',
          image      : '/images/error.png',
          duration   : 1000,
          success    : () => {
              
            },
          })
        
       }
    })
  },
  setNavigationBarTitle:() => {
    wx.setNavigationBarTitle({
      title                : '火柴父母学堂' 
    })
  },
  onReady: function () {
    this.setNavigationBarTitle();
  },
  onLoad: function (options) {
    console.log(options.type);
    
    this.setData({
      type             : options.type,
      share_id         : app.globalData.id.share_id,
      course_id        : app.globalData.id.course_id,
      course_tuan_creater_id: app.globalData.id.course_tuan_creater_id,
      msg              : app.globalData.detail
    })
    console.log(this.data);
    
  },

  shareBtn(){
    let that           = this;
    this.setData({
      shareMsg:{
        course_tuan_id : this.data.course_tuan_creater_id,
        course_id      : this.data.course_id,
        title          : this.data.msg.title,
      }
    })

    let desMsg         = '1、团长享受返佣；2、团员需要在团购结束前促成团购，否则不能享受团购优惠价。';
      
      that.setData({
        hide2          : false,
        desMsg         : desMsg
      })
    
  },
  closeCallBack(){
    
    this.setData({
        hide2          : true
      })
    this.sharedToPage();
  },
  sharedToPage(){
    let that           = this;
    if (that.data.type === 'single') {
      wx.redirectTo({
        url            :'/pages/order/index'
      })
    } else {
      wx.redirectTo({
        url            :'/pages/myGroup/index'
      })
    }
  },
  onShareAppMessage(res) {
    this.setData({
      hide2          : true
    })
    let id               = wx.getStorageSync('userID') // 分享产品的Id
    let shareMsg         = this.data.shareMsg;
    if (res.from         === 'button') {
      // 来自页面内转发按钮
    }
    return {

      title   : shareMsg.title,

      path    : `pages/homeDetail/index?course_id=${shareMsg.course_tuan_id}&course_tuan_creater_id=${id}`, // 分享后打开的页面


      success : () => {
        this.sharedToPage();
      },
      fail    : ()=>{
        this.sharedToPage();
      }
    }
  },
})
