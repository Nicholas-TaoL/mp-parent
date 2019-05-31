//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'
import util from '../../utils/util'
import { shareInfo, currentTime} from '../../utils/tool';
var TIME = util.formatTime(new Date());
Page({
    data: {
       tabs:[
          {label: '全部',   type:'all',current: 3},
          {label: '拼团中', type:'dpay', current: 0},
          {label: '拼团成功', type:'apay', current: 1},
          {label: '拼团失败', type:'acancel', current: 2},
        ],
        currentTab: 3,
        caiItems: [],
        times: [],
        loading: true,
        hasMore: false,
        page: 1,
        status: '',
        index: [],
        hide2: true,
        toastDurating: 2200,
        type: 'success',
        desMsg: '',
        shareMsg:{}
    },
    onLoad: function (options) {

      this.setNavigationBarTitle(options.title || '我的拼团');
      
      this.refresh();
       
    },
    shareBtn(e){
      console.log(e.detail);
      this.setData({
        shareMsg:{
          course_tuan_id: e.detail.course_tuan_id,
          title: e.detail.course.title,
        }
      })
      let that = this
      if (e.detail.status == 0) {

        let desMsg = '1、团长享受返佣；2、团员需要在团购结束前促成团购，否则不能享受团购优惠价。';
        
        that.setData({
          hide2: false,
          desMsg:desMsg
        })
      
      }
      
    },
    closeCallBack(){
      this.setData({
          hide2: true
        })
    },
     //滑动切换
    swiperTab: function (e) {
      var that = this;

      that.setData({

        currentTab: e.detail.current

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

      this.refresh();
    },
    refresh: function () {
        console.log("下拉刷新....")

        this.setData({
            page: 1,

            caiItems: [],

            times: []

        })

      this.getDataFromServer(this.data.page)
    },
    loadMore: function () {

        this.setData({page: this.data.page + 1})

        console.log("上拉拉加载更多...." + this.data.page)
        if (this.data.hasMore) {
          this.getDataFromServer(this.data.page)
        }else {
          return ;
        }
        
    },
    //获取网络数据的方法
    getDataFromServer: function (page) {
      
      let that  = this;
     
      this.setData({

        loading : false,

        hasMore : true

      })
      //调用网络请求
      let arrs   = this.data.caiItems;
      let params = { 
          status : that.data.currentTab === 3 ? '' : that.data.currentTab, 
          page   : this.data.page
        };

      api.getTuanlistList(params, (res)=>{

        let totalPage   =     Math.ceil(res.data.data.page.total/res.data.data.page.pageSize);
        
        let hasMore     =     totalPage > that.data.page && res.data.data.items.length > 0;

        that.setData({
            caiItems    :     arrs.concat(res.data.data.items) , 
            loading     :     true, 
            hasMore     :     hasMore
        })
        this.setCountDown();

        let allArr      =     that.data.caiItems;
     
        that.setData({
            allArr      :     allArr
          })

        wx.hideLoading();
          
      })

    },
    getNowTime: function() {
      var timestamp = Date.parse(new Date());  
      this.setData({
        nowTime : timestamp / 1000
      })
    },
    setNavigationBarTitle:(title) => {

      wx.setNavigationBarTitle({

        title : title

      })
    },
    onShareAppMessage(res) {
      console.log(res);
      
      this.closeCallBack()
      let id        =  wx.getStorageSync('userID') // 分享产品的Id
      let shareMsg  =  this.data.shareMsg;
      if (res.from  === 'button') {
        // 来自页面内转发按钮
      }
      return {

        title   : shareMsg.title,

        path    : `pages/homeDetail/index?course_id=${shareMsg.course_tuan_id}&course_tuan_creater_id=${id}`, // 分享后打开的页面

        success : () => {
          console.log(1);
          
        },
        fail    : ()=>{
          console.log(2);
          
        }
      }
    },
currentTime(intDiff){

  var    day = 0,
        hour = 0,
      minute = 0,
      second = 0;//时间默认值   
  if(intDiff > 0){
         day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
      minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
  }
   if ( hour  <= 9) hour   = '0' + hour;
   if (minute <= 9) minute = '0' + minute;
   if (second <= 9) second = '0' + second;

  let val = `${day}天${hour}小时${minute}分钟${second}秒`

  return val;
  
},
  /**
   * 倒计时
   */
  setCountDown: function(){
        let time         = 1000;
        let { caiItems } = this.data;
        let that         = this;
        let list         = caiItems.map((v, i) =>{
            that.getNowTime();
          
            if (v.timeCha <= 0) {
              v.mcountDown = '已失效';
              return v;
            }
            if (v.status ==  0) {
              var timeCha     =  parseInt(v.created_at) + parseInt(v.countdown) - parseInt(that.data.nowTime);
              v.timeCha       = timeCha;
              let formatTimeD = that.currentTime(timeCha);
              v.timeCha      -= time;
              v.mcountDown    = `${formatTimeD}后失效`;
            } else {
              
              let formatTimeD = util.formatTimeTwo(v.created_at,'Y-M-D h:m:s');
              v.mcountDown    = `${formatTimeD}`;
            }
            
            return v;
        })
        this.setData({
            caiItems  :   list
        });
        
        setTimeout(this.setCountDown, time);
  },
  listItemTap(e){

    let item = e.currentTarget.dataset.item;
    if (parseInt(item.status) === 0) {
      wx.navigateTo({
        url:`/pages/groupDpayDetail/index?id=${item.course.id}&course_tuan_id=${item.course_tuan_id}`
      })
    }
    if (this.data.currentTab === 0) {
      wx.navigateTo({
        url:`/pages/videoPlayDetail/index?id=${item.id}`
      })
    } else {
      if (parseInt(item.course.cate_type) === 20) { // 大咖
  
        wx.navigateTo({
          url: `/pages/dkVideoDetail/index?pid=${item.course.cate_id}&id=${item.course.id}`,
        })

      } else {

        wx.navigateTo({
          url:`/pages/homeVideoDetail/index?pid=${item.course.cate_id}&index=${0}&id=${item.course.id}`
        })
      }
    }
    
  }

})
