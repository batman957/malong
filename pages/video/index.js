Page({
  data: {
    controls: false,
    showComment: false,
    is_zan: false,
    videoList: [
      {
        video_url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      }
    ]
  },
  confirmZan() {
    this.setData({
      is_zan: true
    })
  },
  cancelZan() {
    this.setData({
      is_zan: false
    })
  },
  showComment() {
    const _this = this
    wx.hideTabBar({
      success() {
        _this.setData({
          showComment: true,
        })
      }
    })

  },
  closeComment() {
    const _this = this
    wx.showTabBar({
      success() {
        _this.setData({
          showComment: false
        })
      }
    })
  }
})
