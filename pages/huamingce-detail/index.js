const app = getApp()
Page({
  data: {
    id:null,
    real_name: '',
    sexs: [
      {
        value: '男',
        label: '男',
        checked: false
      }, {
        value: '女',
        label: '女',
        checked: false
      },
    ],
    gender: '',
    id_card: '',
    worker_number: '',
    boarding_date: '',
    address: '',
    telephone: '',
    contact_name: '',
    contact_phone: '',
    bank_card: '',
    bank_name: '',
    white_price: '',
    night_price: '',
    rent_subsidies: '',
    meal_subsidies: '',
    other_subsidies: ''
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: options.name ? options.name : '详情'
    })
    app.fun.post('/user/rosterDetail', {
      id: options.id
    }).then((res) => {
      this.setData({
        real_name: res.result.real_name,
        gender: res.result.gender,
        id_card: res.result.id_card,
        worker_number: res.result.worker_number,
        boarding_date: res.result.boarding_date,
        address: res.result.address,
        telephone: res.result.telephone,
        contact_name: res.result.contact_name,
        contact_phone: res.result.contact_phone,
        bank_card: res.result.bank_card,
        bank_name: res.result.bank_name,
        white_price: res.result.white_price,
        night_price: res.result.night_price,
        rent_subsidies: res.result.rent_subsidies,
        meal_subsidies: res.result.meal_subsidies,
        other_subsidies: res.result.other_subsidies,
      })
      for (let i = 0; i < this.data.sexs.length; i++) {
        if (this.data.sexs[i].value === res.result.gender) {
          this.data.sexs[i].checked = true
        }

      }
      this.setData({
        sexs: this.data.sexs
      })
    })
  },
  getName(e) {
    this.setData({
      real_name: e.detail.value
    })
  },
  selectSex(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  getIdCard(e) {
    this.setData({
      id_card: e.detail.value
    })
  },
  getWorkerNumber(e) {
    this.setData({
      worker_number: e.detail.value
    })
  },
  getDate(e) {
    this.setData({
      boarding_date: e.detail.value
    })
  },
  getAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  getTelephone(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  getContactName(e) {
    this.setData({
      contact_name: e.detail.value
    })
  },
  getContactPhone(e) {
    this.setData({
      contact_phone: e.detail.value
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
  getWhitePrice(e) {
    this.setData({
      white_price: e.detail.value
    })
  },
  getNight_price(e) {
    this.setData({
      night_price: e.detail.value
    })
  },
  getMeal(e) {
    this.setData({
      meal_subsidies: e.detail.value
    })
  },
  getRent(e) {
    this.setData({
      rent_subsidies: e.detail.value
    })
  },
  getOther(e) {
    this.setData({
      other_subsidies: e.detail.value
    })
  },
  save() {
    app.fun.post('/user/rosterUpdate', {
      id: this.data.id,
      real_name: this.data.real_name,
      telephone: this.data.telephone,
      id_card: this.data.id_card,
      bank_card: this.data.bank_card,
      bank_name: this.data.bank_name,
      gender: this.data.gender,
      worker_number: this.data.worker_number,
      boarding_date: this.data.boarding_date,
      address: this.data.address,
      contact_name: this.data.contact_name,
      contact_phone: this.data.contact_phone,
      white_price: this.data.white_price ? this.data.white_price:0,
      night_price: this.data.night_price ? this.data.night_price:0,
      meal_subsidies: this.data.meal_subsidies ? this.data.meal_subsidies: 0,
      rent_subsidies: this.data.rent_subsidies ? this.data.rent_subsidies:0,
      other_subsidies: this.data.other_subsidies ? this.data.other_subsidies: 0,
    }).then((res) => {
      wx.showToast({
        title: res.msg,
        duration: 2000
      })
      let pages = getCurrentPages()
      let prePage = pages[pages.length - 2]
      setTimeout(() => {
        prePage.onLoad()
        wx.navigateBack({
          delta: 1
        })
      },2000)
    })
  }
})
