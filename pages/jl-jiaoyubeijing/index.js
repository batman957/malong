Page({
  data: {
    selectedXueli: null,
    selectedDate: null,
    schoolName: null,
    zhuanye: null,
    xueli: [
      {
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
        label: '硕士'
      },
    ],
  },
  switchXueli: function (e) {
    this.setData({
      selectedXueli: this.data.xueli[e.detail.value].label
    })
  },
  switchDate: function (e) {
    this.setData({
      selectedDate: e.detail.value
    })
  },
  save: function () {
    wx.showToast({
      text: '提交成功',
      icon: 'success',
      duration: 1500
    })
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad(e) {
    this.setData({
      type: e.type
    })
    console.log(this.data.type)
  }
})
