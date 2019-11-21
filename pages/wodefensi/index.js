const app =getApp()
Page({
  data: {
    selected: '1',
    list: [],
    type: 'fir',
    page: 1,
    limit: 10,
    finished: false
  },
  selectTab: function (e) {
    console.log(e)
    this.setData({
      selected: e.currentTarget.dataset.num,
      page: 1,
      limit: 10,
      list: []
    })
    if (this.data.selected === '1') {
      this.setData({
        type: 'fir'
      })
    } else if (this.data.selected === '2') {
      this.setData({
        type: 'sec'
      })
    }
    app.fun.post('/user/subUser',{
      page: this.data.page,
      limit: this.data.limit,
      type: this.data.type
    }).then((res) => {
      if (res.result) {
        this.setData({
          list: res.result
        })
      }
    })
  },
  onLoad() {
    app.fun.post('/user/subUser', {
      page: this.data.page,
      limit: this.data.limit,
      type: this.data.type
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
    app.fun.post('/user/subUser', {
      page: this.data.page + 1,
      limit: this.data.limit,
      type: this.data.type
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
})
