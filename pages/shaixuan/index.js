const app =getApp()
Page({
  data: {
    keyword: null,
    begin: null,
    end: null,
    type: null,
    show: false,
    searchList: [],
    page: 1,
    limit: 10,
    detailInfo: {}
  },
  getKeyword(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  selectStartTime: function (e) {
    this.setData({
      begin: e.detail.value
    })
  },
  selectEndTime: function (e) {
    this.setData({
      end: e.detail.value
    })
   },
  confirmDate: function () {
    if (this.data.type === 'zhanghu') {
      let pages = getCurrentPages()
      let prePage = pages[pages.length - 2]
      prePage.setData({
        begin: this.data.begin,
        end: this.data.end
      })
      prePage.onLoad()
      wx.navigateBack({
        delta: 1
      })
    }
    if (this.data.type === 'xinzi') {
      if (!this.data.keyword) {
        wx.showToast({
          title: '请先输入搜索关键词后重试',
          icon: 'none'
        })
        return
      }
      app.fun.post('/user/salaryList', {
        page: this.data.page,
        limit: this.data.limit,
        begin: this.data.begin,
        end: this.data.end,
        keyword: this.data.keyword
      }).then((res) => {
        this.setData({
          searchList: res.result
        })
      })
    }
   },
  showPop: function (e) {
    this.setData({
      show: true,
      detailInfo: e.currentTarget.dataset.item
    })
    console.log(e)
  },
  closePop: function () {
    this.setData({
      show: false
    })
   },
  onLoad: function (e) {
    this.setData({
      type: e.type
    })
    console.log(e)
   }
})
