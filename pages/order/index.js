//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'

Page({
    data: {
       tabs:[
          {label: '全部 ',  type:'all',current: 3},
          {label: '待支付', type:'dpay', current: 0},
          {label: '已完成', type:'apay', current: 1},
          {label: '已取消', type:'acancel', current: 2},
        ],
        currentTab: 3,
        caiItems: [],
        times: [],
        loading: true,
        hasMore: false,
        page: 1,
        status: ''
    },
    onLoad: function (options) {

      this.setNavigationBarTitle(options.title || '订单列表');
      
      this.refresh();
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
          
          currentTab: e.target.dataset.current,
          hasMore: false
        })
      }

      this.refresh();
    },
    refresh: function () {

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

        } else {

          return ;
        }
    },
    //获取网络数据的方法
    getDataFromServer: function (page) {
      let that = this;

      this.setData({

        loading: false,

        hasMore: true

      })
        //调用网络请求
        let arrs = this.data.caiItems;

        let params = { status :that.data.currentTab === 3 ? '' : that.data.currentTab, page: this.data.page};

        api.getOrderList(params ,(res)=>{
            
          let totalPage =  Math.ceil(res.data.data.page.total/res.data.data.page.pageSize);
        
          let hasMore = totalPage > that.data.page && res.data.data.items.length > 0;

          that.setData({caiItems: arrs.concat(res.data.data.items) , loading: true, hasMore: hasMore})

          wx.hideLoading();
            
        })

    },
    setNavigationBarTitle:(title) => {

      wx.setNavigationBarTitle({

        title: title

      })
    },
    goPayed: function(e){
      console.log(e);
      this.wxPay(JSON.parse(e.detail.wx5));
    },
    wxPay(value){
    let that = this;
    let data = value;
    wx.showLoading({
      title: '拼命加载中...',
      mask: true,
      icon: 'success'
    })
    wx.requestPayment({
      timeStamp: `${data.timestamp}`,
      nonceStr: `${data.nonceStr}`,
      package: `${data.package}`,
      signType: 'MD5',
      paySign: `${data.paySign}`,
      success(res) { 
        that.setData({
          currentTab:1
        })
        wx.hideLoading();
        
      },
      fail(res) {
        wx.showToast({
          title: '支付失败',
          image:'/images/error.png',
          duration: 1000,
          success:()=>{
            wx.hideLoading();
            },
          })
        
       }
    })
  },
  listItemTap(e){
    console.log(e.currentTarget.dataset.item);
    let item = e.currentTarget.dataset.item;
    if (parseInt(item.status) === 0) return;
    if (this.data.currentTab === 0) {
      wx.navigateTo({
        url:`/pages/videoPlayDetail/index?id=${item.id}`
      })
    } else {
      if (parseInt(item.course.cate_type) === 20) { // 大咖
        let that = this;
  
          wx.navigateTo({
            url: `/pages/dkVideoDetail/index?pid=${item.course.cate_type}&id=${item.course.cate_type_2}`,
          })
      } else {
        wx.navigateTo({
          url:`/pages/homeVideoDetail/index?pid=${item.course.cate_type}&index=${0}&id=${item.course.cate_type_2}`
        })
      }
    }
    
  }


})