//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api'
import {isPoneAvailable} from '../../utils/tool'

let obj = {}
Page({
  data: {
    motto: '申请成为社群团长',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name:'',
    showDialog: false,
    isHid:false,
    msg:{},
    hide1: true,
    hide2: true,
    toastDurating: 2200,
    isLoadToast: false,
    type: 'success',
    desMsg: '',
    cutdown:true,
    basUrl:'https://api.qiandengli.com/attachment/wx_images',


  },
  onApplyCommander: function () {
    let that = this;
    api.postLeader(obj, (res)=>{
      let type , desMsg = ''
      
      if (res.data.code === 200) {
        type = 'success';
        desMsg = '三个工作日内审核完成，请耐心等待！';
        cutdown = true;
        wx.setStorageSync('is_tuanzhang', 1);
        wx.navigateTo({
          url:'/pages/mine/index'
        })
      } else {
        type = 'error';
        desMsg = res.data.message;
      } 
      that.setData({
        hide2: false,
        type:type,
        desMsg:desMsg
      })
      setTimeout(()=>{
        that.setData({
          hide2: true
        })
      },that.data.toastDurating) 
      
    })
    
  },
  inputMsg(e){
    obj = e.detail
  },
  onParentEvent(event){
    this.setData({
      isHid: event.detail
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onBlockBanner: () => {
    wx.navigateTo({
      url: '../homeDetail/index'
    })
  },
  setNavigationBarTitle:() => {
    wx.setNavigationBarTitle({
      title: '申请成为社群团长' 
    })
  },
  onRuleToast: function () {
    console.log(111)
    this.setData({
      showDialog: true,
      isHid: true
    })
  },
  closeCallBack(e){
    console.log(e.currentTarget);
    
  },
  apiPostCode(e){
    let msg = e.detail;
    let that = this;
    api.postCode(msg, (res) => {
          let type , desMsg = ''
          let cutdown = false
      if (res.data.code === 200) {
        type = 'success';
        desMsg = '验证码发送成功，请注意查收！';
        cutdown = true;
      } else {
        type = 'error';
        desMsg = '网络繁忙，请稍后重试！';
        cutdown = false;
      } 
      that.setData({
        hide2: false,
        type:type,
        desMsg:desMsg,
        cutdown:cutdown
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
    
  }
})
