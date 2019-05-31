import api from "../../utils/api";
import { shareInfo, currentTime} from '../../utils/tool';
import util from '../../utils/util'
const app = getApp()
// pages/class/index.js

let myGroupLists = []
let array = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basUrl:'https://api.qiandengli.com/attachment/wx_images',
    title : '',
    quality: 0,
    currentTab: 0,
    starts:[
      {tab: 1, src: '/images/start.png', selectedSrc: '/images/started.png'},
      {tab: 2, src: '/images/start.png', selectedSrc: '/images/started.png'},
      {tab: 3, src: '/images/start.png', selectedSrc: '/images/started.png'},
      {tab: 4, src: '/images/start.png', selectedSrc: '/images/started.png'},
      {tab: 5, src: '/images/start.png', selectedSrc: '/images/started.png'},
    ],
    rotateData:null,
    groupLists: [
    ],
    classDgs:['发刊词 | 为什么要一字一句读《论语》(1讲)','第一章 理解职场上的四种角色(5讲)','第二章 理解职场上的四种角色(5讲)','第三章 理解职场上的四种角色(5讲)'],
    vertical: true,
    indicatorDots: false,
    autoplay: true,
    circular:true,
    interval: 4000,
    duration: 1300,
    buyType:'',
    goGroup:{id:''},
    menuTop:0,
    menuFixed:false,
    item: {},
    bannerUrl:'',
    arrays:[],
    allList:[],
    curtDowm:false,
    course_id:'',
    scrollTopVule:null,
    isTabShow: false,
    course_tuan_creater_id: '',
    dakas:[],
    isTuan:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    let course_id = '';
    let course_tuan_creater_id = '';
    if (options.course_id) {
      course_id = options.course_id
      course_tuan_creater_id = options.course_tuan_creater_id || '';
    }else {
      course_id = wx.getStorageSync('course_id');
    }
    
    this.setData({
      course_id:course_id,
      course_tuan_creater_id:course_tuan_creater_id
    })
    
    this.getDetail(course_id);
   
    
  },
  imgload(e) {
    
  },
  imgerr(e) {
    if (e.type === "error") {
      
      this.setData({
        bannerUrl:'/images/banner.jpg'
      })

    } else {

    }
  },
  getDetail(course_id){
    let id = course_id;
    let course_tuan_creater_id = this.data.course_tuan_creater_id;
    let self = this;
    api.getDetail({id , course_tuan_creater_id}, (res) => {

      this.setCountDown();

      self.setData({
        item: res.data.data,
        bannerUrl: res.data.data.produck_image,
        quality: res.data.data.rank,
        dakas: res.data.data.dakas
      })
      
    })
  },
  getMaintuanList(id){
    let that = this;
    api.getMaintuanList({id:id},(res)=>{
      myGroupLists = res.data.data;
      
      let arr = [];
      let allList = [];
      for (let index = 0; index < myGroupLists.length; index++) {

       let obj = { childs: myGroupLists[index]}

        arr.push(obj)
      }
      arr.forEach(element => {
        element.childs.forEach(el=>{
          allList.push(el)
        })
      });
     
      myGroupLists = array;
      that.setData({
        groupLists: arr,
        allList:allList
      })
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '大咖课程介绍' 
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initClientRect();
    this.animation();
    setInterval(()=>{
      this.animation();
    },1600)
    if(wx.getStorageSync('is_tuanzhang') === 1) {
      this.setData({
        isTuan:true
      })
    }
    wx.showLoading({
      title: '拼命加载中...',
      mask: true,
      icon: 'success'
    })
    this.getMaintuanList(this.data.course_id);
    
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
       title: `${item.title}`,
       path: `/pages/homeDetail/index?share_id=${userId}&course_id=${klassId}`
     }
      shareInfo(msg, wx)
      
  },
  //单独购买/发起拼团
  onBuy: function (e) {
    let that = this;
    this.setData({

      buyType:e.currentTarget.dataset

    })
    let userID = wx.getStorageSync('userID')

      app.globalData.detail = {
                     title  : that.data.item.title,
                     price  : that.data.item.tprice.price,
              origin_price  : that.data.item.origin_price,
             produck_image  : that.data.item.produck_image
        }
    if (e.currentTarget.dataset.type === 'actionGroup') {
       app.globalData.id             =    {
                  share_id           :      userID,
                 course_id           :      that.data.item.tprice.course_id,
    course_tuan_creater_id           :      '',
                    is_pin           :      2,
        }
        that.getKaiTuan(that.data.item.tprice.course_id)
        

    } else if(e.currentTarget.dataset.type === 'single') {
       app.globalData.detail               =    {
                     title                 :      that.data.item.title,
                     price                 :      that.data.item.price,
              origin_price                 :      that.data.item.origin_price,
             produck_image                 :      that.data.item.produck_image
        }
      app.globalData.id     =     {
                  share_id  :       userID,
                 course_id  :       that.data.item.tprice.course_id,
    course_tuan_creater_id  :       '',
                    is_pin  :       0,
        }
        wx.navigateTo({
          url: `/pages/payed/index?type=${that.data.buyType.type}`
        })
    } else {
      app.globalData.id     =   {
                  share_id  :     userID,
                 course_id  :     that.data.item.tprice.course_id,
    course_tuan_creater_id  :     '',
                    is_pin  :     1,
        }
        wx.navigateTo({
          url: `/pages/payed/index?type=${that.data.buyType.type}`
        })
    }
    
    
    
      
  },
  //去拼团
  onClickGroup: function (e) {

    var that = this;

    that.setData({

      goGroup: e.currentTarget.dataset.item

    })
    
    this.setGlobalData();

  },
  getKaiTuan(id){
    let that = this;
    wx.showLoading({
      title : '拼命加载中...',
      mask  : true,
      icon  : 'success'
    })
    api.getKaituan({id  : id} ,  (res) =>  {
      console.log(res);
      wx.showToast({
        title           :     '开团成功',
        icon            :     'success',
        image           :     '',
        duration        :     1500,
        mask            :     false,
        success         :     (resu) => {
          that.getMaintuanList(that.data.course_id);
          // wx.navigateTo({
          //   url:'/pages/myGroup/index'
          // })
        },
        fail    : () => {},
        complete: () => {}
      });
        
    })
  },
  setGlobalData:function (){
    let that = this
    app.globalData.detail   = {
                     title  :   that.data.item.title,
                     price  :   that.data.item.tprice.price,
              origin_price  :   that.data.item.origin_price
        }

    app.globalData.id       = {
                  share_id  :   that.data.item.id,
                 course_id  :   that.data.course_id,
    course_tuan_creater_id  :   that.data.goGroup.id,
                    is_pin  :   1,
        }
        
    wx.navigateTo({

      url: `/pages/payed/index?type=${that.data.buyType.type}`

    })    
        
  },
   //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab  : e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  catchTouchMove: function () {
    return false;
  },
  animation(){
    var animation = wx.createAnimation({})
    animation.scale(1.2).step({duration: 800})
    animation.scale(1).step({duration: 800})
      this.setData({
        rotateData: animation.export()
      })
    
    
    
  },
  // 1.查询菜单栏距离文档顶部的距离menuTop
    initClientRect: function () {
      var that = this;
      var query = wx.createSelectorQuery()//创建节点查询器 query
      query.select('#affix').boundingClientRect()//这段代码的意思是选择Id= the - id的节点，获取节点位置信息的查询请求
      query.exec(function (res) {
          that.setData({
              menuTop: res[0].top
          })
      });
    },
  // 2.监听页面滚动距离scrollTop
    onPageScroll: function (e) {
      
      if (e.scrollTop >= this.data.menuTop) {
        this.setData({
          isTabShow: true
        })
      }else{
        this.setData({
          isTabShow: false
        })
      }
      
    },
    goToListDetail(e){
      let item = e.currentTarget.dataset.item;

      if (item.sell_type) {
        this.buyTap()
        
      } else {
        wx.navigateTo({
          url:`/pages/videoPlayDetail/index?id=${item.id}`
        })
      }
      
    },
    getNowTime: function() {
      var timestamp = Date.parse(new Date());  
      this.setData({
        nowTime: timestamp / 1000
      })
    },
    /**
     * 倒计时
     */
    setCountDown: function(){
           let time = 1000;//s

    let { allList } = this.data;

           let that = this;
        
           let list = allList.map((v, i) =>{
          
           that.getNowTime();

        var timeCha = parseInt(v.time_diff)
            
           if (v.time_diff <= 0) {

              v.mcountDown = '已过期';
                return v;
            } 
              
          let formatTimeD = currentTime(v.time_diff);
              
              v.time_diff -= 1;
              
              v.mcountDown = `${formatTimeD}`;
           
            return v;
        })
        this.setData({
            allList: list
        });
        let length = Math.ceil(this.data.allList.length / 3);
          let arrs = [];
        for (let i = 0; i < length; i++) {
         let start = i*3;
           let end = start +3;
           var obj = { childs:list.slice(start, end)}
           arrs.push(obj)
        }

        this.setData({

           groupLists: arrs,
        })
        setTimeout(this.setCountDown, time);
  },
})