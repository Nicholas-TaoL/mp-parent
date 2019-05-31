import api from "../../utils/api";

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '火柴父母学堂',
    basUrl:'https://api.qiandengli.com/attachment/wx_images',

  },

  //事件处理函数
 
  setNavigationBarTitle:() => {
    wx.setNavigationBarTitle({
      title: '团长任务' 
    })
  },
  onReady:function () {
    this.setNavigationBarTitle();
  },
  onLoad: function (options) {
    console.log(options.type);
    
    // this.setData({
    //   type:options.type,
    //   share_id: app.globalData.id.share_id,
    //   course_id: app.globalData.id.course_id,
    //   course_tuan_creater_id: app.globalData.id.course_tuan_creater_id,
    //   msg:app.globalData.detail
    // })
    console.log(this.data);
    
  },
  onShareAppMessage(res) {
    let id = wx.getStorageSync('shareId') // 分享产品的Id
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '转发标题',
      path: `pages/mine/index` // 分享后打开的页面
    }
  }
})
