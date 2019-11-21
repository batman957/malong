const app = getApp()

Page({
  data: {
    title: '',
    img_url: '',
    province: '',
    city: '',
    district: '',
    address: '',
    property: '',
    start_salary: '',
    end_salary: '',
    longitude: null,
    latitude: null,
    status: null,
    record_id: null,
    shop_info: [],
    id: null,
    hasDelivery: false,
    shop_id: null,
    position: '',
    content:null
  },
  goToCompany: function () {
    wx.navigateTo({
      url: `/pages/company/index?id=${this.data.shop_id}`
    })
  },
  openMap() {
    const latitude = parseFloat(this.data.latitude)
    const longitude = parseFloat(this.data.longitude)
    wx.openLocation({
      latitude,
      longitude,
      scale: 17,
      name: this.data.shop_info.shop_name+' '+this.data.title,
      address: this.data.province+this.data.city+this.data.district+this.data.address
    })
  },
  collect() {
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
      record_type: 2,
      record_id: this.data.record_id
    }).then((res) => {
      wx.showToast({
        title: res.msg
      })
    })
  },
  delivery() {
    const _this = this
    wx.showModal({
      title: '投递简历',
      content: '确定投递该职位？',
      cancelText: '修改简历',
      cancelColor: '#46cfc4',
      success(res) {
        if (res.confirm) {
          app.fun.post('/user/delivery', {
            id: _this.data.id
          }).then((res) => {
            wx.showToast({
              title: res.msg
            })
            _this.setData({
              hasDelivery: true
            })
          })
        } else if (res.cancel) {
          wx.navigateTo({
            url: '/pages/jianli/index'
          })
        }
       }
    })
  },
  onLoad(e) {
    this.setData({
      id: e.id
    })
    const _this = this
    wx.checkSession({
      success() {
        app.fun.post('/home/recruitDetail', {
          id: e.id
        }).then((res) => {
          const result = res.result
          _this.setData({
            shop_id: result.shop_id,
            record_id: result.id,
            title: result.title,
            img_url: result.img_url,
            province: result.province,
            city: result.city,
            district: result.district,
            address: result.address,
            property: result.property,
            start_salary: result.start_salary,
            end_salary: result.end_salary,
            longitude: result.longitude,
            latitude: result.latitude,
            status: result.collect_status,
            shop_info: result.shop_info,
            position: result.province + result.city + result.district + result.address,
            content: result.content
          })
        })
      },
      fail() {
        wx.login({
          success: res => {
            app.fun.post('/user/login', {
              code: res.code,
              rec_id: e.rec_id ? e.rec_id : 0
            }).then((res) => {
              wx.setStorageSync('authorization', res.result.user_token)
              wx.setStorageSync('is_auth', res.result.is_auth)
              wx.setStorageSync('rec_id', res.result.user_id)
              app.fun.post('/home/recruitDetail', {
                id: e.id
              }).then((res) => {
                const result = res.result
                _this.setData({
                  shop_id: result.shop_id,
                  record_id: result.id,
                  title: result.title,
                  img_url: result.img_url,
                  province: result.province,
                  city: result.city,
                  district: result.district,
                  address: result.address,
                  property: result.property,
                  start_salary: result.start_salary,
                  end_salary: result.end_salary,
                  longitude: result.longitude,
                  latitude: result.latitude,
                  status: result.collect_status,
                  shop_info: result.shop_info,
                  position: result.province + result.city + result.district + result.address,
                  content: result.content
                })
              })
            })
          }
        })
      }
    })
  },
  onShareAppMessage(res) {
    const rec_id = wx.getStorageSync('rec_id')
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.data.title,
      path: `/pages/job/index?id=${this.data.id}&rec_id=${rec_id}`,
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
  }
})
