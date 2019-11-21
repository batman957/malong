
const app = getApp()

Page({
  data: {
    num: 1,
    num1: null,
    num2: null,
    num3: null,
    num4: null,
    num5: null,
    location: '全国',
    hotCity: [],
    other_ag: [],
    other_hn: [],
    other_ot: [],
    other_uz: [],
    city: null
  },
  selectedNowCity(e) {
    console.log(e)
    this.setData({
      num1: null,
      num2: null,
      num3: null,
      num4: null,
      num5: null,
      num6: null
    })
    if (this.data.num === 0) {
      this.setData({
        num: 1,
        city:this.data.location
      })
    } else if (this.data.num === 1) {
      this.setData({
        num: 0
      })
    }

  },
  selectedHotCity(e) {
    this.setData({
      num: 0,
      num1: e.currentTarget.dataset.index,
      num2: null,
      city: e.currentTarget.dataset.city,
      location: e.currentTarget.dataset.city
    })
  },
  selectedOtherCityAG(e) {
    this.setData({
      num: 0,
      num1: null,
      num2: e.currentTarget.dataset.index,
      num3: null,
      num4: null,
      num5: null,
      city: e.currentTarget.dataset.city,
      location: e.currentTarget.dataset.city
    })
  },
  selectedOtherCityHN(e) {
    this.setData({
      num: 0,
      num1: null,
      num2: null,
      num3: e.currentTarget.dataset.index,
      num4: null,
      num5: null,
      city: e.currentTarget.dataset.city,
      location: e.currentTarget.dataset.city
    })
  },
  selectedOtherCityOT(e) {
    this.setData({
      num: 0,
      num1: null,
      num2: null,
      num3: null,
      num4: e.currentTarget.dataset.index,
      num5: null,
      city: e.currentTarget.dataset.city,
      location: e.currentTarget.dataset.city
    })
  },
  selectedOtherCityUZ(e) {
    this.setData({
      num: 0,
      num1: null,
      num2: null,
      num3: null,
      num4: null,
      num5: e.currentTarget.dataset.index,
      city: e.currentTarget.dataset.city,
      location: e.currentTarget.dataset.city
    })
  },
  clearSelect() {
    this.setData({
      num: 1,
      num1: null,
      num2: null,
      num3: null,
      num4: null,
      num5: null,
      location: e.location
    })
  },
  confirmSelect() {
    let pages = getCurrentPages()
    let prePage = pages[pages.length-2]
    prePage.setData({
      city: this.data.city
    })
    prePage.onLoad()
    wx.navigateBack({
      delta: 1,
      success(e) {
        console.log(e)
      }
      // url: `/pages/index/index?city=${this.data.city}`
    })
  },
  onLoad(e) {
    this.setData({
      location: e.location
    })
    app.fun.post('/home/city', {}).then((res) => {
      this.setData({
        hotCity: res.result.hot_city,
        other_ag: res.result.A_G,
        other_hn: res.result.H_N,
        other_ot: res.result.O_T,
        other_uz: res.result.U_Z,
      })
    })
  }
})
