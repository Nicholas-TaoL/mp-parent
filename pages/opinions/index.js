//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'
let imgsArr = []
Page({
  data: {
    basUrl:'https://api.qiandengli.com/attachment/wx_images',
      motto: '意见与建议',
      opinions:'',
      picUrls: [],
      maxLength:false,
      hide1: true,
      hide2: true,
      toastDurating: 2200,
      isLoadToast: false,
      type: 'success',
      desMsg: '',
      cutdown:true
    
  },
 
  showToast: function (title, icon, duration) {
    
    wx.showToast({

         title: title,
          icon: icon,
      duration: duration

    })

  },
  //事件处理函数
  bindViewTap: function() {

    wx.navigateTo({
      url: '../logs/logs'
    })

  },
  bindKeyInput(e) {
    this.setData({
      opinions: e.detail.value
    })

  },
  onBlockBanner: () => {

    wx.navigateTo({
      url: '../homeDetail/index'
    })

  },
  setNavigationBarTitle:() => {

    wx.setNavigationBarTitle({
      title: '意见与建议' 
    })

  },
  postSuggest(){
    let that = this;
    let data = this.data.opinions;
    let pics = `${imgsArr}`;
    console.log(imgsArr);
    
    api.postSuggest({ data, pics }, (res) => {
      console.log(res);
      let type, desMsg = ''
      if (res.data.code === 200) {
        type = 'success';
        desMsg = '谢谢您的宝贵意见！';
        
        that.setData({
          opinions:'',
          picUrls: [],
        })
        setTimeout(()=>{
          wx.navigateBack()
        },parseInt(that.data.toastDurating) + 500)
      } else {
        type = 'error';
        desMsg = res.data.message;
      }
      that.setData({
        hide2: false,
        type: type,
        desMsg: desMsg,
      })
      setTimeout(()=>{
        that.setData({
          hide2: true
        })
      },that.data.toastDurating)
      
      
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
  bindChooiceProduct: function () {  
  var that = this;  
  
  wx.chooseImage({  
    count: 9,  //最多可以选择的图片总数  
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
    success: function (res) {  
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
      var tempFilePaths = res.tempFilePaths;  
      //启动上传等待中...  
      wx.showToast({  
        title: '正在上传...',  
        icon: 'loading',  
        mask: true 
      })  
      
      let imgs9 = tempFilePaths.slice(0,9);
      console.log(imgs9);
      imgsArr = imgs9;
      that.setData({
        picUrls: that.data.picUrls.concat(imgs9)
      })
      let imgs = that.data.picUrls;
     
      if(imgs.length >= 9) { 
          wx.showToast({  
            title: '以达到最大数量',   
            mask: true,  
            duration: 1000  
          })
          that.setData({
            picUrls: imgs.slice(0,9)
          }) 
          that.setData({
            maxLength: true
        })
      }
      
      var uploadImgCount = 0; 
      const baseUrl = 'https://api.qiandengli.com/v1/'; 
      const token = wx.getStorageSync('token');
      const heaherCongfig = {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`
        };
      for (var i = 0, h = tempFilePaths.length; i < h; i++) {  

        wx.uploadFile({  
          url: `${baseUrl}file/images`,  
          filePath: tempFilePaths[i],  
          name: 'file',
          formData: {  
            'imgIndex': i ,
             'drive':'oss'
          },  
          header: heaherCongfig ,
          success: function (res) {  
             wx.hideToast();  
            let data = JSON.parse(res.data)
            let url = data.url;
            imgsArr.push(url);  
          },  
          fail: function (res) {  
           
            wx.showModal({  
              title: '错误提示',  
              content: '上传图片失败',  
              showCancel: false,  
              success: function (res) { }  
            })  
          }  
        });  
      }  
    }  
  });  
},
  delImg(e){
    let index = e.currentTarget.dataset.index
    imgsArr.splice(index, 1);
    let imgs = this.data.picUrls;
    imgs.splice(index,1)
    this.setData({
      picUrls:imgs
    })
    if (imgs.length<=9) {
      this.setData({
        maxLength:false
      })
    }
  }
  
})
