import api from "../../utils/api";
import { shareInfo, currentTime} from '../../utils/tool';
import util from '../../utils/util'
const app = getApp()
let myGroupLists = []
let array = []
let scrollDistance = 0
let rotate = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
       isShowAlert: false,
       isPlay:true,
       voiceTempFilePath:'',
       isShowModel:false, 
       modelAnimation:null,
       circleAnimate:null,
       title: '',
       isTop: true,
       animation: null,
       curTimeVal: 0,
       max: 620,
       min:0,
       startTime:'',
       endTime:'',
       tabs:[
         {
           title:'音频文稿', id: 0
         },
         {
           title:'互动讨论', id: 1
         }
       ],
       currentTab:0,
       indicatorDots: false,
       autoplay: false,
       interval: 1000,
       duration: 500,
       wordDesTitle:'<p style = "text-align:left;">大V课程系列第一期·教育专家郝美带你读<b>《带你走近孩子世界》</b>?大V课程系列第一期·教育专家郝美带你读《带你走近孩子世界》?大V课程系列第一期·教育专家郝美带你读《带你走近孩子世界》?大V课程系列第一期·教育专家郝美带你读《带你走近孩子世界》?</p>',
       wordDes:'',
      lists:[
      ],
      bCurrent:0,
      multipleItems:1,
      id:'',
      produck_image:'',
      update_num:'',
      title:'',
      plLists: [],
      head_portrait:'',
      hide2: true,
      toastDurating: 1300,
      isLoadToast: false,
      type: 'success',
      desMsg: '',
      basUrl:'https://api.qiandengli.com/attachment/wx_images',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let course_id = wx.getStorageSync('course_id');
    this.setData({
      course_id:course_id,
      id:options.id
    })
    this.animate = wx.createAnimation({
        duration:1000,
        timingFunction:"liner"
      })
    this.circleAnimate = wx.createAnimation({
        duration:1000,
        timingFunction:"liner"
      })
      this.setData({
        action: {
          method: 'play'
        }
      });
    this.watchPlay();
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
    this.getCourseDes();
    this.setData({
      head_portrait : app.globalData.userInfo.avatarUrl
    })
    console.log(app.globalData);
    
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
    this.innerAudioContext.destroy();
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

   //滑动切换
  switchSwiper: function (e) {

    var that = this;
    that.setData({
        currentTab: e.detail.current
    });
    if (e.detail.current === 1) {
      this.getDiscuss()
    }
  },

  // 1.查询菜单栏距离文档顶部的距离menuTop
    initClientRect: function () {
      // var that = this;
      // wx.createSelectorQuery().select('#tab-wrap').boundingClientRect().exec((res)=>{
      //   that.setData({
      //     fixedTop: res[0].top
      //   })
      // })  
    },
