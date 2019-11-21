const app =getApp()
Page({
  data: {
    type: null,
    telephone: null,
    code: null,
    real_name: null,
    id_card: null,
    bank_card: null,
    bank_name: null,
    bank_phone: null,
    hasSend: false,
    second: 60,
    enterprise_id: null,
    enterprise: null,
    id_card_photo: null,
    bank_card_photo: null,
    showPopup: false,
    is_auth: null
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
  getName(e) {
    this.setData({
      real_name: e.detail.value
    })
  },
  getIdCard(e) {
    this.setData({
      id_card: e.detail.value
    })
  },
  takeIdCard(e) {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        wx.showLoading({
          title: '扫描中...'
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
                 id_card: data.result.id,
               })
             } else {
               wx.showToast({
                 title: '扫描识别失败，请重试或手动输入',
                 icon: 'none',
                 duration: 2000
               })
             }
           },
           fail: (err) => {
             wx.showToast({
               title: '图片上传失败',
               icon: 'none',
               duration: 2000
             })
           }
         })
      }
    })
  },
  takeBankCard(e) {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        console.log('上传的图片：',res)
        // tempFilePath可以作为img标签的src属性显示图片
        _this.closePopup()
        console.log('图片类别:', '身份证')
        console.log('准备上传')
        wx.showLoading({
          title: '扫描中...',
          duration: 2000
        })
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
            console.log('上传成功：', res)
            const data = JSON.parse(res.data)
            console.log(data)
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
          fail: (err) => {
            console.log('上传失败：', err)
            wx.showToast({
              title: '图片上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
        // if (_this.data.type === 'id_card') {
        //   console.log('图片类别:', '身份证')
        //   console.log('准备上传')
        //   wx.showLoading({
        //     title: '扫描中...',
        //   })
        //   wx.uploadFile({
        //     url: app.globalData.host+'/api/utility/ocrCheck',
        //     filePath: res.tempFilePaths[0],
        //     name: 'img',
        //     header: app.globalData.header,
        //     formData: {
        //       type: 'id_card'
        //     },
        //     success: (res) => {
        //       console.log('上传成功：', res.data.msg)
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
        //     fail: (err) => {
        //       console.log('上传失败：', err)
        //       wx.showToast({
        //         title: '图片上传失败',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   })
        // } else if (_this.data.type === 'bank_card') {
        //   console.log('图片类别:', '银行卡')
        //   console.log('准备上传')
        //   wx.showLoading({
        //     title: '扫描中...',
        //   })
        //   wx.uploadFile({
        //     url: app.globalData.host + '/api/utility/ocrCheck',
        //     filePath: res.tempFilePaths[0],
        //     name: 'img',
        //     header: app.globalData.header,
        //     formData: {
        //       type: 'bank_card'
        //     },
        //     success: (res) => {
        //       console.log('上传成功：',res.data.data.msg)
        //       const data = JSON.parse(res.data)
        //       wx.hideLoading()
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
        //     fail: (err) => {
        //       console.log('上传失败：', err)
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
  getBankName(e) {
    this.setData({
      bank_name: e.detail.value
    })
  },
  getBankPhone(e) {
    this.setData({
      bank_phone: e.detail.value
    })
  },
  getCompany(e) {
    console.log(e)
    this.setData({
      enterprise: this.data.company[e.detail.value].title,
      enterprise_id: this.data.company[e.detail.value].id
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
  showIdCardSelect() {
    this.setData({
      showPopup: true,
      type: 'id_card'
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
      type: 'bank_card'
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
    app.fun.post('/user/apply', {
      telephone: this.data.telephone,
      code: this.data.code,
      real_name: this.data.real_name,
      id_card: this.data.id_card,
      bank_card: this.data.bank_card,
      bank_name: this.data.bank_name,
      bank_phone: this.data.bank_phone,
      enterprise_id: this.data.enterprise_id
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
        }, 1500)
    })
  },
  onLoad() {
    app.fun.post('/user/applyPage', {}).then((res) => {
      this.setData({
        company: res.result,
        is_auth: wx.getStorageSync('is_auth')
      })
    })
  },
  readyGetUserInfo(e) {
    if (e.detail.userInfo !== undefined) {
      const userInfo = e.detail.userInfo
      app.fun.post('/user/auth', {
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        sex: userInfo.gender, //性别 0：未知、1：男、2：女
        province: userInfo.province,
        city: userInfo.city,
        country: userInfo.country
      }).then((res) => {
        console.log(res)
        this.setData({
          is_auth: 1
        })
        wx.setStorageSync('is_auth', 1)
        app.globalData.is_auth = 1
      })
    }
  }
})
