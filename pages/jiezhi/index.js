const app = getApp()
Page({
  data: {
    list: [],
    page: 1,
    limit: 10,
    finished: false
  },
  goToApply() {
    wx.navigateTo({
      url: '/pages/jiezhishenqing/index?type=apply'
    })
  },
  goToDetail(e) {
    wx.navigateTo({
      url: `/pages/jiezhishenqing/index?type=detail&id=${e.currentTarget.dataset.id}`
    })
  },
  onLoad() {
    app.fun.post('/user/borrowingList', {
      page: this.data.page,
      limit: this.data.limit,
      type: 'user'
    }).then((res) => {
      this.setData({
        list: res.result
      })
    })
  },
  onReachBottom() {
    if (this.data.finished === true) {
      return
    }
    app.fun.post('/user/borrowingList', {
      page: this.data.page + 1,
      limit: this.data.limit,
      status: this.data.status
    }).then((res) => {
      if (res.result.length) {
        this.setData({
          list: this.data.list.concat(res.result)
        })
        this.data.page++
        this.setData({
          page: this.data.page
        })
      } else {
        this.setData({
          finished: true
        })
      }
    })
  },
})
