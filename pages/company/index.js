const app = getApp()
Page({
  data: {
    selected: '1',
    status: 0,
    record_id: null,
    hotPosition: [],
    longitude: null,
    latitude: null,
    markers: [{
      iconPath: '../../assets/images/weizhi.png',
      latitude: 24.57591,
      longitude: 118.09728,
      width: 40,
      height: 40
    }],
    shop_name: '',
    shop_logo: '',
    content: '',
    province: '',
    city: '',
    district: '',
    address: '',
    type_name: '',
    recruit_number:null
  },
  goToJob(e) {
    wx.navigateTo({
      url: `/pages/job/index?id=${e.currentTarget.dataset.id}`
    })
  },
  selectTab: function (e) {
    console.log(e)
    this.setData({
      selected: e.currentTarget.dataset.num
    })
  },
  collect: function () {
    if (this.data.status === 0) {
      this.setData({
        status: 1
      })
    } else if (this.data.status === 1) {
      this.setData({
        status: 0
      })
    }
    app.fun.post('/user/collect', {
      record_type: 1,
      record_id: this.data.record_id
    }).then((res) => {
      wx.showToast({
        title: res.msg
      })
    })
  },
  checkMap: function () {
    const latitude = parseFloat(this.data.latitude)
    const longitude = parseFloat(this.data.longitude)
    wx.openLocation({
      latitude,
      longitude,
      scale: 17,
      name: this.data.shop_name,
      address: this.data.province+this.data.city+this.data.district+this.data.address
    })
  },
  onLoad(e) {
    const _this = this
    wx.checkSession({
      success() {
        console.log('success')
        //session_key 未过期，并且在本生命周期一直有效
        app.fun.post('/home/shopDetail', {
          id: e.id
        }).then((res) => {
          console.log(res)
          _this.setData({
            record_id: res.result.id,
            hotPosition: res.result.recruit_list,
            shop_name: res.result.shop_name,
            shop_logo: res.result.shop_logo,
            content: res.result.content,
            province: res.result.province,
            city: res.result.city,
            district: res.result.district,
            address: res.result.address,
            type_name: res.result.type_name,
            longitude: res.result.longitude,
            latitude: res.result.latitude,
            status: res.result.collect_status,
            recruit_number: res.result.recruit_number
          })
          _this.data.markers[0].longitude = res.result.longitude
          _this.data.markers[0].latitude = res.result.latitude
          _this.setData({
            markers: _this.data.markers
          })
        })
      },
      fail() {
        console.log('fail')
        wx.login({
          success: res => {
            app.fun.post('/user/login', {
              code: res.code,
              rec_id: e.rec_id ? e.rec_id : 0
            }).then((res) => {
              wx.setStorageSync('authorization', res.result.user_token)
              wx.setStorageSync('is_auth', res.result.is_auth)
              wx.setStorageSync('rec_id', res.result.user_id)
              app.fun.post('/home/shopDetail', {
                id: e.id
              }).then((res) => {
                _this.setData({
                  record_id: res.result.id,
                  hotPosition: res.result.recruit_list,
                  shop_name: res.result.shop_name,
                  shop_logo: res.result.shop_logo,
                  content: res.result.content,
                  province: res.result.province,
                  city: res.result.city,
                  district: res.result.district,
                  address: res.result.address,
                  type_name: res.result.type_name,
                  longitude: res.result.longitude,
                  latitude: res.result.latitude,
                  status: res.result.collect_status,
                  recruit_number: res.result.recruit_number
                })
                _this.data.markers[0].longitude = res.result.longitude
                _this.data.markers[0].latitude = res.result.latitude
                _this.setData({
                  markers: _this.data.markers
                })
              })
            })
          }
        })
      }
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage(res) {
    const rec_id = wx.getStorageSync('rec_id')
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.data.shop_name,
      path: `/pages/company/index?id=${this.data.record_id}&rec_id=${rec_id}`,
      success(res) {
        console.log(res.shareTickets)
        if (res.from === 'menu') {
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: (res) => {
              console.log('已成功获取到加密信息')
            }
          })

        }
      }
    }
  },
})
