Page({
  data: {
    type: [
      {
        id: 1,
        label: '全职'
      }, {
        id: 2,
        label: '兼职'
      }, {
        id: 3,
        label: '小时工'
      }, {
        id: 4,
        label: '实习'
      }
    ],
    selectedType: null
  },
  selectType: function (e) {
    this.data.selectedType = this.data.type[e.detail.value].label
    console.log(this.data.selectedType)
   }
})
