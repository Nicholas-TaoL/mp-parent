//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabs:[
      {label: '我的勋章',   type:'myxz',current: 0, msgs:[{type:1, time:'2019-01-29 17:23:16'},{type:2, time:'2019-02-29 17:23:16'},{type:1,price:'23.9',time:'2019-04-29 17:23:16'},{type:1,price:'33.9',time:'2019-03-29 17:23:16'}]},
      {label: '我的证书', type:'myzs', current: 1, msgs:[{type:2,price:'23.9',time:'2019-04-29 17:23:16'},{type:1,price:'33.9',time:'2019-03-29 17:23:16'}]},
    ],
    currentTab:1,
  },
  //事件处理函数

  onBlockBanner: () => {
    wx.navigateTo({
      url: '../homeDetail/index'
    })
  },
  setNavigationBarTitle:() => {
    wx.setNavigationBarTitle({
      title: '我的证书' 
    })
  },
  onReady:function () {
    this.setNavigationBarTitle();
  },
  onLoad: function () {
    
    
  },

})
