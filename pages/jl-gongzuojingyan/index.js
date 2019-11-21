const app = getApp()
Page({
  data: {
    type: null,
    id:null,
    companyName: null,
    now: null,
    shop_name: null,
    begin_date: null,
    end_date: null,
    recruit_name: null,
    content: null,
    selectedWorkType: null,
    selectedWorkPlace: null,
    selectedJobType: null,
    selectedMoneyType: null,
    workType: [],
    workPlace: [],
    jobType: [],
  },
  changeName(e) {
    this.setData({
      shop_name: e.detail.value
    })
  },
  changeRecruit_name(e) {
    this.setData({
      recruit_name: e.detail.value
    })
  },
  changeContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  switchStartTime: function (e) {
    this.setData({
      begin_date: e.detail.value
    })
  },
  switchEndTime: function (e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  switchWorkType: function (e) {
    this.setData({
      selectedWorkType: this.data.workType[e.detail.value].label
    })
  },
  switchJobType: function (e) {
    this.setData({
      selectedJobType: this.data.jobType[e.detail.value].label
    })
  },
  delete() {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success(res) {
        if (res.confirm) {
          app.fun.post('/user/deleteExperience', {
            id: _this.data.id
          }).then((res) => {
            let pages = getCurrentPages()
            let prePage = pages[pages.length - 2]
            prePage.onLoad()
            wx.showToast({
              title: '删除成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  save: function () {
    if(this.data.type === 'add') {
        app.fun.post('/user/createExperience', {
          resume_id: this.data.id,
          shop_name: this.data.shop_name,
          begin_date: this.data.begin_date,
          end_date: this.data.end_date,
          recruit_name: this.data.recruit_name,
          content: this.data.content
        }).then((res) => {
          let pages = getCurrentPages()
          let prePage = pages[pages.length - 2]
          prePage.onLoad()
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        })
    } else if (this.data.type === 'edit') {
      app.fun.post('/user/updateExperience', {
        id: this.data.id,
        shop_name: this.data.shop_name,
        begin_date: this.data.begin_date,
        end_date: this.data.end_date,
        recruit_name: this.data.recruit_name,
        content: this.data.content
      }).then((res) => {
        let pages = getCurrentPages()
        let prePage = pages[pages.length - 2]
        prePage.onLoad()
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1500
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      })
    }
  },
  onLoad(e) {
    console.log(e)
    this.setData({
      type: e.type,
      id: e.id
    })
    if (e.type === 'add') {
    } else if (e.type === 'edit') {
      app.fun.post('/user/experience', {
        id: e.id
      }).then((res) => {
        this.setData({
          shop_name: res.result.shop_name,
          begin_date: res.result.begin_date,
          end_date: res.result.end_date,
          recruit_name: res.result.recruit_name,
          content: res.result.content
        })
      })
    }
  }
})
