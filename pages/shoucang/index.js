const app = getApp()
Page({
  data: {
    selected: '1',
    page: 1,
    limit: 10,
    record_type: 1,
    jobList: [],
    companyList: [],
    finished: false
  },
  goToCompany(e) {
    wx.navigateTo({
      url: `/pages/company/index?id=${e.currentTarget.dataset.id}`
    })
  },
  goToJob(e) {
    wx.navigateTo({
      url: `/pages/job/index?id=${e.currentTarget.dataset.id}`
    })
  },
  selectTab: function (e) {
    this.setData({
      page: 1,
      limit: 10,
      companyList: []
    })
    this.setData({
      selected: e.currentTarget.dataset.num
    })
    if (this.data.selected === '1') {
      app.fun.post('/user/collectList', {
        page: this.data.page,
        limit: this.data.limit,
        record_type: 1
      }).then((res) => {
        this.setData({
          companyList: res.result
        })
      })
    } else if (this.data.selected === '2') {
      app.fun.post('/user/collectList', {
        page: this.data.page,
        limit: this.data.limit,
        record_type: 2
      }).then((res) => {
        this.setData({
          jobList: res.result
        })
      })
    }
  },
  onLoad() {
    app.fun.post('/user/collectList', {
      page: this.data.page,
      limit: this.data.limit,
      record_type: this.data.record_type
    }).then((res) => {
      this.setData({
        companyList: res.result
      })
    })
  },
  onReachBottom() {
    let that = this
    if (this.data.finished === true) {
      return
    }
    if (this.data.selected === '1') {
      this.setData({
        record_type: 1
      })
    } else if (this.data.selected === '2') {
      this.setData({
        record_type: 2
      })
    }
    app.fun.post('/user/collectList', {
      page: this.data.page + 1,
      limit: this.data.limit,
      record_type: this.data.record_type
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
