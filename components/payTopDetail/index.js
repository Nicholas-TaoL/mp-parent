//Component Object
Component({
  properties: {
    mineLists: {
      type:Array
    },
    showDialog: {
      type:false
    },
    msg:{
      type: Object
    },
    type: {
      type: String
    }

  },
  data: {
  },
  methods: {
    toggleDialog() {
      this.setData({
        showDialog: !this.data.showDialog
      });
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
  
