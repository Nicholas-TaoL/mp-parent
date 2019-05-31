// //index.js
// //获取应用实例
const app = getApp()
import api from '../../utils/api'
var time = require('../../utils/util');

Page({
    data: {
        caiItems: [],
        times: [],
        loading: true,
        hasMore: false,
        page: 1,
        type: 0,
        total:1
    },
    onLoad: function (options) {

      console.log(options);
      if (options.title === '星币') {
        this.setData({
          type: 0
        })
      } else if (options.title === '星股') {
        this.setData({
          type: 1
        })
      } else {
        this.setData({
          type: 2
        })
      }
      this.setNavigationBarTitle(`${options.title}明细` || '人民币明细');
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

        this.getDataFromServer(this.data.page)
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
        let type = this.data.type;
        // console.log(page > that.data.total);
        
        if (page > that.data.total) {
          this.setData({
            loading: true,
            hasMore: false
          })
          return ;
        }
         api.getClist({page : page, page_size : 10, type:type},(res)=>{

            that.setData({caiItems: arrs.concat(res.data.data.items) , loading: true, hasMore: false})

            let total = Math.ceil(res.data.data.page.total / res.data.data.page.pageSize);

            let tarrs = [];
            let lists = that.data.caiItems;

            lists.forEach(element => {

              tarrs.push(time.formatTimeTwo(element.created_at,'Y-M-D h:m:s'))

            });

            that.setData({
              times: tarrs,
              total: total
            })
         })

    },
    setNavigationBarTitle:(title) => {
      wx.setNavigationBarTitle({
        title: title
      })
    }


})
