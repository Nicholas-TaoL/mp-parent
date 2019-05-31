//Component Object
const status = {
  0: '拼团中',
  1: '成功',
  2: '失败'
}
Component({
  properties: {
    mineLists: {
      type:Array
    },
    showDialog: {
      type:false
    },
    value:{
      type:Object
    },
    allArr: {
      type: Array
    },
    index: {
      type: Number
    }

  },
  data: {
    payType:''
  },
  methods: {
    toggleDialog() {
      this.setData({
        showDialog: !this.data.showDialog
      });
    },
    btnTap(e){

      this.triggerEvent('groupBtnClick',e.target.dataset.status)
    }
  },
  created: function() {
    
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
  
