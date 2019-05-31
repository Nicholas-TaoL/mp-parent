//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'

Page({
    data: {
       tabs:[
          {label: '最近学习', type:'study', current: 0},
          {label: '最近购买', type:'buy', current: 1},
        ],
        currentTab: 0,
        caiItems: [],
        times: [],
        loading: true,
        hasMore: false,
        page: 1,
        status: ''
    },
    onLoad: function (options) {

      this.setNavigationBarTitle(options.title || '已购课程');
      
    },
    onShow(){
     
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

        console.log("上拉拉加载更多...." + this.data.page,this.data.hasMore)

        if (this.data.hasMore) {
         
          this.getDataFromServer(this.data.page)

        } else {

          return ;
        }
    },
    //获取网络数据的方法
    getDataFromServer: function (page) {
      let that = this;

      wx.showLoading({
        title: '拼命加载中...',
        mask: true,
        icon: 'success'
      })

      this.setData({

        loading: false,

        hasMore: true

      })
        //调用网络请求
        let params = {
          status: this.data.currentTab,
          page: this.data.page
        }
        let arrs = this.data.caiItems;
        api.getBuyed(params ,(res)=>{
            
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
    listItemTap(e){
      console.log(e.currentTarget.dataset.item);
      let item = e.currentTarget.dataset.item;
      if (this.data.currentTab === 0) {
        wx.navigateTo({
          url:`/pages/videoPlayDetail/index?id=${item.id}`
        })
      } else {
        if (parseInt(item.pid) === 20) { // 大咖
          let that = this;
    
            wx.navigateTo({
              url: `/pages/dkVideoDetail/index?pid=${item.pid}&id=${item.id}`,
            })
        } else {
          wx.navigateTo({
            url:`/pages/homeVideoDetail/index?pid=${item.pid}&index=${0}&id=${item.id}`
          })
        }
      }
      
    }



})