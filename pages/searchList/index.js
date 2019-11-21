Page({
  data: {
    searchHistory: [],
    searchHot: [],
    list: [
      {
        id: 1,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
      {
        id: 2,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
      {
        id: 3,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
      {
        id: 4,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
      {
        id: 5,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
      {
        id: 6,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
      {
        id: 7,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
      {
        id: 8,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
      {
        id: 9,
        img: '../../assets/images/swipper1.png',
        title: '品管',
        company: '厦门万达集团有限公司门万达集团有限公司',
        money: '4-6k',
        city: '厦门',
        type: '全职'
      },
    ],
    value: null,
    showHistory: false,
    showDelete: false
  },
  startInput(e) {
    if (e.detail.value !== '' && e.detail.value !== null) {
      this.setData({
        value: e.detail.value,
        showDelete: true
      })
    }
  },
  deleteInput() {
    this.setData({
      value: null,
    })
    if (!this.data.value) {
      this.setData({
        showDelete: false,
        showHistory: true,
        showList: false
      })
    }
  },
  confirmSearch(e) {
    this.data.searchHistory.push(e.detail.value)
    wx.setStorage({
      key: "searchHistory",
      data: this.data.searchHistory
    })
    this.setData({
      showHistory: false,
      showList: true
    })
  },
  ItemConfirmSearch() {

  },
  clearHistory() {
    let _this = this
    wx.removeStorage({
      key: 'searchHistory',
      success(res) {
        _this.setData({
          showHistory: false
        })
      }
    })
  },
  goToPage() {
    wx.navigateTo({
      url: '/pages/gengduozhiwei/index'
    })
  },
  goToDingwei() {
    wx.navigateTo({
      url: '/pages/dingwei/index'
    })
  },
  onLoad() {
    let _this = this
    wx.getStorage({
      key: "searchHistory",
      success: function (res) {
        if (res.data.length) {
          _this.setData({
            searchHistory: res.data,
            showHistory: true
          })
        }
      }
    })
  }
})
