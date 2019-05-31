const shareInfo = function (info, wx) {

  return {
        title: info.title, // 转发后 所显示的title
        path: info.url, // 相对的路径
        success: (res)=>{    // 成功后要做的事情
          console.log(res.shareTickets[0])
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: (res)=> { 
              that.setData({
                isShow:true
              }) 
              console.log(that.setData.isShow)
             },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) }
          })
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
}
const currentDownTime = function () {

}
const currentTime = function(intDiff) {

    var  day = 0,
        hour = 0,
      minute = 0,
      second = 0;//时间默认值   
  if(intDiff > 0){
         day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
      minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
  }
    if (hour <= 9)  
        hour = '0' + hour;
  if (minute <= 9) 
      minute = '0' + minute;
  if (second <= 9) 
      second = '0' + second;
    
     let val = `${day} : ${hour} : ${minute} : ${second}`

  return val;
  
}
const isPoneAvailable = function ($poneInput) {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test($poneInput)) {
                return false;
            } else {
                return true;
            }
        }
  const getToken = function(wx) {
  return wx.getStorageSync('token');
}
const onGotUserInfo = function(that) {

  wx.login({

    success (res) {

      if (res.code) { // 登录成功，获取用户信息
      
        getCode(res.code,that);
      } 
      else {
        that.setData({
          hide2: false,
          type: 'error',
          desMsg: '登录失败,请稍后再试！'
        })
      setTimeout(() => {
        that.setData({
          hide2: true
        })
      },that.data.toastDurating) 
          // that.showToast('登录失败','none',1000)
      }
    },
    file(e){
        console.log(e);
    }
  })
}
const getCode = function ( params ,that){
  wx.showLoading({
    title: '授权中...',
  })
  api.getCode(params,(res) => {
    if (res.data.code === 200) {
      getUserInfo( res.data.data.auth_key, that )
    } else {
      wx.hideLoading();
      that.setData({
        hide2: false,
        type: 'error',
        desMsg: '授权失败，请稍后重试！'
      })
    }
    setTimeout(()=>{
      that.setData({
       hide2: true
      })
    },that.data.toastDurating) 
    
  })
}
const getUserInfo = function(auth_key, that) {
   wx.getUserInfo({ // 获取成功，全局存储用户信息，开发者服务器登录

      success (res) { // 全局存储用户信息
        wx.hideLoading();
        postLogin( res.iv, res.encryptedData, res.signature, res.rawData, auth_key, that)
      },
      fail () {
        wx.hideLoading();
        that.setData({
          hide2: false,
          type: 'error',
          desMsg: '授权失败，请稍后重试！'
        })
        setTimeout(()=>{
          that.setData({
            hide2: true
          })
        },that.data.toastDurating) 
      }
    })
}
const postLogin = function( iv, encryptedData, signature, rawData, auth_key, that) {

  let params = {
               iv: iv,
    encryptedData: encryptedData,
        signature: signature,
          rawData: rawData,
         auth_key: auth_key
    }
     
  api.postDecode(params, (res) => {

      let statusCode = res.data.code;

      if (statusCode === 200 ) {

        that.setData({
          hide2: false,
          type: 'success',
          desMsg: '恭喜您授权成功！',
          isLogin: true
        })
        const token = res.data.data.access_token;
        app.globalData.userId = res.data.data.member.id;
        app.globalData.head_portrait = res.data.data.member.head_portrait;
        wx.setStorage({
          key: 'userID',
          data:res.data.data.member.id
        })
        wx.setStorage({
              key: 'token',
             data: token,
          success: () => {
            that.getmyMain();
          },
        });
      
          
      } else {

        wx.hideLoading();
        that.setData({
          hide2: false,
          type: 'error',
          desMsg: '授权失败，请稍后重试！'
        })
        setTimeout(()=>{
          that.setData({
            hide2: true
          })
        },that.data.toastDurating) 
        
      }
          
  })
}

export {shareInfo, currentDownTime, currentTime, getToken, isPoneAvailable, onGotUserInfo}