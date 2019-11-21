const app = getApp()
Page({
  data: {
    id:0,
    showPop:false,
    list: [],
    date: null,
    reason:null,
    page: 1,
    limit: 10,
    finished: false,
    detail: [],
    shop_name: null,
    showapply: false
  },
  goToDayin(e) {
    wx.navigateTo({
      url: `/pages/dayin/index?id=${e.currentTarget.dataset.id}`
    })
  },
  showStatus: function (e) {
    this.setData({
      showPop: true,
      id: e.currentTarget.dataset.id,
      shop_name: e.currentTarget.dataset.name
    })
    app.fun.post('/user/workersCareer', {
      id: e.currentTarget.dataset.id
    }).then((res) => {
      this.setData({
       detail: res.result
      })
    })
  },
  closePop: function () {
    this.setData({
      showPop: false
    })
  },
  onLoad() {
    app.fun.post('/user/workersRecord', {
      page: this.data.page,
      limit: this.data.limit
    }).then((res) => {
      this.setData({
        list: res.result
      })
    })
  },
  getReason(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  getDate(e) {
    this.setData({
      date:e.detail.value
    })
    console.log(this.data.date)
  },
  onReachBottom() {
    let that = this
    if (this.data.finished === true) {
      return
    }
    app.fun.post('/user/workersRecord', {
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
  shopApply(e) {
    this.setData({
      id: e.currentTarget.dataset.id,
      showapply: true
    })
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.opacity(1).step()
    this.setData({
      animationData: animation.export()
    })
  },
  closeApply: function () {
    let _this = this
    setTimeout(function () {
      _this.setData({
        showapply: false
      })
    }, 200)
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData: animation.export()
    })
  },
  applyLeave(e) {
    app.fun.post('/user/leavingApply', {
      id: this.data.id,
      leaving_reason: this.data.reason,
      leaving_date:this.data.date
    }).then((res) => {
      wx.showToast({
        title: res.msg
      })
      this.setData({
        date: null,
        reason: null
      })
      this.closeApply()
      this.onLoad()
    })
  },
  onShow() {
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData: animation.export()
    })
  },
})
