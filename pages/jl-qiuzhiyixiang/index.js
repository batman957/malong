const app = getApp()
Page({
  data: {
    showType: false,
    animationData: {},
    selectedType: ['全部'],
    xueli: [{
      id: 1,
      label: '其他'
    }, {
      id: 2,
      label: '初中'
    }, {
      id: 3,
      label: '高中'
    }, {
      id: 4,
      label: '专科'
    }, {
      id: 4,
      label: '本科'
    }, {
      id: 4,
      label: '博士'
    }, ],
    workType: [
      {
        id: 1,
        label: '全职'
      }, {
        id: 2,
        label: '兼职'
      }, {
        id: 3,
        label: '小时工'
      }
    ],
    workPlace: [],
    jobType: [
      {
        id: 1,
        label: '互联网/电子商务'
      }, {
        id: 2,
        label: '贸易/出口进口'
      }, {
        id: 3,
        label: '计算机硬件'
      }, {
        id: 4,
        label: 'IT服务/系统集成'
      },
    ],
    moneyType: [
      {
        id: 1,
        label: '2000以下'
      }, {
        id: 2,
        label: '2000-3000'
      }, {
        id: 3,
        label: '3000-5000'
      }, {
        id: 4,
        label: '5000-8000'
      },
    ],
    list: [
      {
        id: 1,
        label: '普工',
        children: [{
          id: 1,
          label: '印花工'
        }, {
          id: 2,
          label: '染工'
        }, {
          id: 3,
          label: '组装工'
        }, {
          id: 4,
          label: '水泥工'
        }, ]
      },
      {
        id: 2,
        label: '销售',
        children: [{
          id: 1,
          label: '渠道专员'
        }, {
          id: 2,
          label: '会籍顾问'
        }, {
          id: 3,
          label: '客服经理'
        }, {
          id: 4,
          label: '网络销售'
        }, ]
      },
      {
        id: 3,
        label: '司机',
        children: [{
            id: 1,
            label: '驾校教练'
          }, {
            id: 2,
            label: '班车司机'
          }, {
            id: 3,
            label: '出租车司机'
          }, {
            id: 4,
            label: '货运司机'
          },
          {
            id: 4,
            label: '餐饮',
            children: [{
              id: 1,
              label: '服务员'
            }, {
              id: 2,
              label: '洗碗工'
            }, {
              id: 3,
              label: '厨师'
            }, {
              id: 4,
              label: '大堂经理'
            }, ]
          },
        ]
      },
    ],
    childList: [
      {
        id: 1,
        label: '印花工'
      }, {
        id: 2,
        label: '染工'
      }, {
        id: 3,
        label: '组装工'
      }, {
        id: 4,
        label: '水泥工'
      },
    ],
    graduation_school: '',
    graduation_time: '',
    degree: '',
    intention_area: '',
    job_direction:''
  },
  switchSchool(e) {
    this.setData({
      graduation_school: e.detail.value
    })
  },
  switchXueli: function (e) {
    this.setData({
      degree: this.data.xueli[e.detail.value].label
    })
  },
  switchDate: function (e) {
    this.setData({
      graduation_time: e.detail.value
    })
  },
  // switchWorkType: function (e) {
  //   this.setData({
  //     intention_area: this.data.workType[e.detail.value].label
  //   })
  // },
  switchWorkPlace: function (e) {
    this.setData({
      intention_area: e.detail.value[1] + ' ' + e.detail.value[2]
    })
  },
  switchJobType: function (e) {
    this.setData({
      selectedJobType: this.data.jobType[e.detail.value].label
    })
  },
  switchMoneyType: function (e) {
    this.setData({
      selectedMoneyType: this.data.moneyType[e.detail.value].label
    })
  },
  selectType() {
    this.setData({
      showType: true
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
      job_direction:null
    })
    setTimeout(function () {
      that.setData({
        showType: false
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
  changeType(e) {
    for (let i = 0; i < this.data.list.length; i++) {
      this.setData({
        childList: this.data.list[e.detail.value[0]].children
      })
      this.setData({
        job_direction: this.data.childList[e.detail.value[1]].label
      })
    }
  },
  confirmSelected() {
    this.setData({
      showType: false
    })
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
  save: function () {
    app.fun.post('/user/updateResume', {
      type: 'education',
      id:this.data.id,
      graduation_school: this.data.graduation_school,
      graduation_time: this.data.graduation_time,
      degree: this.data.degree,
      intention_area: this.data.intention_area,
      job_direction: this.data.job_direction
    }).then((res) => {
      wx.showToast({
        title: res.msg
      })
    })
    let pages = getCurrentPages()
    let prePage = pages[pages.length - 2]
    prePage.onLoad()
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })
    },1000)
  },
  onShow() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.translateY(350).step()
    this.setData({
      animationData: animation.export()
    })
  },
  onLoad(e) {
    const jobInfo = app.jobInfo
    this.setData({
      id: e.id,
      graduation_school: jobInfo.graduation_school,
      graduation_time: jobInfo.graduation_time,
      degree: jobInfo.degree,
      intention_area: jobInfo.intention_area,
      job_direction: jobInfo.job_direction
    })
  }
})
