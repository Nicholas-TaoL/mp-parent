//app.js
import api from './utils/api.js';
App({
  data:{
    currentPath:'pages/index/index'
  },
  onLaunch: function () {
    wx.hideShareMenu();
    // 展示本地存储能力

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onLoad: function () {
    
  },
  changeTabBar: function () {
    let _curPageArr = getCurrentPages();
    let _curPage = _curPageArr[_curPageArr.length - 1]; 
    let _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    let tabBar = this.globalData.tabBar; 
    let barLists = tabBar['list'];
    for (let i = 0; i < barLists.length; i++) {
      // console.log(_pagePath + '--' + barLists[i].pagePath)
      barLists[i].selected = false;
      if (barLists[i].pagePath == _pagePath) {
        barLists[i].selected = true;//根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabbar: tabBar
    });
  },  
  globalData: {
    userInfo: null,
    platform:'',
    isLogin:false,
    bannerInfo:{},
    tabBar: {
      color: "#333",
      selectedColor: "#F7931E",
      borderStyle: "#F0F0F0",
      backgroundColor: "#fff",
      list: [
        {
          pagePath: "/pages/index/index",
          text: "首页",
          iconPath: "/images/work_01.png",
          selectedIconPath: "/images/work_02.png",
          selected: true
        },
        {
          pagePath: "/pages/mine/index",
          text: "我的",
          iconPath: "/images/my_01.png",
          selectedIconPath: "/images/my_02.png",
          selected: false
        }
      ],
      position: "bottom"
    }
  }
})