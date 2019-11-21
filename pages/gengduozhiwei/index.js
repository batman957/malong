const app = getApp()
Page({
  data: {
    num1: 0,
    num2: 0,
    num3: 0,
    num4: 0,
    page: 1,
    limit: 10,
    showList:false,
    showType: false,
    animationData: {},
    selectedType: ['全部'],
    showselectedType: false,
    list: [],
    childList: [],
    fir_type: 0,
    sec_type: 0,
    property: 0,
    experience: '不限',
    degree: '不限',
    salary_type:0,
    typeList: [
      {
        id: 0,
        text: '不限'
      }, {
        id: 1,
        text: '全职'
      }, {
        id: 2,
        text: '兼职'
      }, {
        id: 3,
        text: '小时工'
      }
    ],
    moneyList: [
      {
        id: 0,
        text: '不限'
      }, {
        id: 1,
        text: '2000-3000'
      }, {
        id: 2,
        text: '3000-5000'
      }, {
        id: 3,
        text: '5000以上'
      }
    ],
    workList: [
      {
        id: 0,
        text: '不限'
      }, {
        id: 1,
        text: '1年以内'
      }, {
        id: 2,
        text: '1-3年'
      }, {
        id: 3,
        text: '3年以上'
      }
    ],
    xueliList: [
      {
        id: 0,
        text: '不限'
      }, {
        id: 1,
        text: '初中'
      }, {
        id: 2,
        text: '高中'
      }, {
        id: 3,
        text: '专科'
      }, {
        id: 4,
        text: '本科'
      }, {
        id: 5,
        text: '博士'
      }
    ],
  },
  switchTypeBtn: function (e) {
    this.setData({
      num1: e.currentTarget.dataset.index,
      property: e.currentTarget.dataset.id
    })
  },
  switchMoneyBtn: function (e) {
    this.setData({
      num2: e.currentTarget.dataset.index,
      salary_type: e.currentTarget.dataset.id
    })
  },
  switchWorkBtn: function (e) {
    this.setData({
      num3: e.currentTarget.dataset.index,
      experience: e.currentTarget.dataset.label
    })
  },
  switchXueliBtn: function (e) {
    this.setData({
      num4: e.currentTarget.dataset.index,
      degree: e.currentTarget.dataset.label
    })
  },
  selecteType() {
    this.setData({
      showType: true,
      showselectedType: false
    })
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease'
    })
    this.animation = animation
    // animation.height(350).step()
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  },
  closePopup() {
    let that = this
    setTimeout(function () {
      that.setData({
        showType: false
      })
     },400)
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
  clearSelect: function () {
    this.setData({
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
    })
   },
  changeType(e) {
    for (let i = 0; i < this.data.list.length; i++) {
      this.setData({
        childList: this.data.list[e.detail.value[0]].children
      })
      this.setData({
        selectedType: this.data.list[e.detail.value[0]].label + '/' + this.data.childList[e.detail.value[1]].label,
        fir_type: this.data.list[e.detail.value[0]].value,
        sec_type: this.data.childList[e.detail.value[1]].value,
      })
    }
  },
  confirmSelected() {
    this.setData({
      showselectedType: true,
      showType: false
    })
  },
  onLoad() {
    app.fun.post('/home/recruitType', {}).then((res) => {
      this.setData({
        list: res.result,
        childList: res.result[0].children
      })
    })
  },
  onShow() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
    this.animation = animation
    // animation.height(350).step()
    animation.translateY(350).step()
    this.setData({
      animationData: animation.export()
    })
  },
  save() {
    app.globalData.searchCondition = {
      page: this.data.page,
      limit: this.data.limit,
      fir_type: this.data.fir_type,
      sec_type: this.data.sec_type,
      property: this.data.property,
      experience: this.data.experience,
      degree: this.data.degree,
      salary_type: this.data.salary_type,
    }
    wx.navigateTo({
      url: '/pages/zhiweiliebiao/index'
    })
  }
})
