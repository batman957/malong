const app = getApp()
Page({
  data: {
    id: null,
    // showPop: false,
    type: null,
    imgType:null,
    name: null,
    hasSend: false,
    showPopup: false,
    second: 60,
    shop_name: null,
    real_name: null,
    telephone: null,
    code: null,
    id_card: null,
    bank_card: null,
    money: null,
    reason: null,
    repay_time: null,
    repay_type: null,
    refused_reason: null,
    status_name: null,
    unPassReason: null,
    animationData: {},
    animationData1: {}
  },
  getShopName(e) {
    this.setData({
      shop_name: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      real_name: e.detail.value
    })
  },
  getTel(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getMoney(e) {
    this.setData({
      money: e.detail.value
    })
  },
  getReason(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  getUnPassReason(e) {
    this.setData({
      unPassReason: e.detail.value
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
      record_type: 'borrowing',
      telephone: this.data.telephone
    }).then((res) => {
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
  getIdCard(e) {
    this.setData({
      id_card: e.detail.value
    })
  },
  takeImg(e) {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        wx.showLoading({
          title: '扫描中',
          duration: 2000
        })
        wx.uploadFile({
          url: app.globalData.host + '/api/utility/ocrCheck',
          filePath: res.tempFilePaths[0],
          name: 'img',
          header: app.globalData.header,
          formData: {
            type: 'id_card'
          },
          success: (res) => {
            wx.hideLoading()
            const data = JSON.parse(res.data)
            if (data.code === 200) {
              _this.setData({
                id_card: data.result.id
              })
            } else {
              wx.showToast({
                title: '扫描识别失败，请重试或手动输入',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: (res) => {
            wx.showToast({
              title: '图片上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
        // if (_this.data.imgType === 'id_card') {
        //   wx.uploadFile({
        //     url: app.globalData.host + '/api/utility/ocrCheck ',
        //     filePath: res.tempFilePaths[0],
        //     name: 'img',
        //     header: app.globalData.header,
        //     formData: {
        //       type: 'id_card'
        //     },
        //     success: (res) => {
        //       wx.hideLoading()
        //       const data = JSON.parse(res.data)
        //       if (data.code === 200) {
        //         _this.setData({
        //           id_card: data.result.id
        //         })
        //       } else {
        //         wx.showToast({
        //           title: '扫描识别失败，请重试或手动输入',
        //           icon: 'none',
        //           duration: 2000
        //         })
        //       }
        //     },
        //     fail: (res) => {
        //       wx.showToast({
        //         title: '图片上传失败',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   })
        // } else if (_this.data.imgType === 'bank_card') {
        //   wx.uploadFile({
        //     url: app.globalData.host + '/api/utility/ocrCheck ',
        //     filePath: res.tempFilePaths[0],
        //     name: 'img',
        //     header: app.globalData.header,
        //     formData: {
        //       type: 'bank_card'
        //     },
        //     success: (res) => {
        //       wx.hideLoading()
        //       const data = JSON.parse(res.data)
        //       if (data.code === 200) {
        //         _this.setData({
        //           bank_card: data.result.number
        //         })
        //       } else {
        //         wx.showToast({
        //           title: '扫描识别失败，请重试或手动输入',
        //           icon: 'none',
        //           duration: 2000
        //         })
        //       }

        //     },
        //     fail: (res) => {
        //       wx.showToast({
        //         title: '图片上传失败',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   })
        // }
        // tempFilePath可以作为img标签的src属性显示图片
      }
    })
  },
  takePhoto(e) {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        wx.showLoading({
          title: '扫描中',
          duration: 2000
        })
        _this.closePopup()
        wx.uploadFile({
          url: app.globalData.host + '/api/utility/ocrCheck',
          filePath: res.tempFilePaths[0],
          name: 'img',
          header: app.globalData.header,
          formData: {
            type: 'bank_card'
          },
          success: (res) => {
            wx.hideLoading()
            const data = JSON.parse(res.data)
            if (data.code === 200) {
              _this.setData({
                bank_card: data.result.number
              })
            } else {
              wx.showToast({
                title: '扫描识别失败，请重试或手动输入',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: (res) => {
            wx.showToast({
              title: '图片上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
        // tempFilePath可以作为img标签的src属性显示图片
        // if (_this.data.imgType === 'id_card') {
        //   wx.uploadFile({
        //     url: app.globalData.host + '/api/utility/ocrCheck',
        //     filePath: res.tempFilePaths[0],
        //     name: 'img',
        //     header: app.globalData.header,
        //     formData: {
        //       type: 'id_card'
        //     },
        //     success: (res) => {
        //       wx.hideLoading()
        //       const data = JSON.parse(res.data)
        //      if (data.code === 200) {
        //        _this.setData({
        //          id_card: data.result.id
        //        })
        //      } else {
        //        wx.showToast({
        //          title: '扫描识别失败，请重试或手动输入',
        //          icon: 'none',
        //          duration: 2000
        //        })
        //      }
        //     },
        //     fail: (res) => {
        //       wx.showToast({
        //         title: '图片上传失败',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   })
        // } else if (_this.data.imgType === 'bank_card') {
        //   wx.uploadFile({
        //     url: app.globalData.host + '/api/utility/ocrCheck',
        //     filePath: res.tempFilePaths[0],
        //     name: 'img',
        //     header: app.globalData.header,
        //     formData: {
        //       type: 'bank_card'
        //     },
        //     success: (res) => {
        //       wx.hideLoading()
        //       const data = JSON.parse(res.data)
        //       if (data.code === 200) {
        //         _this.setData({
        //           bank_card: data.result.number
        //         })
        //       } else {
        //         wx.showToast({
        //           title: '扫描识别失败，请重试或手动输入',
        //           icon: 'none',
        //           duration: 2000
        //         })
        //       }

        //     },
        //     fail: (res) => {
        //       wx.showToast({
        //         title: '图片上传失败',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   })
        // }
      }
    })
  },
  getBankCard(e) {
    this.setData({
      bank_card: e.detail.value
    })
  },
  showIdCardSelect() {
    this.setData({
      showPopup: true,
      imgType: 'id_card'
    })
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  },
  showBankCardSelect() {
    this.setData({
      showPopup: true,
      imgType: 'bank_card'
    })
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  },
  closePopup() {
    let that = this
    this.setData({
      job_direction: null
    })
    setTimeout(function () {
      that.setData({
        showPopup: false
      })
    }, 400)
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease'
    })
    this.animation = animation
    // animation.height(350).step()
    animation.translateY(350).step()
    this.setData({
      animationData: animation.export()
    })
  },
  apply() {
    app.fun.post('/user/borrowingApply', {
      telephone: this.data.telephone,
      code: this.data.code,
      real_name: this.data.real_name,
      id_card: this.data.id_card,
      bank_card: this.data.bank_card,
      money: this.data.money,
      reason: this.data.reason
    }).then((res) => {
        wx.showToast({
          title: res.msg
        })
        let pages = getCurrentPages()
        let prePage = pages[pages.length - 2]
        prePage.onLoad()
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
    })
  },
  passApply() {
    app.fun.post('/user/borrowingOperate', {
      type: 'audit_success',
      id: this.data.id
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
  closePop () {
    let _this = this
    setTimeout(function () {
      _this.setData({
        showPop: false
      })
    }, 200)
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData1: animation.export()
    })
  },
  cancelPass() {
    if (!this.data.reason) {
      wx.showToast({
        title: '请填写原因',
        icon: 'none'
      })
      return
    }
    app.fun.post('/user/borrowingOperate', {
      type: 'audit_fail',
      id: this.data.id,
      reason: this.data.unPassReason
    }).then((res) => {
      let pages = getCurrentPages()
      let prePage = pages[pages.length - 2]
      prePage.onLoad()
      wx.showToast({
        title: res.msg
      })
      this.setData({
        showPop: false
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    })
  },
  showReason() {
    this.setData({
      showPop: true
    })
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.opacity(1).step()
    this.setData({
      animationData1: animation.export()
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
      animationData1: animation.export()
    })
  },
  onLoad(e) {
    this.setData({
      type: e.type,
      name: e.name,
      id:e.id
    })
    if (e.name) {
      this.setData({
        name: e.name
      })
    }
    if (e.type === 'apply') {
      app.fun.post('/user/borrowingPage', {}).then((res) => {
        const data = res.result
        this.setData({
          shop_name: data.shop_name,
          real_name: data.real_name,
          telephone: data.telephone,
          code: data.code,
          id_card: data.id_card,
          bank_card: data.bank_card
        })
      })
    }
    if (e.type === 'detail') {
      app.fun.post('/user/borrowingDetail', {
        id: e.id
      }).then((res) => {
        const data = res.result
        this.setData({
          shop_name: data.shop_name,
          real_name: data.real_name,
          telephone: data.telephone,
          code: data.code,
          id_card: data.id_card,
          bank_card: data.bank_card,
          repay_time: data.repay_time,
          repay_type: data.repay_type,
          refused_reason: data.refused_reason,
          status: data.status,
          status_name: data.status_name,
          money: data.money,
          reason:data.reason
        })
      })
    }
  }
})
