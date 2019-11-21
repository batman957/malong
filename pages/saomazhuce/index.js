const app = getApp()
const http = require('../../utils/http')
Page({
  data: {
    code: null,
    type:null,
    hasSend: false,
    second: 60,
    companyList: [],
    company: null,
    real_name: null,
    telephone: null,
    id_card: null,
    bank_card: null,
    bank_name: null,
    bank_phone: null,
    shop_id: null,
    recruit_id: null,
    jobList: [],
    job: null,
    showPopup: false,
    is_auth: 0
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
  getIdCard(e) {
    this.setData({
      id_card: e.detail.value
    })
  },
  getBankCard(e) {
    this.setData({
      bank_card: e.detail.value
    })
  },
  switchCompany(e) {
    this.setData({
      company: this.data.companyList[e.detail.value].shop_name,
      shop_id: this.data.companyList[e.detail.value].id
    })
    app.fun.post('/user/recruitSelect', {
      shop_id: this.data.companyList[e.detail.value].id
    }).then((res) =>{
      this.setData({
        jobList: res.result
      })
    })
  },
  switchJob(e) {
    if (!this.data.jobList.length) {
      wx.showToast({
        title: '请先选择公司',
        icon: 'null'
      })
      return
    }
    this.setData({
      job: this.data.jobList[e.detail.value].title,
      recruit_id: this.data.jobList[e.detail.value].id
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
  takeImg() {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        wx.showLoading({
          title: '扫描中'
        })
        _this.closePopup()
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
        // if (_this.data.type === 'id_card') {
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
        //       if (data.code === 200) {
        //         _this.setData({
        //           id_card: data.result.id,
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
        //       wx.showToast({
        //         title: '图片上传失败',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   })
        // } else if (_this.data.type === 'bank_card') {
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
        //     fail: (err) => {
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
  takePhoto() {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        wx.showLoading({
          title: '扫描中'
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
          fail: (err) => {
            wx.showToast({
              title: '图片上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
        // tempFilePath可以作为img标签的src属性显示图片
        // if (_this.data.type === 'id_card') {
        //   wx.uploadFile({
        //     url: app.globalData.host+'/api/utility/ocrCheck',
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
        //     fail: (err) => {
        //       wx.showToast({
        //         title: '图片上传失败',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   })
        // } else if (_this.data.type === 'bank_card') {
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
        //     fail: (err) => {
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
  sendCode() {
    if (!this.data.telephone) {
      wx.showToast({
        title: '请输入手机号码',
        icon: null
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
      record_type: 'regWorkers',
      telephone: this.data.telephone
    }).then((res) => {
        wx.showToast({
          title: res.msg,
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
  onLoad(options) {
    const _this = this
    const Rec_id = options.scene.slice(options.scene.indexOf('%3D') + 3)
    this.setData({
      is_auth: wx.getStorageSync('is_auth') ? wx.getStorageSync('is_auth') : 0
    })
    this.setData({
      rec_id: Rec_id ? Rec_id : 0
    })
    wx.checkSession({
      success() {
        console.log("处于登录状态")
        app.fun.post('/user/regPage', {
          rec_id: Rec_id ? Rec_id : 0
        }).then((res) => {
          _this.setData({
            companyList: res.result.shop,
            real_name: res.result.real_name,
            telephone: res.result.telephone,
            id_card: res.result.id_card,
            bank_card: res.result.bank_card,
            bank_name: res.result.bank_name,
            bank_phone: res.result.bank_phone
          })
        })
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            http.post('/user/login', {
              code: res.code,
              rec_id: Rec_id ? Rec_id : 0
            }).then((res) => {
              wx.setStorageSync('authorization', res.result.user_token)
              wx.setStorageSync('is_auth', res.result.is_auth)
              _this.setData({
                rec_id: res.result.user_id
              })
              wx.setStorageSync('rec_id', res.result.user_id)
              app.fun.post('/user/regPage', {
                rec_id: Rec_id ? Rec_id : 0
              }).then((res) => {
                if (res.code === 200) {
                  _this.setData({
                    companyList: res.result.shop,
                    real_name: res.result.real_name,
                    telephone: res.result.telephone,
                    id_card: res.result.id_card,
                    bank_card: res.result.bank_card,
                    bank_name: res.result.bank_name,
                    bank_phone: res.result.bank_phone
                  })
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none'
                  })
                }
              })
            })
          }
        }) //重新登录
      }
    })
  },
  apply() {
    app.fun.post('/user/regWorkers', {
      telephone: this.data.telephone,
      code: this.data.code,
      real_name: this.data.real_name,
      shop_id: this.data.shop_id,
      recruit_id: this.data.recruit_id,
      id_card: this.data.id_card,
      bank_card: this.data.bank_card,
      bank_name: this.data.bank_name,
      bank_phone: this.data.bank_phone,
      rec_id: this.data.rec_id
    }).then((res) => {
        wx.showToast({
          title: res.msg
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/index/index'
          })
        },1000)
    }).catch((err) => {
      console.log(err)
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
  },
})
