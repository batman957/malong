const app = getApp()
Page({
  data: {
    list: [],
    page: 1,
    limit: 10,
    finished:false
  },
  goToPage(e) {
    wx.navigateTo({
      url: `/pages/job/index?id=${e.currentTarget.dataset.id}`
    })
  },
  onLoad() {
    app.fun.post('/user/deliveryList', {
      page: this.data.page,
      limit: this.data.limit
    }).then((res) => {
      this.setData({
        list: res.result
      })
    })
  },
  onReachBottom() {
    let that = this
    if (this.data.finished === true) {
      return
    }
    app.fun.post('/user/deliveryList', {
      page: this.data.page + 1,
      limit: this.data.limit
    }).then((res) => {
      if (res.result.length) {
          this.setData({
            list: this.data.list.concat(res.result)
          })
        this.data.page++
        this.setData({
          page:this.data.page
        })
      } else {
        this.setData({
          finished: true
        })
      }
    })
  },
})