// 2.监听页面滚动距离scrollTop
    onPageScroll: function (e) {
      
      let s = e.scrollTop - scrollDistance;

      if (e.scrollTop >= 0) {
        this.setData({
          idTopFixedShow: true
        })
      } else {
        this.setData({
          idTopFixedShow: false
        })
      } 
    },
    handletouchtart: function (event) {
      // console.log(event)
      // 赋值
      this.data.lastX = event.touches[0].pageX
      this.data.lastY = event.touches[0].pageY
    },
    handletouchmove: function (event) {
    // console.log(event)
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    let tx = currentX - this.data.lastX
    let ty = currentY - this.data.lastY
    let text = ""
 
    if (Math.abs(tx) > Math.abs(ty)) {
      //左右方向滑动
      if (tx < 0)
        text = "向左滑动"
      else if (tx > 0)
        text = "向右滑动"
    }
    else {
      //上下方向滑动
      if (ty < 0) {
        this.setData({
          isTop:true
        })
      } else {
        this.setData({
          isTop:false
        })
      }
      // this.bottomToggle()
       
    }
 
  },
    bottomToggle(){
      let that = this;
      let top = null;
     
      if( that.data.isTop ) {
        top = 0
      } else {
        top = 86
      }
      rotate += 180;
      console.log(rotate);
      
      that.animate.top(`${top}%`).step();
      that.circleAnimate.rotate(rotate).step();
      that.setData({
        animation: that.animate.export(),
        circleAnimate: that.circleAnimate.export(),
        isTop: !that.data.isTop
      })  
      
    } ,
    sliderChange(e){
      console.log(e);
      this.innerAudioContext.stop()
      this.innerAudioContext.seek(e.detail.value);

      this.innerAudioContext.play()
        
    },
    sliderChanging(e){
      console.log(e.detail.value);
      this.setData({
        startTime: `${parseInt(e.detail.value / 60)}:${e.detail.value % 60}`
      })
      this.innerAudioContext.stop()
      this.innerAudioContext.seek(e.detail.value);

      this.innerAudioContext.play()
    },
    tabSelect(e){
      this.setData({
        currentTab: e.currentTarget.dataset.tab.id
      })
    },
    menuTap(e){
      let that = this
      console.log(e.currentTarget.dataset.item);
      let item = e.currentTarget.dataset.item;
      
      that.modelAnimate = wx.createAnimation({
         duration:300,
         timingFunction:"liner"
      })
      let bottom = 0;
      if (that.data.isShowModel) {
         bottom = -100
           setTimeout(()=>{
            that.setData({
              isShowModel: false
            })
          },300)
      } else {
        bottom = 0
         that.setData({
            isShowModel: true
          })
      }
      console.log(bottom);
      if (item == 0) {
        
      } else {
        if (item.id == this.data.id) {
          
        }else {
          this.setData({
            id:item.id
          })
          this.getCourseDes()
          this.innerAudioContext.stop()
          this.innerAudioContext.seek(e.detail.value);
          this.innerAudioContext.play()
        }
      }
      setTimeout(()=>{
        that.modelAnimate.bottom(`${bottom}%`).step();
        that.setData({
          modelAnimation: that.modelAnimate.export(),
        })
      })
      
    },
    initAudio(){

      this.innerAudioContext.autoplay = true;

      this.innerAudioContext.src = this.data.voiceTempFilePath; 
       

    },
    watchPlay(){
      let that = this;
      this.innerAudioContext = wx.createInnerAudioContext();
      
      this.innerAudioContext.onPlay((e)=>{

       setTimeout(()=>{

          let duration = parseInt(this.innerAudioContext.duration)
          let h = parseInt( duration / 60 ) < 10 ? `0${parseInt( duration / 60 )}`:parseInt( duration / 60 );
          let m = parseInt( duration % 60 ) < 10 ? `0${parseInt( duration % 60 )}`:parseInt( duration % 60 );
       
          this.setData({
            endTime:`${h} : ${m}`,
            max:duration
          })
        },1000)
        
      });
      this.innerAudioContext.onWaiting((e) => {
        console.log('wating',e);
        
      });
      this.innerAudioContext.onEnded(() => {
        console.log('end');
        
      });
      this.innerAudioContext.onPause(() => {
        console.log('pause');
        
      });
      this.innerAudioContext.onStop(() => {
        console.log('stop');
        
      });
      this.innerAudioContext.onCanplay((e) => {
        console.log('状态',e);
        this.innerAudioContext.duration;
        
      });
      this.innerAudioContext.onTimeUpdate((e) => {
        let start = parseInt(this.innerAudioContext.currentTime);
        let h = parseInt( start / 60 ) < 10 ? `0${parseInt( start / 60 )}`:parseInt( start / 60 );
        let m = parseInt( start % 60 ) < 10 ? `0${parseInt( start % 60 )}`:parseInt( start % 60 );
       
        this.setData({
            startTime:`${h} : ${m}`,
            curTimeVal:start
        })
      });
      this.innerAudioContext.onError((errMsg) => {
        console.log(errMsg);
      });
        
    },
    /**
     * 上一曲
     *  */
    preTap(){

    },
    /**
     * 播放 / 暂停
     *  */
    playerTap(){
      let that = this;
      if (this.data.isPlay) {
        this.innerAudioContext.pause()
      } else {
        this.innerAudioContext.play()
      }
      this.setData({
        isPlay: !that.data.isPlay
      })
      
    },
    /**
     * 下一曲
     *  */
    nextTap(){},
    writeTap(){
      this.setData({
        isShowAlert: !this.data.isShowAlert
      })
    },
    sendTap(e){
      console.log(e.detail);
      this.setData({
        isShowAlert: !this.data.isShowAlert
      })
      let params = {
        content: e.detail,
        course_id: this.data.id
      }
      this.postCreateBbs(params);
    },
    getCourseDes(){
      
      wx.showLoading({
        title: '拼命加载中...',
        mask: true,
        icon: 'success'
      })
      
      api.getCourseDes({id: this.data.id}, (res) => {

        let value = res.data.data
        let currentId = value.id;
      
        for (let index = 0; index < value.lists.length; index++) {
          const element = value.lists[index];
          if (element.id === currentId) {
            this.setData({
              bCurrent: index
            })
          }
        }

        this.setData({
          voiceTempFilePath: value.produck_url,
          wordDesTitle: value.content,
          produck_image: value.produck_image,
          update_num: value.update_num,
          title: value.title,
          lists: value.lists,
          multipleItems: value.lists.length >= 3 ? 3 :value.lists.length
        })
        console.log(this.data);
        
        setTimeout(()=>{
          this.initAudio();
        })
      })
    },
    getDiscuss(){
      api.getDiscuss({id: this.data.id}, (res) => {

        let data = res.data.data;
       
        this.setData({
          plLists: data,
        })
      })
    },
    postCreateBbs(params){
      api.postCreateBbs(params, (res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.setData({
            hide2: false,
            type: 'success',
            desMsg: '恭喜您评论成功！',
            isLogin: true
          })
          this.getDiscuss();
        } else {
          this.setData({
            hide2: false,
            type: 'error',
            desMsg: '评论失败，请稍后重试！'
          })
        }
        setTimeout(()=>{
          this.setData({
            hide2: true
          })
        },this.data.toastDurating) 
      })
    }
   

    
})