import api from "../../utils/api";
import { shareInfo, currentTime} from '../../utils/tool';
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    params          :      {},
    info            :      {},
    curtDownTime    :      '',
    domValue        :      ''
  },

  //事件处理函数

  setNavigationBarTitle:() => {
    wx.setNavigationBarTitle({
      title                : '火热拼团中' 
    })
  },
  onReady: function () {

    this.setNavigationBarTitle();

  },
  onLoad: function (options) {

    let params                  =      {
      share_id                  :        wx.getStorageSync('userID'),
      course_id                 :        options.id,
      course_tuan_creater_id    :        options.course_tuan_id
    }
    
    this.setData({
      params     :    params
    })
    
  },
  onShow(){
    this.apiGetDetail()
  },
  apiGetDetail(){
    let params                  =             this.data.params;
    api.getShare(params, (res)  =>  {
        console.log(res);
        
        this.setData({
          info                  :             res.data.data,
          curtDownTime          :             res.data.data.diff_cha
        })
        this.setCountDown();

        
    })
  },
  onShareAppMessage(res) {

    let shareMsg         = this.data.info;
    let params         = this.data.params;
    if (res.from         === 'button') {
      // 来自页面内转发按钮
    }
    return {

      title   :  shareMsg.title,

      path    : `pages/homeDetail/index?course_id=${params.course_id}&share_id=${params.share_id}&&course_tuan_creater_id=${params.course_tuan_creater_id}`, // 分享后打开的页面


      success : () => {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })        
      },
      fail    : ()=>{
        wx.showToast({
          title: '分享失败',
          duration: 1500
        })   
      }
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
      let time          =     1000;//s
      let curtDownTime  =     this.data.curtDownTime
      let domValue      =     ''
      if (curtDownTime  <=    0) {
        domValue        =    '00 : 00 : 00'
        return domValue;
      }
      curtDownTime      -=    1;
      let formatTimeD   =     currentTime(curtDownTime);
      domValue          =     formatTimeD;
      this.setData({
        curtDownTime    :     curtDownTime,
        domValue        :     domValue
      })
      
      setTimeout(this.setCountDown, time);
      
    },
})
