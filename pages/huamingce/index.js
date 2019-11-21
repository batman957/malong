const app = getApp()
Page({
  data: {
    keyword: '',
    showIcon: true,
    page: 1,
    limit: 10,
    list: [],
    finished: false
  },
  hideIcon() {
    this.setData({
      showIcon: false
    })
  },
  showIcon() {
    if (this.data.keyword !== null) {
      console.log(111)
      this.setData({
        showIcon: false
      })
    } else {
      this.setData({
        showIcon: true
      })
    }

  },
  getKeyword(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  goToDetail(e) {
    wx.navigateTo({
      url: `/pages/huamingce-detail/index?id=${e.currentTarget.dataset.id}&name=${e.currentTarget.dataset.name}`
    })
  },
  uploadFile() {
    const _this = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log(res.tempFiles)
        wx.showLoading({
          title: '上传中...'
        })
        wx.uploadFile({
          url: app.globalData.host + '/api/user/rosterImport',
          filePath: res.tempFiles[0].path,
          name: 'xls',
          header: app.globalData.header,
          success(res) {
            wx.hideLoading()
            const that = _this
            const data = JSON.parse(res.data)
            wx.showToast({
              title: data.msg,
              duration: 1000,
              success() {
                wx.showLoading({
                  title: '正在导入，请稍后...'
                })
              }
            })
            setTimeout(() => {
              const _that = that
              wx.hideLoading()
              wx.showToast({
                title: '导入成功',
                duration: 1000,
                success() {
                  _that.onLoad()
                }
              })
            }, 2000)

          },
          fail(err) {
            wx.showToast({
              title: '上传失败'
            })
          }
        })
      }
    })
  },
  startSearch() {
    this.setData({
      list: [],
      page: 1,
      limit: 10
    })
    app.fun.post('/user/roster', {
      page: this.data.page,
      limit: this.data.limit,
      keyword: this.data.keyword
    }).then((res) => {
      this.setData({
        list: res.result
      })
    })
  },
  onLoad() {
    app.fun.post('/user/roster', {
      page: this.data.page,
      limit: this.data.limit,
      keyword: this.data.keyword
    }).then((res) => {
      this.setData({
        list: res.result
      })
    })
  },
  onReachBottom() {
    let that = this
    if (this.data.finished === true) {
      return
    }
    app.fun.post('/user/roster', {
      page: this.data.page + 1,
      limit: this.data.limit,
      keyword: this.data.keyword
    }).then((res) => {
      if (res.result.length) {
          this.setData({
            list: this.data.list.concat(res.result)
          })
        this.data.page++
        this.setData({
          page:this.data.page
        })
      } else {
        this.setData({
          finished: true
        })
      }
    })
  },
})
