//app.js
const http = require('./utils/http')
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    const _this  =this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('start',new Date())
    // wx.checkSession({
    //   success() {
    //     console.log("处于登录状态")
    //     //session_key 未过期，并且在本生命周期一直有效
    //   },
    //   fail() {
    //     // session_key 已经失效，需要重新执行登录流程
    //     wx.login({
    //       success: res => {
    //         http.post('/user/login', {
    //           code: res.code,
    //           rec_id: options.rec_id ? options.rec_id : 0
    //         }).then((res) => {
    //           console.log('login success',new Date())
    //           wx.setStorageSync('authorization', res.result.user_token)
    //           wx.setStorageSync('is_auth', res.result.is_auth)
    //           wx.setStorageSync('rec_id', res.result.user_id)
    //         })
    //       }
    //     })
    //   }
    // })
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
              this.globalData.userInfo = res.userInfo
              this.globalData.nickName = userInfo.nickName
              this.globalData.avatarUrl = userInfo.avatarUrl
              this.globalData.gender = userInfo.gender //性别 0：未知、1：男、2：女
              this.globalData.province = userInfo.province
              this.globalData.city = userInfo.city
              this.globalData.country = userInfo.country
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
  },
  globalData: {
    is_auth: 0,
    rec_id: null,
    userInfo: null,
    nickName: null,
    avatarUrl: null,
    gender: null,
    province: null,
    city: null,
    country: null,
    host: 'https://mlong.eshanjinfu.com',
    header: {
      'authorization': wx.getStorageSync('authorization') ? wx.getStorageSync('authorization') : ''
    }
  },
  fun: {
    post: http.post,
    get:http.get
  }
})
