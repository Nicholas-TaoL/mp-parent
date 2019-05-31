//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'

Page({
  data: {
    motto: '我的钱包',
    userInfo: {},
    bis:[],
    hasUserInfo: false,
  },
  //事件处理函数
  setNavigationBarTitle:() => {
   
    wx.setNavigationBarTitle({
   
      title: '我的钱包' 
   
    })
  },
  handleDetail(e){
    console.log(e);
    
    wx.navigateTo({

      url:'/pages/welltDetail/index?title='+e.detail.label

    })
  },
  onReady:function () {
    
    this.setNavigationBarTitle();
  },
  onLoad: function () {
    
     this.setMyBis();
  },
  setMyBis(){
    
    this.setData({
     
      bis:app.globalData.bis
    })
  }
})
