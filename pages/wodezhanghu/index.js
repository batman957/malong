const app =getApp()
Page({
  data: {
    list: [],
    total_income: null,
    page: 1,
    limit: 10,
    begin: null,
    end: null,
  },
  shaixuan: function () {
    wx.navigateTo({
      url: '/pages/shaixuan/index?type=zhanghu',
    })
  },
  onLoad() {
    app.fun.post('/user/income', {
      page: this.data.page,
      limit: this.data.limit,
      begin: this.data.begin,
      end: this.data.end
    }).then((res) => {
      this.setData({
        total_income: res.result.total_income,
        list: res.result.list
      })
    })
  }
})
