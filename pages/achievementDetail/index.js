//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    tabs:[
      {label: '我的勋章',   type:'myxz',current: 0, msgs:[{type:1, time:'2019-01-29 17:23:16'},{type:2, time:'2019-02-29 17:23:16'},{type:1,price:'23.9',time:'2019-04-29 17:23:16'},{type:1,price:'33.9',time:'2019-03-29 17:23:16'}]},
      {label: '我的证书', type:'myzs', current: 1, msgs:[{type:2,price:'23.9',time:'2019-04-29 17:23:16'},{type:1,price:'33.9',time:'2019-03-29 17:23:16'}]},
    ],
    currentTab:1,
    basUrl:'https://api.qiandengli.com/attachment/wx_images',

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  saveImageToPhone(){
    let imgSrc = 'https://api.qiandengli.com/attachment/images/2019/04/29/image_155651499450504898.jpg'
    wx.downloadFile({
      url: imgSrc,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          },
          complete(res){
            console.log(res);
          }
        })
      }
    })
  }
 
})
