var app = getApp()

const baseUrl = 'https://mlong.eshanjinfu.com/api'

function post(url, data) {
  wx.showLoading({
    title: '玩命加载中'
  })
  return new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl + url,
      header: {
        'authorization': wx.getStorageSync('authorization') ? wx.getStorageSync('authorization') : '',
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: data,
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        switch (res.data.code) {
          case 200: // 请求正常
            resolve(res.data)
            break
          case 101: // 重新登录
            // location.href = res.data.result.redirect_uri
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'none'
            // })
            wx.login({
              success: res => {
                post('/user/login', {
                  code: res.code,
                  rec_id: wx.getStorageSync('rec_id') ? wx.getStorageSync('rec_id') : 0
                }).then((res) => {
                  wx.setStorageSync('authorization', res.result.user_token)
                  wx.setStorageSync('is_auth', res.result.is_auth)
                  wx.setStorageSync('rec_id', res.result.user_id)
                  let pages = getCurrentPage()
                  let currentPage = pages[pages.length - 1]
                  currentPage.onLoad()
                })
              }
            })
            break
          default:
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            break
        }
      },
      fail: function (err) {
        reject(err)
       }
    })
  })
}
function get(url, data) {
  // wx.showLoading({
  //   title: '玩命加载中'
  // })
  return new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl + url,
      header: {
        'content-type': 'application/json'
      },
      data: data,
      method: 'GET',
      success: function (res) {
        resolve(res.data)
        wx.hideLoading()
      },
      fail: function (err) {
        reject(err)
       }
    })
  })
}
module.exports = {
  post: post,
  get: get
}
