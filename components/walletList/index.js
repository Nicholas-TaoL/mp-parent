//Component Object
Component({
  properties: {

  },
  data: {
    tabs:[
      {label:'星币明细',icon: '/images/xbmx.png'},
      {label:'星股记录',icon: '/images/xgjl.png'},
      {label:'提现记录',icon: '/images/txjl.png'}
    ]
  },
  methods: {
   handleToDetail(e){
     let item = e.target.dataset.item;
     console.log(item);
     
     this.triggerEvent('parentEvent', item)
   }
  },
  created: function() {

  }
});
  
