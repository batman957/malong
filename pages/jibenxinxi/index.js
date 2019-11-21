const app =getApp()
Page({
  data: {
    id: null,
    region: [],
    sex: [],
    date: '',
    real_name: null,
    telephone: null,
    gender: null,
    birthday: null,
    city: null
  },
  getName(e) {
    this.setData({
      real_name: e.detail.value
    })
  },
  getSex(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  getTel(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      city: e.detail.value[1]
    })
  },
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  save() {
    app.fun.post('/user/updateResume', {
      id: this.data.id,
      type: 'info',
      real_name: this.data.real_name,
      telephone: this.data.telephone,
      gender: this.data.gender,
      birthday: this.data.birthday,
      city: this.data.city
    }).then((res) => {
      let pages = getCurrentPages()
      let prePage = pages[pages.length - 2]
      prePage.onLoad()
      wx.showToast({
        title: res.msg
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      },1000)

    })
  },
  onLoad(e) {
    const resumeInfo = app.resumeInfo
    this.setData({
      id: e.id,
      real_name: resumeInfo.real_name,
      telephone: resumeInfo.telephone,
      gender: resumeInfo.gender,
      birthday: resumeInfo.birthday,
      city: resumeInfo.city
    })
  }
})
