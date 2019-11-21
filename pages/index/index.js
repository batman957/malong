//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http')
Page({
  data: {
    page: 1,
    limit: 10,
    latitude: null,
    longitude: null,
    location: '全国',
    city:null,
    swipeList: [],
    recommend: [],
    hotPosition: [],
    finished: false,
    rec_id: null
  },
  //事件处理函数
  goToPage () {
    wx.navigateTo({
      url: `/pages/dingwei/index?location=${this.data.location}`
    })
  },
  goToCompany (e) {
    wx.navigateTo({
      url: `/pages/company/index?id=${e.currentTarget.dataset.id}`
    })
  },
  goTozhiwei() {
    wx.navigateTo({
      url:'/pages/gengduozhiwei/index'
    })
  },
  goToJob (e) {
    wx.navigateTo({
      url: `/pages/job/index?id=${e.currentTarget.dataset.id}`
    })
  },
  goToMoreCompany () {
    wx.navigateTo({
      url: '/pages/ruzhuqiye/index'
    })
  },
  startSearch(e) {
    // console.log(e)
    wx.navigateTo({
      url: '/pages/gengduozhiwei/index'
    })
  },
  onLoad(options) {
    const _this = this
    // wx.setStorageSync('rec_id',options.rec_id)
    wx.checkSession({
      success() {
        console.log("处于登录状态")
        //session_key 未过期，并且在本生命周期一直有效
        if (_this.data.city) {
          app.fun.post('/home/index', {
            city: _this.data.city
          }).then((res) => {
            _this.setData({
              location: res.result.city.replace('市', ''),
              swipeList: res.result.flash,
              recommend: res.result.shop,
              hotPosition: res.result.recruit
            })
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
          })
        } else {
          let that = _this
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              that.setData({
                latitude: res.latitude,
                longitude: res.longitude
              })
              app.fun.post('/home/index', {
                latitude: res.latitude,
                longitude: res.longitude,
              }).then((res) => {
                that.setData({
                  location: res.result.city.replace('市', ''),
                  swipeList: res.result.flash,
                  recommend: res.result.shop,
                  hotPosition: res.result.recruit
                })
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
              })
            }
          })
        }
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            http.post('/user/login', {
              code: res.code,
              rec_id: options.rec_id ? options.rec_id : 0
            }).then((res) => {
              console.log('login success', new Date())
              wx.setStorageSync('authorization', res.result.user_token)
              wx.setStorageSync('is_auth', res.result.is_auth)
              wx.setStorageSync('rec_id', res.result.user_id)
              if (_this.data.city) {
                app.fun.post('/home/index', {
                  city: _this.data.city
                }).then((res) => {
                  _this.setData({
                    location: res.result.city.replace('市', ''),
                    swipeList: res.result.flash,
                    recommend: res.result.shop,
                    hotPosition: res.result.recruit
                  })
                  wx.stopPullDownRefresh()
                  wx.hideNavigationBarLoading()
                })
              } else {
                let that = _this
                wx.getLocation({
                  type: 'gcj02',
                  success(res) {
                    that.setData({
                      latitude: res.latitude,
                      longitude: res.longitude
                    })
                    app.fun.post('/home/index', {
                      latitude: res.latitude,
                      longitude: res.longitude,
                    }).then((res) => {
                      that.setData({
                        location: res.result.city.replace('市', ''),
                        swipeList: res.result.flash,
                        recommend: res.result.shop,
                        hotPosition: res.result.recruit
                      })
                      wx.stopPullDownRefresh()
                      wx.hideNavigationBarLoading()
                    })
                  }
                })
              }
            })
          }
        })
        wx.getSetting({
          success: res => {
            if (res.authSetting) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                lang: 'zh_CN',
                success: res => {
                  let userInfo = res.userInfo
                  http.post('/user/auth', {
                    nickName: userInfo.nickName,
                    avatar: userInfo.avatarUrl,
                    sex: userInfo.gender, //性别 0：未知、1：男、2：女
                    province: userInfo.province,
                    city: userInfo.city,
                    country: userInfo.country
                  }).then((res) => {
                    // console.log(res.msg)
                  })
                  // 可以将 res 发送给后台解码出 unionId
                  app.globalData.userInfo = res.userInfo
                  app.globalData.nickName = userInfo.nickName
                  app.globalData.avatarUrl = userInfo.avatarUrl
                  app.globalData.gender = userInfo.gender //性别 0：未知、1：男、2：女
                  app.globalData.province = userInfo.province
                  app.globalData.city = userInfo.city
                  app.globalData.country = userInfo.country
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                },
                fail: res => {
                  // console.log(res)
                }
              })
            }
          }
        })
      }
    })
    console.log(options)
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
  },
  onReachBottom() {
    let that = this
    if (this.data.finished === true) {
        return
      }
    app.fun.post('/home/recruit', {
      page: this.data.page + 1,
      limit: this.data.limit
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
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.onLoad()
  },
  onShow () {
  },
  onShareAppMessage(res) {
    const rec_id = wx.getStorageSync('rec_id')
    if (res.from === 'button') { }
      return {
        title: '马龙网',
        path: '/pages/index/index?rec_id=' + rec_id,
        imageUrl: this.data.imageUrl ? this.data.imageUrl : null,
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
  goToLink(e) {
    if (e.currentTarget.dataset.link) {
      wx.navigateTo({
        url: e.currentTarget.dataset.link
      })
    }
  }
})
