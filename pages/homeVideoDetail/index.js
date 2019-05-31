import api from "../../utils/api";
import { shareInfo, currentTime} from '../../utils/tool';
import util from '../../utils/util'
const app = getApp()
let myGroupLists = []
let array = []

Page({
  /**
   * 页面的初始数据
   */
  data: {
  isShowModel: false,   
       title : '',
indicatorDots: false,
      imgUrls: [
             'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
          ],
     autoplay: false,
     interval: 5000,
     duration: 1000,
     idTopFixedShow:false,
     currentTab:0,
     clickTab:0,
     fixedTop:0,
     tabs:[],
     lists:[],
     modelAnimation: null,
     multipleItems: 4,
     searchID:'',
     pid:'',
     basUrl:'https://api.qiandengli.com/attachment/wx_images',
     pay_info: {},
     id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
  //  let tabs = JSON.parse(options.childrens);
  //  let index = JSON.parse(options.index)
   
    // this.setData({
    //   tabs: tabs,
    //   pid: tabs[index].pid,
    //   multipleItems: tabs.length >= 4 ? 4 : tabs.length,
    //   clickTab: index
    // })

    let course_id = wx.getStorageSync('course_id');
    this.setData({
      pid: options.pid,
      course_id:course_id,
      id:options.id,
      clickTab: parseInt(options.index)
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '视频详情' 
    })
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initClientRect();
   
    wx.showLoading({
      title: '拼命加载中...',
      mask: true,
      icon: 'success'
    })
    this.getCourselist({pid : this.data.pid, id : this.data.id})

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShareAppMessage: function () {
    
     let that =this;
     let userId = app.globalData.userId;
     let klassId = that.data.item.id;

     let msg = {
       title: '大V详情',
       path: `/pages/homeDetail/index?share_id=${userId}&course_id=${klassId}`
     }
      shareInfo(msg, wx)
      
  },
   //滑动切换
  swiperTab: function (e) {
    console.log(e.detail.current);
    
    var that = this;
    that.setData({
        clickTab: e.detail.current,
        currentTab: e.detail.current
      });
    
  },
  changeTab(e){

    let tab = e.currentTarget.dataset.tab
    if (this.data.multipleItems > 4) {
      if (tab <= 4 ) {
        this.setData({
          currentTab: tab
        })
      } else {
        this.setData({
          currentTab: 4
        })
      }
    }
    console.log(tab);
    
    this.setData({
      clickTab: tab
    })
    wx.showLoading({
      title: '拼命加载中...',
      mask: true,
      icon: 'success'
    })
    this.getCourselist({pid : this.data.pid, id : this.data.tabs[this.data.clickTab].id})

  },
  catchTouchMove: function () {
    return false;
  },
  scroll(e){
    console.log(e.detail.scrollTop);
    
  },
  loadMore(){},
  scrolltolower(){},
  refresh(){},
  scrolltoupper(){},
  // 1.查询菜单栏距离文档顶部的距离menuTop
    initClientRect: function () {
      var that = this;
      wx.createSelectorQuery().select('#tab-wrap').boundingClientRect().exec((res)=>{
        that.setData({
          fixedTop: res[0].top
        })
      })
        
    },
// 2.监听页面滚动距离scrollTop
    onPageScroll: function (e) {
      if (e.scrollTop >= this.data.fixedTop) {
        this.setData({
          idTopFixedShow: true
        })
      } else {
        this.setData({
          idTopFixedShow: false
        })
      }
      
    },
    goToListDetail(e){
      let item = e.currentTarget.dataset.item;
      console.log(item);
      if (parseInt(this.data.pay_info.is_pay) === 0 && item.sell_type) {
        this.buyTap()
        
      } else {
        wx.navigateTo({
          url:`/pages/videoPlayDetail/index?id=${item.id}`
        })
      }
      
    },
    buyTap(){
      this.animation =  wx.createAnimation({
        duration: 300,
        timingFunction: 'linear',
      });
      let bottom = 0;
      if (this.data.isShowModel) {
        bottom = 764
      } else {
        bottom = 0
      }
      this.animation.height(382).bottom(`-${bottom}rpx`).step();
      this.setData({
        isShowModel: !this.data.isShowModel,
        modelAnimation: this.animation.export()
      })
        
    },
  closedTap(){
    this.buyTap()
  },
  payed(){
    this.buyTap()
    let that = this;
    let id = this.data.pay_info.id;
    let shareId = wx.getStorageSync('userID');
    let course_tuan_creater_id ='';
    let params = {
      course_id: id,
      share_id: shareId,
      course_tuan_creater_id:course_tuan_creater_id,
      is_pin:0
    }
    
    api.getMiniProgramPay(params, (res) => {
      
      that.wxPay(res.data.data);

    })
    
  },
  wxPay(value){

    let data = value;
    let that = this;
    console.log(value);
    
    wx.requestPayment({
      timeStamp: `${data.timestamp}`,
      nonceStr: `${data.nonceStr}`,
      package: `${data.package}`,
      signType: 'MD5',
      paySign: `${data.paySign}`,
      success(res) { 
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          image: '',
          duration: 1500,
          mask: false,
          success: (resu) => {
            wx.navigateTo({
              url:'/pages/order/index'
            })
          },
          fail: () => {},
          complete: () => {}
        });
        
      },
      fail(res) {
        wx.showToast({
          title: '支付失败',
          image:'/images/error.png',
          duration: 1000,
          success:()=>{
              
            },
          })
        
       }
    })
  },
  getCourselist(params){
    let that = this;
    api.getCourselist(params, (res) => {


      wx.hideLoading();

      this.setData({
        lists: res.data.data.dakas,
        tabs: res.data.data.cates,
        multipleItems: res.data.data.cates.length >= 4 ? 4 : res.data.data.cates.length,
        pay_info: res.data.data.pay_info
      })
      console.log(this.data);
    })
  }

})