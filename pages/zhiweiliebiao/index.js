const app =getApp()
Page({
  data: {
    page: 1,
    limit: 10,
    jobList: [],
    finished:false
  },
  goTojob(e) {
    wx.navigateTo({
      url: `/pages/job/index?id=${e.currentTarget.dataset.id}`
    })
  },
  onReachBottom() {
    let that = this
    if (this.data.finished === true) {
      return
    }
    app.fun.post('/home/recruit', {
      page: this.data.page + 1,
      limit: this.data.limit
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
  onLoad() {
    const searchCondition = app.globalData.searchCondition
    app.fun.post('/home/recruit', {
      page: searchCondition.page,
      limit: searchCondition.limit,
      fir_type: searchCondition.fir_type,
      sec_type: searchCondition.sec_type,
      property: searchCondition.property,
      experience: searchCondition.experience,
      degree: searchCondition.degree,
      salary_type: searchCondition.salary_type,
    }).then((res) => {
      this.setData({
        jobList: res.result,
        showList: true
      })
    })
  }
})
