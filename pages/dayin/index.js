const app =getApp()
Page({
  data: {
    id: null,
    type: null,
    shop_name: '',
    recruit_name: '',
    bank_name: '',
    bank_card: '',
    bank_phone: '',
    id_card: '',
    telephone: '',
    real_name: '',
    enterprise_name: '',
    canvasHidden: true,
    screenWidth: null,
  },
  onLoad(e) {
    const that = this
    wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth,
          id: e.id,
          type: e.type
        })
      }
    }),
      app.fun.post('/user/workersDetail', {
        id:e.id
      }).then((res) => {
        this.setData({
          shop_name: res.result.shop_name,
          recruit_name: res.result.recruit_name,
          bank_name: res.result.bank_name,
          bank_card: res.result.bank_card,
          bank_phone: res.result.bank_phone,
          id_card: res.result.id_card,
          telephone: res.result.telephone,
          real_name: res.result.real_name,
          enterprise_name: res.result.enterprise_name,
        })
      })
  },
  save() {
    app.fun.post('/user/workersPdf', {
      id:this.data.id
    }).then((res) => {
      wx.downloadFile({
        url: res.result.url, //仅为示例，并非真实的资源
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            var filePath = res.tempFilePath
            console.log(res)
            wx.saveFile({
              tempFilePath: filePath,
              success(res) {
                wx.showToast({
                  title: '保存成功！'
                })
                const savePath = res.savedFilePath
                wx.openDocument({
                  filePath: savePath,
                  success: function (res) {
                    console.log('打开文档成功')
                  },
                  fail: function (res) {
                    console.log(res)
                  },
                  complete: function (res) {
                    console.log(res)
                  }
                })
              }
            })

          }
        }
      })
    })
  }
})
