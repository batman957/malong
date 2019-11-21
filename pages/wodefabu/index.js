Page({
  data: {
    selected: '1',
    list: []
  },
  selectTab: function (e) {
    console.log(e)
    this.setData({
      selected: e.currentTarget.dataset.num
    })
  },
})
