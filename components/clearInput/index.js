//Component Object
Component({
  properties: {
    label:{
      type: String,
      value: ''
    },
    // isClearShow: {
    //   type: Boolean,
    //   value: false
    // },
    // placeHoder: {
    //   type: String,
    //   value: ''
    // },
    name: {
      type:String,
      value:''
    },
    // inputType: {
    //   value: String,
    //   value: 'text'
    // },
    // maxlength: {
    //   type: Number,
    //   value: 11
    // }
  },
  data: {
  },
  methods: {
    toggleDialog() {
      this.setData({
        showDialog: !this.data.showDialog
      });
    },
    watchName: function(e) {
      var value = e.detail.value;
       if (value === null || value === undefined || value.length === 0) {
         this.setData({
            isClearShow: false
         });
       } else {
         this.setData({
            name: value,
            isClearShow: true
         });
       }
    },
    clearName: function () {
      if (this.data.isClearShow) {
        this.setData({
         isClearShow: false,
         name:''
       });
      } else {
        return ;
      }
    },
  },
  created: function() {
console.log(this.data);

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
  
