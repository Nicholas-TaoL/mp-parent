//Component Object
Component({
  properties: {
    swipObj:{
      type:Object,
      value:{}
    },
    currentTab: {
      type: Number,
    },
    tabs:{
      type:Array,
    },
    listType: {
      type:String
    }
    

  },
  data: {
    page: 1,
    pages: 0,
    articles: [],

    scrollHeight:0,
    moreLoading:false,
    toView: 'red',
    scrollTop: 0,
    isActive:null,   
    listMain:[],
    listTitles: [],
    fixedTitle:null,    
    toView: 'inToView0',
    oHeight:[],
    scroolHeight:0,
    types:['myxz','myzs'],
    achieve: {
      maths:[
        {
          m:'02',
          lists:[
            {time:2, title: '《夏山学校》', long: '5课时'},
            {time:2, title: '《夏山学校》', long: '6课时'},
            {time:2, title: '《夏山学校》', long: '7课时'},
          ]
        },  
        {
          m:'03',
          lists:[
            {time:2, title: '《夏山学校》', long: '8课时'},
            {time:2, title: '《夏山学校》', long: '9课时'},
            {time:2, title: '《夏山学校》', long: '9课时'},
            {time:2, title: '《夏山学校》', long: '9课时'},
            {time:2, title: '《夏山学校》', long: '9课时'},
            {time:2, title: '《夏山学校》', long: '9课时'}
          ]
        },  
      ]
    }
  },
  methods: {
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
    },
    scroll(e){

      this.setData({
        scroolHeight: e.detail.scrollTop
      });
      for (let i in this.data.oHeight){
        if (e.detail.scrollTop < this.data.oHeight[i].height){
          this.setData({
            isActive: this.data.oHeight[i].key,
            fixedTitle:this.data.oHeight[i].name
          });
          return false;
        }
      }
    },
    orderUpper(e){
      console.log('top');
    },
    orderLower(e){
      console.log('---',e);
      this.setData({
        moreLoading: true
      })
      setTimeout(()=>{
        this.setData({
          moreLoading: false
        })
      },1000)
      this.triggerEvent('parentEvent')
    },
    orderScroll(e){
      
    },
    checkitem(e){
      console.log(e.target.dataset);
      
  },
  getBrands:function(){
    var that=this;
    var arrs = that.data.achieve.maths;
    // wx.request({
    //   url: '获取数据地址',
    //   success(res) {
        // if(res.data.status==0){
          var someTtitle = null;
          var someArr=[];
          for(var i = 0; i < arrs.length; i++){
            var newBrands = { brandId: i, name: arrs[i].m };
            if (arrs[i].m != someTtitle){
              someTtitle = arrs[i].m
              var newObj = {
                id: i,
                region: someTtitle,
                brands: []
              };
              someArr.push(newObj)
            }
            newObj.brands.push(newBrands);
            
          };
          //赋值给列表值
          that.setData({
            listMain:someArr
          });
          //赋值给当前高亮的isActive
          that.setData({
            isActive: that.data.listMain[0].id,
            fixedTitle: that.data.listMain[0].region
          });
 
 
          //计算分组高度,wx.createSelectotQuery()获取节点信息
          var number=0;
          
          for (let i = 0; i < that.data.listMain.length; i++) {
            let element = wx.createSelectorQuery().in(that).select('#inToView' + that.data.listMain[i].id);
              // wx.createSelectorQuery().in(that).select('#inToView' + that.data.listMain[i].id).boundingClientRect(function (rect) {
                
                
              //   number = rect.height + number;

              //   var newArry = [{ 'height': number, 'key': rect.dataset.id, "name": that.data.listMain[i].region}]
               
              //   that.setData({

              //     oHeight: that.data.oHeight.concat(newArry)
              //   })

              // }).exec()
            
          };
        // }
    //   }
    // })
    }
  },
  created: function() {
    this.getBrands();
    var that = this;
		// 获取屏幕高度
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					scrollHeight: res.windowHeight
				});
			}
    })
    // console.log(that.data);
    
  },
  attached: function() {

  },
  ready: function() {

  },
  moved: function() {

  },
  detached: function() {

  },
});
  
