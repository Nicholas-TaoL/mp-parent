//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'

Page({
  data: {
       motto: '设置',
       lists: [
         { label: '关于火柴父母学堂', id: 1 },
         { label: '联系我们', id: 2 },
         { label: '意见与建议', id: 3 }
       ],
       hide:false,
       toastDurating: 3000
  },
 
  showToast: function (title, icon, duration) {
    
    wx.showToast({

         title: title,
          icon: icon,
      duration: duration

    })

  },
  closeCallBack(){
    console.log(111);
    
  },
  //事件处理函数
  bindViewTap: function() {

    wx.navigateTo({
      url: '../logs/logs'
    })

  },
  handleitem(e){
    let id = e.target.dataset.item.id;
    if (id === 1) {
      
    } 
    else if (id === 2){

    }
    else {
      wx.navigateTo({
        url:'/pages/opinions/index'
      })
    }
    
  },
  setNavigationBarTitle:() => {

    wx.setNavigationBarTitle({
      title: '设置' 
    })

  },
  onReady:function () {

    this.setNavigationBarTitle();

  },
  onLoad: function () {

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
  },
  
})
