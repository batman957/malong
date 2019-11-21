const app = getApp()
Page({
  data: {},
  onLoad() {
    app.fun.post('/user/agentCode').then((res) => {
      this.setData({
        img_url:res.result.url
      })
    })
  },
  saveImage() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })

    // wx.getImageInfo({
    //   src: this.data.img_url,
    //   success(res) {
    //     let path = res.path
    //     wx.saveImageToPhotosAlbum({
    //       filePath: path,
    //       success(res) {
    //         console.log(res)
    //         wx.showToast({
    //           title: '保存成功'
    //         })
    //       },
    //       fail: (res) => {
    //         wx.showToast({
    //           title: '保存失败',
    //           icon: 'none'
    //         })
    //       }
    //     })
    //   }
    // })
  }
})
