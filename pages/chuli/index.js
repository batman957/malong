const app =getApp()
Page({
  data: {
    type: null,
    id: null,
    showPop: false,
    status: 0,
    page: 1,
    limit: 10,
    animationData: {},
    list: [],
    finished: false,
    reason: null,
    showPrice: null,
    white_price: null,
    night_price: null,
    meal_subsidies: null,
    rent_subsidies: null,
    other_subsidies: null,
    descript: '',
    leaving_reason: '',
    showDescriptPop: false
  },
  getWhitePrice(e) {
    this.setNavigationBarTitle({
      white_price: e.detail.value
    })
  },
  getNightPrice(e) {
    this.setNavigationBarTitle({
      night_price: e.detail.value
    })
  },
  getMeal(e) {
    this.setNavigationBarTitle({
      meal_subsidies: e.detail.value
    })
  },
  getRent(e) {
    this.setNavigationBarTitle({
      rent_subsidies: e.detail.value
    })
  },
  getOther(e) {
    this.setNavigationBarTitle({
      other_subsidies: e.detail.value
    })
  },
  confirmSubmit() {
    app.fun.post('/user/workersOperate', {
      type: 'set_subsidies',
      id: this.data.id,
      white_price: this.data.white_price ? this.data.white_price : 0,
      night_price: this.data.night_price ? this.data.night_price : 0,
      meal_subsidies: this.data.meal_subsidies ? this.data.meal_subsidies : 0,
      rent_subsidies: this.data.rent_subsidies ? this.data.rent_subsidies : 0,
      other_subsidies: this.data.other_subsidies ? this.data.other_subsidies : 0,
    }).then((res) => {
      wx.showToast({
        title: res.msg
      })
      this.closePrice()
    })
  },
  goToDetail(e) {
    if (this.data.type === 'jieqian') {
      wx.navigateTo({
        url: `/pages/jiezhishenqing/index?type=detail&id=${e.currentTarget.dataset.id}&name=check`
      })
    }
  },
  getReason(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  goToJianli(e) {
    wx.navigateTo({
      url: `/pages/dayin/index?id=${e.currentTarget.dataset.id}&type=check`
    })
  },
  confirmPass(e) {
    const _this = this
    if (this.data.type === 'ready') {
      wx.showModal({
        title: '提示',
        content: '确认通过面试？',
        success(res) {
          if (res.confirm) {
            app.fun.post('/user/workersOperate', {
              type: 'interview_success',
              id: e.currentTarget.dataset.id
            }).then((res) => {
              wx.showToast({
                title: res.msg
              })
              _this.onLoad()
            })
          } else if (res.cancel) {
            console.log('取消')
          }

        }
      })

    } else if (this.data.type === 'pass') {
      wx.showModal({
        title: '提示',
        content: '确认入职？',
        success(res) {
          if (res.confirm) {
            app.fun.post('/user/workersOperate', {
              type: 'confirm',
              id: e.currentTarget.dataset.id
            }).then((res) => {
              wx.showToast({
                title: res.msg
              })
              _this.onLoad()
            })
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    } else if (this.data.type === 'jieqian') {
      wx.showModal({
        title: '提示',
        content: '确认借支给该员工？',
        success(res) {
          if (res.confirm) {
            app.fun.post('/user/borrowingOperate', {
              type: 'audit_success',
              id: e.currentTarget.dataset.id
            }).then((res) => {
              wx.showToast({
                title: res.msg
              })
              _this.onLoad()
            })
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    }
  },
  cancelPass(e) {
    if (this.data.type === 'ready') {
      if (!this.data.reason) {
        wx.showToast({
          title: '请简要填写原因'
        })
        return
      }
      app.fun.post('/user/workersOperate', {
        type: 'interview_fail',
        id: this.data.id,
        descript: this.data.reason
      }).then((res) => {
        wx.showToast({
          title:res.msg
        })
        this.setData({
          showPop: false
        })
        this.onLoad()
      })
    } else if (this.data.type === 'pass') {
      wx.showModal({
        title: '提示',
        content: '确认取消？',
        success(res) {
          if (res.confirm) {
            app.fun.post('/user/workersOperate', {
              type: 'cancel',
              id: e.currentTarget.dataset.id
            }).then((res) => {
              wx.showToast({
                title: res.msg
              })
              _this.onLoad()
            })
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    } else if (this.data.type === 'applyLeave') {
      if (!this.data.reason) {
        wx.showToast({
          title: '请简要填写原因'
        })
        return
      }
      app.fun.post('/user/workersOperate', {
        type: 'leaving_apply_confirm',
        id: this.data.id,
        descript: this.data.reason
      }).then((res) => {
        wx.showToast({
          title: res.msg
        })
        this.setData({
          showPop: false
        })
        this.onLoad()
      })
    } else if (this.data.type === 'hasJoin') {
      if (!this.data.reason) {
        wx.showToast({
          title: '请简要填写原因'
        })
        return
      }
      app.fun.post('/user/workersOperate', {
        type: 'leaving_force_confirm',
        id: this.data.id,
        descript: this.data.reason
      }).then((res) => {
        wx.showToast({
          title: res.msg
        })
        this.setData({
          showPop: false
        })
        this.onLoad()
      })
    } else if (this.data.type === 'jieqian') {
      if (!this.data.reason) {
        wx.showToast({
          title: '请简要填写原因'
        })
        return
      }
      app.fun.post('/user/borrowingOperate', {
        type: 'audit_fail',
        id: this.data.id,
        reason: this.data.reason
      }).then((res) => {
        wx.showToast({
          title: res.msg
        })
        this.setData({
          showPop: false
        })
        this.onLoad()
      })
    }
  },
  showReason: function (e) {
    this.setData({
        id: e.currentTarget.dataset.id,
        showPop: true
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
  showDescript: function (e) {
    this.setData({
      id: e.currentTarget.dataset.id,
      showDescriptPop: true,
      descript: e.currentTarget.dataset.descript
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
  addPrice(e) {
    this.setData({
      id: e.currentTarget.dataset.id,
      showPrice:true
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
  closePrice: function () {
    let _this = this
    setTimeout(function () {
      _this.setData({
        showPrice: false
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
  closePop: function () {
    let _this = this
    setTimeout(function () {
      _this.setData({
        showPop: false
      })
    },200)
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
  closeDescript: function () {
    let _this = this
    setTimeout(function () {
      _this.setData({
        showDescriptPop: false
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
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: e.title
    })
    this.setData({
      type: e.type
    })
    if (e.type === 'ready') {
      this.setData({
        status: 0
      })
    }
    if (e.type === 'pass') {
      this.setData({
        status: 1
      })
    }
    if (e.type === 'hasJoin') {
      this.setData({
        status: 2
      })
    }
    if (e.type === 'applyLeave') {
      this.setData({
        status: 3
      })
    }
    if (e.type === 'hasLeave') {
      this.setData({
        status: 4
      })
    }
    if (e.type === 'cancel') {
      this.setData({
        status: 5
      })
    }
    app.fun.post('/user/workersList', {
      page: this.data.page,
      limit: this.data.limit,
      status: this.data.status
    }).then((res) => {
      this.setData({
        list: res.result
      })
    })
    if (e.type === "jieqian") {
      app.fun.post('/user/borrowingList', {
        page: this.data.page,
        limit: this.data.limit,
        type: 'audit'
      }).then((res) => {
        this.setData({
          list: res.result
        })
      })
    }
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
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
  onReachBottom() {
    if (this.data.finished === true) {
      return
    }
    app.fun.post('/user/workersList', {
      page: this.data.page+ 1,
      limit: this.data.limit,
      status: this.data.status
    }).then((res) => {
      if (res.result.length) {
          this.setData({
            list: this.data.list.concat(res.result)
          })
          console.log(this.data.list)
        this.data.page++
        this.setData({
          page: this.data.page
        })
      } else {
        this.data.finished = true
      }
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.onLoad()
  },
})
