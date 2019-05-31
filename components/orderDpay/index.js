//Component Object

const status = {
  0: '代支付',
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
    currentTab: {
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
    onPayed(){
      this.triggerEvent('payed',this.data.value)
    },
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
  
