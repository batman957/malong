const app = getApp()

Page({
  data: {
    num: 0,
    showfilter: false,
    list: [],
    typeList: [],
    hasregion: false,
    region: [],
    customItem: '全部',
    page: 1,
    limit: 10,
    typename: '',
    shop_type: null,
    province: null,
    city: null,
    district: null,
    finished: false,

  },
  showFilter: function () {
    this.setData({
      showfilter: true
    })
  },
  closeFilter: function () {
    this.setData({
      showfilter: false
    })
  },
  goToCompany: function (e) {
    wx.navigateTo({
      url: `/pages/company/index?id=${e.currentTarget.dataset.id}`
    })
   },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  selectedType(e) {
    this.setData({
      num: e.currentTarget.dataset.index,
      shop_type: e.currentTarget.dataset.value,
      typename: e.currentTarget.dataset.typename,
    })
  },
  clearSelect() {
    this.setData({
      shop_type: null,
      typename: null,
      num: 0,
      region: []
    })
  },
  startSearch() {
    if (!this.data.shop_type) {
      this.setData({
        shop_type: this.data.typeList[0].value,
        typename: this.data.typeList[0].label,
      })
    }
    this.setData({
      page: 1,
      limit: 10,
      showfilter: false,
    })
    app.fun.post('/home/shop', {
      page: this.data.page,
      limit: this.data.limit,
      shop_type: this.data.shop_type,
      province: this.data.region[0],
      city: this.data.region[1],
      district: this.data.region[2],
    }).then((res) => {
      this.setData({
        list: res.result
      })
    })
  },
  onLoad() {
    const _this = this
    app.fun.post('/home/shop', {
      page: _this.data.page,
      limit: _this.data.limit
    }).then((res) => {
      _this.setData({
        list: res.result
      })
    })
    app.fun.post('/home/shopType', {}).then((res) => {
      _this.setData({
        typeList: res.result
      })
    })

  },
  onReachBottom() {
    let that = this
    if (this.data.finished === true) {
      return
    }
    app.fun.post('/home/shop', {
      page: this.data.page + 1,
      limit: this.data.limit,
      shop_type: this.data.shop_type,
      province: this.data.region[0],
      city: this.data.region[1],
      district: this.data.region[2],
    }).then((res) => {
      if (res.result.length) {
          this.setData({
            list: this.data.list.concat(res.result)
          })
        this.data.page++
        this.setData({
          page: this.data.page
        })
      } else {
        this.setData({
          finished: true
        })
      }
    })
  },
})
