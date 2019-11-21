const app =getApp()
Page({
  data: {
    show: false,
    status: 1,
    date: '请选择月份',
    month: null,
    payable_salary: null,
    real_salary: null,
    deductions: null,
    borrowing: null,
    accident_insurance: null,
    taxes: null,
    subsidies: null,
    status: null
  },
  goToPage: function () {
    // wx.navigateTo({
    //   url: '/pages/shaixuan/index?type=gongzitiao'
    // })
  },
  selectDate(e) {
    let str = e.detail.value.split('-')
    this.setData({
      date: str[0] + '年' + str[1] + '月',
      month: e.detail.value
    })
    app.fun.post('/user/salaryDetail', {
      send_month: this.data.month
    }).then((res) => {
      if (res.result) {
        this.setData({
          show: true,
          payable_salary: res.result.payable_salary,
          real_salary: res.result.real_salary,
          deductions: res.result.deductions,
          borrowing: res.result.borrowing,
          accident_insurance: res.result.accident_insurance,
          taxes: res.result.taxes,
          subsidies: res.result.subsidies,
          status: res.result.status
        })
      }
    })
  }
})
