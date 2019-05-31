//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'
import {onGotUserInfo ,getToken} from '../../utils/tool'

Page({
  data: {
    motto: '我的',
    basUrl:'https://api.qiandengli.com/attachment/wx_images',
    mineLists: [],
    mineWallets: [
    ],
    currentPath:'',
    barLists:[],
    showDialog: true,
    tabbar:{},
    myUserInfo:{},
    is_tuanzhang:0,
    hide2: true,
    hide3: true,
    toastDurating: 2200,
    type: 'success',
    desMsg: '',
    toastTitle:'去授权'
  },
  onLoad: function () {
    
    let desMsg = '授权后即可领取积分，钱包查看积分奖励';
    let token = getToken(wx);
    if (token) {
      this.getLabels();
    } else {
      this.setData({
        hide2: false,
        desMsg:desMsg
      })
    }
  },
  onShow: function () {
    let desMsg = '授权后即可领取积分，钱包查看积分奖励';
    let token = getToken(wx);
    if (token) {
      this.getMyUserInfo();
    } else {
      this.setData({
        hide2: false,
        desMsg:desMsg
      })
    }
   
  },
  getMyUserInfo(){
    let self = this;
    app.globalData.is_tuanzhang = wx.getStorageSync('is_tuanzhang');

    api.getInfo((res) => {

      self.setData({
        myUserInfo: res.data.data,
        is_tuanzhang: app.globalData.is_tuanzhang
      })
      app.globalData.bis = res.data.data.bi
      
    })
      
  },
  dialog: function (){
    wx.navigateTo({
      url: '/pages/regimentalCommander/index'
    })
  },
  onGoDetail(item){
    let listType = item.target.dataset.item.type;
    
    if (listType === 'order') {
      wx.navigateTo({
        url: '/pages/order/index'
      })
    } 
    else if (listType === 'group'){
      wx.navigateTo({
        url: '/pages/myGroup/index'
      })
    }
    else if (listType === 'setting'){
      wx.navigateTo({
        url: '/pages/setting/index'
      })
    }
    else if (listType === 'achievement'){
      wx.navigateTo({
        url: '/pages/achievement/index'
      })
    }
    else if (listType === 'invitation'){
      wx.navigateTo({
        url: '/pages/share/index'
      })
    }
    else if (listType === 'renwu'){
      wx.navigateTo({
        url: '/pages/tuanzhangrw/index'
      })
    }
    else if (listType === 'buyed'){
      wx.navigateTo({
        url: '/pages/buyed/index'
      })
    }
  },
  onClickWallet: function (e) {

    wx.navigateTo({

      url: `/pages/welltDetail/index?title=${e.currentTarget.dataset.type.name}`

    })
    
  },
  closeCallBack(e){
    console.log(e.detail);
    
    this.setData({
      hide2: true
    })
    if (e.detail) {
      
    } else {
      wx.switchTab({  
        url: '/pages/index/index',  
        // success: function (e) {  
        //   var page = getCurrentPages().pop();  
        //   if (page == undefined || page == null) return;  
        //   page.onShow();  
        // }  
      })
    }
    
  },
  goToSQ(data){
    console.log(data);
    let that = this;
    // this.onGotUserInfo()
    that.setData({
      hide2: true
    })
    that.getCode(data.detail,that);
  },
  getCode: ( params ,that) => {
    wx.showLoading({
      title: '授权中...',
    })
    api.getCode(params,(res) => {
      if (res.data.code === 200) {
        that.getUserInfo( res.data.data.auth_key, that )
      } else {
        wx.hideLoading();
        that.setData({
          hide3: false,
          type: 'error',
          desMsg: '授权失败，请稍后重试！'
        })
        
      }
      setTimeout(()=>{
        that.setData({
         hide3: true
        })
       
      },that.data.toastDurating) 
      
    })
  },
  getUserInfo: function(auth_key, that) {
     wx.getUserInfo({ // 获取成功，全局存储用户信息，开发者服务器登录

        success (res) { // 全局存储用户信息
          wx.hideLoading();
          that.postLogin( res.iv, res.encryptedData, res.signature, res.rawData, auth_key, that)
        },
        fail () {
          wx.hideLoading();
          that.setData({
            hide3: false,
            type: 'error',
            desMsg: '授权失败，请稍后重试！'
          })
          
          setTimeout(()=>{
            that.setData({
              hide3: true
            })
            wx.switchTab({  
              url: '/pages/index/index',    
            })
          },that.data.toastDurating) 
        }
      })
  },
  postLogin: function( iv, encryptedData, signature, rawData, auth_key, that) {

    let params = {
                 iv: iv,
      encryptedData: encryptedData,
          signature: signature,
            rawData: rawData,
           auth_key: auth_key
      }
       
    api.postDecode(params, (res) => {

        let statusCode = res.data.code;

        if (statusCode === 200 ) {

          that.setData({
            hide3: false,
            type: 'success',
            desMsg: '恭喜您授权成功！',
            isLogin: true
          })
          const token = res.data.data.access_token;
          app.globalData.userId = res.data.data.member.id;
          app.globalData.head_portrait = res.data.data.member.head_portrait;
          wx.setStorage({
            key: 'userID',
            data:res.data.data.member.id
          })
          wx.setStorage({
                key: 'token',
               data: token,
            success: () => {
              that.getmyMain();
            },
          });
        
            
        } else {

          wx.hideLoading();
          that.setData({
            hide3: false,
            type: 'error',
            desMsg: '授权失败，请稍后重试！'
          })
         
          setTimeout(()=>{
            that.setData({
              hide3: true
            })
            wx.switchTab({  
              url: '/pages/index/index',    
            })
          },that.data.toastDurating) 
          
        }
            
    })
  },
  getmyMain: function() {
    let that = this;
    
    api.getmymain((res)=>{
      
      that.setData({

        is_tuanzhang: res.data.data.is_tuanzhang

      })
      wx.hideLoading();

      wx.setStorageSync('is_tuanzhang', res.data.data.is_tuanzhang);
      this.getLabels();
      this.getMyUserInfo();
    })
  },
  onReady:function () {
    this.setNavigationBarTitle();
    
  },
  //事件处理函数
  getLabels(){
    api.getLabels((res) => {
      console.log(res);
      this.setData({
        mineLists:res.data.data
      })
    })
  },
  setNavigationBarTitle:() => {
    wx.setNavigationBarTitle({
      title: '个人中心' 
    })
  }
})
