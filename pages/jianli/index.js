const app =getApp()
Page({
  data: {
    id: null,
    jingyan_id:null,
    real_name: '',
    telephone: '',
    city:'',
    gender: '',
    birthday: '',
    intention_area: '',
    job_direction: '',
    graduation_school: '',
    graduation_time: '',
    degree: '',
    avatar: '',
    evaluation: '',
    experience: [],
  },
  goToSheZhi: function () {
    wx.navigateTo({
      url: `/pages/jibenxinxi/index?id=${this.data.id}`
    })
  },
  goToqiuzhiyixiang() {
    wx.navigateTo({
      url: `/pages/jl-qiuzhiyixiang/index?id=${this.data.id}`
    })
  },
  goTogongzuojingyan() {
    wx.navigateTo({
      url: `/pages/jl-gongzuojingyan/index?type=add&id=${this.data.id}`
    })
  },
  // goTojiaoyubeijing() {
  //   wx.navigateTo({
  //     url: '/pages/jl-jiaoyubeijing/index?type=add'
  //   })
  // },
  goTopingjia(e) {
    wx.navigateTo({
      url: `/pages/jl-ziwopingjia/index?id=${e.currentTarget.dataset.id}&evaluation=${e.currentTarget.dataset.evaluation}`
    })
  },
  editgongzuojingyan(e) {
    wx.navigateTo({
      url: `/pages/jl-gongzuojingyan/index?type=edit&id=${e.currentTarget.dataset.id}`
    })
  },
  // editjiaoyubeijing() {
  //   wx.navigateTo({
  //     url: '/pages/jl-jiaoyubeijing/index?type=edit'
  //   })
  // },
  onLoad(e) {
    app.fun.post('/user/resume', {}).then((res) => {
      this.setData({
        real_name: res.result.real_name,
        telephone: res.result.telephone,
        gender: res.result.gender,
        birthday: res.result.birthday,
        intention_area: res.result.intention_area,
        job_direction: res.result.job_direction,
        graduation_school: res.result.graduation_school,
        graduation_time: res.result.graduation_time,
        degree: res.result.degree,
        avatar: res.result.avatar,
        evaluation: res.result.evaluation,
        experience: res.result.experience,
        real_name: res.result.real_name,
        city: res.result.city,
        id: res.result.id
      })
      if (!res.result.avatar) {
        this.setData({
            avatar: wx.getStorageSync('avatar_url')
        })
      }
      app.jobInfo = {
        intention_area: res.result.intention_area,
        job_direction: res.result.job_direction,
        graduation_school: res.result.graduation_school,
        graduation_time: res.result.graduation_time,
        degree: res.result.degree,
      }
      app.resumeInfo = {
        real_name: res.result.real_name,
        telephone: res.result.telephone,
        gender: res.result.gender,
        birthday: res.result.birthday,
        city: res.result.city,
      }
    })
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.onLoad()
  },
})
