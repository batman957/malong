const app =getApp()
Page({
  data: {
    interview_number: null,
    pending_number: null,
    leaving_apply_number: null,
    borrowing_number: null
  },
  onLoad() {
    app.fun.post('/user/workersCenter', {}).then((res) => {
      this.setData({
        interview_number: res.result.interview_number,
        pending_number: res.result.pending_number,
        leaving_apply_number: res.result.leaving_apply_number,
        borrowing_number: res.result.borrowing_number
      })
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.onLoad()
  },
})
