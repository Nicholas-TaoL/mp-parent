//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'
import {getToken} from '../../utils/tool'
Page({
  data: {
        motto: '首页',
        token:'',
     userInfo: {},
  hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
     barLists: [],
       tabbar: {},
     auth_key: '',
      isLogin: false,
    course_id: '',
         tops: [],
indicatorDots: false,
      imgUrls: [],
     autoplay: false,
     interval: 5000,
     duration: 1000,
      loading: true,
      topShow: false,
      topPage: 0,
       blocks: [],
        dakas: [],
    hide2: true,
    toastDurating: 1300,
    isLoadToast: false,
    type: 'success',
    desMsg: '',
    cutdown:true
  },
  scroll(e){
    let blockTops = this.data.tops;
    
    if (e.detail.scrollTop >= blockTops[0] && e.detail.scrollTop < blockTops[1]) {
      this.setData({
        topShow: true,
        topPage: 0
      })
    } 
    else if( e.detail.scrollTop >= blockTops[1] && e.detail.scrollTop < blockTops[2] ){
      this.setData({
        topShow: true,
        topPage: 1
      })
    }
    else if( e.detail.scrollTop >= blockTops[2] && e.detail.scrollTop < blockTops[3] ){
      this.setData({
        topShow: true,
        topPage: 2
      })
    }
    else if( e.detail.scrollTop >= blockTops[3] && e.detail.scrollTop < blockTops[4]){
      this.setData({
        topShow: true,
        topPage: 3
      })
    }
    else if( e.detail.scrollTop >= blockTops[4]){
      this.setData({
        topShow: true,
        topPage: 4
      })
    }
    else {
      this.setData({
        topShow: false
      })
    }
    // console.log(e.detail.scrollTop);
    // console.log(this.data.tops,this.data.topPage);
  },
  refresh(){},
  blockTap(e){
    
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
      console.log(item);
      
    this.setData({
      token: getToken(wx)
    })
    
    let arr = []
    arr = this.data.blocks.filter((e)=>{
      return e.id === item.pid
    })
    

    wx.navigateTo({
      url:`/pages/homeVideoDetail/index?pid=${item.pid}&index=${index}&id=${item.id}`
    })
    
  },
  getAllTop(){
    console.log('nnnnnnnnmmmmmm');
    
    let that = this;
    let arr = [];
    for (let index = 0; index < this.data.blocks.length+1; index++) {
      
      wx.createSelectorQuery().select(`#block-${index}`).boundingClientRect().exec(function (res) {

        var top = res[0].top;
        
        arr.push(top);
       
        that.setData({
          
          tops:arr
        })
      }) 
    }
    wx.setStorage({
      key:'arrTops',
      data: arr
    })
    console.log(this.data);
  },
  dkTap(e){
    console.log(e);
    
    let item = e.currentTarget.dataset.item;
    console.log(item.id);
    
    wx.navigateTo({
      url:`/pages/homeDetail/index?course_id=${item.id}`
    })
  },
   onGotUserInfo(e) {
     
    let that = this;

    wx.login({

      success (res) {

        if (res.code) { // 登录成功，获取用户信息
        
          that.getCode(res.code,that);
        } 
        else {
          that.setData({
            hide2: false,
            type: 'error',
            desMsg: '登录失败,请稍后再试！'
          })
        setTimeout(()=>{
          that.setData({
            hide2: true
          })
        },that.data.toastDurating) 
            // that.showToast('登录失败','none',1000)
        }
      },
      file(e){
          console.log(e);
      }
    })
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
          hide2: false,
          type: 'error',
          desMsg: '授权失败，请稍后重试！'
        })
      }
      setTimeout(()=>{
        that.setData({
         hide2: true
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
            hide2: false,
            type: 'error',
            desMsg: '授权失败，请稍后重试！'
          })
          setTimeout(()=>{
            that.setData({
              hide2: true
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
            hide2: false,
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
            hide2: false,
            type: 'error',
            desMsg: '授权失败，请稍后重试！'
          })
          setTimeout(()=>{
            that.setData({
              hide2: true
            })
          },that.data.toastDurating) 
          
        }
            
    })
  },
  //事件处理函数

  getmyMain: function() {
    let that = this;
    
    api.getmymain((res)=>{
      
      that.setData({

        is_tuanzhang: res.data.data.is_tuanzhang

      })
      wx.hideLoading();
      // wx.setStorageSync('course_id', res.data.data.item[0].id);
      wx.setStorageSync('is_tuanzhang', res.data.data.is_tuanzhang);
      
    })
  },
  getMain: function() {
    api.getMain( (res) => {
      this.setData({
        blocks: res.data.data.blocks,
        dakas: res.data.data.dakas,
        imgUrls: res.data.data.heads
      })
      // setTimeout(()=>{
      //   if (!wx.getStorageSync('arrTops') || wx.getStorageSync('arrTops') == undefined) {
      //     this.getAllTop();
      //   }
             
      // })
      
      
    })
  },
  onBlockBanner: function() {
    let that = this;
    
    wx.navigateTo({
      url: `../homeDetail/index?course_id=${that.data.course_id}`,
    })

  },
  setNavigationBarTitle:() => {

    wx.setNavigationBarTitle({
      title: '首页' 
    })

  },
  onReady:function () {
    
    this.setNavigationBarTitle();
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  onShow:function () {

    let isLogin = getToken(wx) ? true : false;
    this.setData({
      topShow: false,
      isLogin: isLogin
    })
    this.getMain();
    this.getmyMain();
    // wx.getStorage({
    //   key:'token',
    //   success(res) {
    //     let isLogin = false;
    //     if (res.data) {
    //       isLogin = true
    //     } 
    //     that.setData({
    //       isLogin: isLogin
    //     })
    //     that.getmyMain();
    //   }
    // });
    
  },
  onLoad: function () {
     wx.showLoading({
        title: '拼命加载中...',
        mask: true,
        icon: 'success'
      })
      
  }
  
})
