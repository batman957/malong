const app = getApp()
Page({
  data: {
    id: null,
    evaluation: '',
  },
  getEva(e) {
    this.setData({
      evaluation: e.detail.value ? e.detail.value: ''
    })
  },
  save: function () {
    app.fun.post('/user/updateResume', {
      id: this.data.id,
      evaluation: this.data.evaluation
    }).then((res) => {
      let pages = getCurrentPages()
      let prePage = pages[pages.length - 2]
      prePage.onLoad()
      wx.showToast({
        text: res.msg,
        icon: 'success',
        duration: 1500
      })
      wx.navigateBack({
        delta: 1
      })
    })

  },
  onLoad(e) {
    if (e.evaluation === 'null') {
      this.setData({
        id: e.id,
        evaluation: ''
      })
    } else {
      this.setData({
        id: e.id,
        evaluation: e.evaluation
      })
    }
  }
})
