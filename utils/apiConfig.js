// 封装post请求函数
const hanldleSuccess = (res, successCallback) => {
  successCallback(res);
  // wx.hideNavigationBarLoading();
};

const get = (url, successCallback) => {
  const token = wx.getStorageSync('token');
  let loaded = false;
  // setTimeout(() => {
  //   if (!loaded) {
  //     wx.showLoading();
  //   }
  // }, 500);
  // wx.showNavigationBarLoading()
  const heaherCongfig = {
    "Content-Type": "application/json;charset=UTF-8",
    "Authorization": `Bearer ${token}`
  };

  wx.request({
    url,
    header: heaherCongfig,
    method: "GET",
    success: (res) => {
      wx.hideLoading();
      if (res.data.code=== 200) {
        hanldleSuccess(res, successCallback);
      } else if( res.data.code === 400 || res.data.code === 401) {
        wx.clearStorageSync('token');
        wx.showToast({title:'token过期请重新授权', icon:'none', duration:2000});
       
        setTimeout(()=>{
          wx.switchTab({  
            url: '/pages/index/index',  
            success: function (e) {  
              var page = getCurrentPages().pop();  
              if (page == undefined || page == null) return;  
              page.onShow();  
            }  
          })
        },2100) 
        
      }else {
        wx.showToast({title:res.data.message, icon:'none', duration:2000});
        
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
          // wx.switchTab({  
          //   url: '/pages/index/index',  
          //   success: function (e) {  
          //     var page = getCurrentPages().pop();  
          //     if (page == undefined || page == null) return;  
          //     page.onShow();  
          //   }  
          // })
        },2100) 
      } 
      
    },
    fail: (e) => {
      wx.showToast({ icon: 'none', title: "服务器请求有误！" })
    },
    complete: (res) => {
      loaded = true;
     
    }
  });
};

const post = (url, params, successCallback) => {
  const token = wx.getStorageSync('token');
  let loaded = false;
  // setTimeout(() => {
  //   if (!loaded) {
  //     wx.showLoading();
  //   }
  // }, 500);

  const heaherCongfig = {
    "Content-Type": "application/json;charset=UTF-8",
    "Authorization": `Bearer ${token}`
  };
  wx.request({
    url,
    data: params,
    header: heaherCongfig,
    method: "POST",
    success: (res) => {
      hanldleSuccess(res, successCallback);
    },
    fail: (e) => {
      wx.showToast({ icon: 'none', title: "服务器请求有误！" })
    },
    complete: (res) => {
      loaded = true;
      wx.hideLoading();
    }
  });
};

const put = (url, params, successCallback) => {
  const token = wx.getStorageSync('token');
  let loaded = false;
  setTimeout(() => {
    if (!loaded) {
      wx.showLoading();
    }
  }, 500);

  const heaherCongfig = {
    "Content-Type": "application/json;charset=UTF-8",
    "Authorization": token
  };
  wx.request({
    url,
    data: params,
    header: heaherCongfig,
    method: "PUT",
    success: (res) => {
      hanldleSuccess(res, successCallback);
    },
    fail: (e) => {
      wx.showToast({ icon: 'none', title: "服务器请求有误！" })
    },
    complete: (res) => {
      loaded = true;
      wx.hideLoading();
    }
  });
};

const upload = (url, params, successCallback) => {
  const token = wx.getStorageSync('token');
  const { imgName } = params;

  wx.chooseImage({
    success(res) {
      const img = res.tempFilePaths[0];
      const imgType = img.split('.')[3];
      const now = Math.round(Date.now() / 1000); // 当前第几秒
      const rename = imgName ? `${imgName}-${now}.${imgType}` : `p-${now}.${imgType}`;
      wx.uploadFile({
        url: url,
        filePath: img,
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json',
          "Authorization": token
        },
        name: 'file',
        formData: {
          'rename': rename
        },
        success(res) {
          const data = JSON.parse(res.data)
          if (data.code !== 200) {
            wx.showToast(res.data.msg);
          } else {
            successCallback(data);
          }
        }
      })
    }
  });
};

module.exports = {
  get,
  post,
  put,
  upload,
};



