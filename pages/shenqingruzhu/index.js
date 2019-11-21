Page({
  data: {
    hasSend: false,
    second: 60,
    real_name: null,
    wechat: null,
    telephone: null,
    code: null,
    shop_name: null,
    recruit_name: null,
    content: null,
    real_name: null,
    real_name: null,
    real_name: null,
  },
  getName(e) {
    this.setData({
      real_name: e.detail.value
    })
  },
  getWechat(e) {
    this.setData({
      wechat: e.detail.value
    })
  },
  getTelephone(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getShopName(e) {
    this.setData({
      shop_name: e.detail.value
    })
  },
  getRecruitName(e) {
    this.setData({
      recruit_name: e.detail.value
    })
  },
  getContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  sendCode() {
    if (!this.data.telephone) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return
    }
    const that = this
    var timer = setInterval(function () {
      that.setData({
        second: that.data.second - 1
      })
    }, 1000)
    app.fun.post('/user/code', {
      record_type: 'bind',
      telephone: this.data.telephone
    }).then((res) => {
      wx.hideLoading()
      wx.showToast({
        title: res.msg
      })
      this.setData({
        hasSend: true
      })
      setTimeout(function () {
        clearInterval(timer)
        that.setData({
          second: 60,
          hasSend: false
        })
      }, 1000 * 60)
    })
  },
  uploadAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        const file = res.tempFilePaths
        wx.showLoading({
          title: '加载中'
        })
        wx.uploadFile({
          url: app.globalData.host + '',
          filePath: res.tempFilePaths[0],
          name: 'img',
          header: app.globalData.header,
          formData: {
            type: ''
          },
          success(res) {
            wx.hideLoading()
            const data = JSON.parse(res.data)
            if (data.code === 200) {
              this.setData({

              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'none'
              })
            }
          }
        })
      }
    })
  }
})
