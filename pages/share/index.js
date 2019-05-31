import api from "../../utils/api";
import {shareInfo} from '../../utils/tool'
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '分享',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    course_id: '',
    msg:{},
    basUrl:'https://api.qiandengli.com/attachment/wx_images',
    items:['被邀请的好友需是未在火柴父母学堂支付过订单的 用户。','邀请人将活动分享给好友，被邀请人首次进入邀请 页面视为与邀请人建立邀请关系，邀请关系有效期 为14日。 ',
    '被邀请人与邀请人成功绑定之后，邀请人将获得100 星币奖励，星币可以用于购买平台各类商品，具体 见商品详情页说明。',
    '被邀请人购买邀请人，或其邀请的其他新用户发布 的商品，邀请人不可获得奖励。',
    '请通过微信好友、微信群及微信朋友圈邀请，其他 途径邀请无效。',
    '在法律允许的范围内，火柴父母学堂公司拥有对本 次活动进行解释的权利。若发现存在套现、历史记 录不良等行为，火柴父母学堂有权取消']
  },
  //事件处理函数
 
  setNavigationBarTitle:() => {
    wx.setNavigationBarTitle({
      title: '邀请有奖' 
    })
  },
  onReady:function () {
    this.setNavigationBarTitle();
  },
  onLoad: function (options) {
   
    this.setData({
      course_id: options.course_id
    })
    
    this.wxGetImageInfo();
  },
  onShow(){
    let userID = wx.getStorageSync('userID')
     
    this.getShare(this.data.course_id, userID)
  },
  getShare(course_id, userID){
    let that = this;
    console.log(course_id, userID);
    
    api.getShare({course_id:course_id,userID:userID}, (res) => {
      let value = res.data.data;
      value.origin_price = value.price
      value.price = value.tuan_price
      
      that.setData({
        msg: value
      })
    })
  },
  wxGetImageInfo(){
   let info = wx.getImageInfo;
   console.log(info);
   
  },
  shareClick(){
    this.onShareAppMessage()
  },
  onShareAppMessage:function() {
   console.log(111);
   let that =this;
   let userId = app.globalData.userId;
   let klassId = that.data.course_id;

     let msg = {
       title: '大V详情',
       path: `/pages/homeDetail/index?share_id=${userId}&course_id=${klassId}`
     }
      shareInfo(msg, wx)
  },
 
  
  
  
})
