
const app = getApp()
Page({
  data: {
    list: [{
      img: '../../assets/images/wdjl.png',
      text: '我的简历',
      path: '/pages/jianli/index',
      show: true
    }, {
      img: '../../assets/images/wdtd.png',
      text: '我的投递',
      path: '/pages/toudi/index',
      show: true
    }, {
      img: '../../assets/images/wdsc.png',
      text: '我的收藏',
      path: '/pages/shoucang/index',
      show: true
    }, {
      img: '../../assets/images/wdzh.png',
      text: '我的账户',
      path: '/pages/wodezhanghu/index',
      show: true
    }, {
      img: '../../assets/images/zgdb.png',
      text: '招工代表',
      path: '/pages/zhaogongdaibiao/index',
      show:true
    }, {
      img: '../../assets/images/wdfs.png',
      text: '我的粉丝',
      path: '/pages/wodefensi/index',
      show: true
    }, {
      img: '../../assets/images/kf.png',
      text: '在线客服',
      path: '/',
      show: true
    }, {
      img: '../../assets/images/gzt.png',
      text: '工资条',
      show: true,
      path: '/pages/gongzitiao/index'
    }, {
      img: '../../assets/images/zcwy.png',
      text: '驻厂文员',
      path: '/pages/zhuchangwenyuan/index',
      show: true
    }, {
      img: '../../assets/images/jiezhishenqing.png',
      text: '借支申请',
      path: '/pages/jiezhi/index',
      show: true
    }, {
      img: '../../assets/images/ruzhixinxi.png',
      text: '入职信息',
      path: '/pages/ruzhixinxi/index',
      show: true
    }, {
      img: '../../assets/images/ruzhu.png',
      text: '申请入驻',
      path: '/pages/shenqingruzhu/index',
      show: true
    }, {
      img: '../../assets/images/fabu.png',
      text: '我的发布',
      path: '/pages/wodefabu/index',
      show: true
    }
    ],
    id: null,
    nickName: '',
    avatar: '',
    gender: '',
    province: '',
    city: '',
    country: '',
    canIUse: true,
    hasInfo: false,
    title: null,
    is_bind: 0,
    is_workers: 0,
    showWorker: true,
    hasInfo: false,
    is_auth: 0,
    cooperate_shop_id: 0
  },
  goToPage: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      path: e.currentTarget.dataset.path
    })
    if (this.data.is_bind === 0) {
      if (e.currentTarget.dataset.index === 3 || e.currentTarget.dataset.index === 4) {
        this.setData({
          path: '/pages/shenqing/index'
        })
      }
    }
    if (e.currentTarget.dataset.index === 0) {
      this.setData({
        path: `/pages/jianli/index?avatar_url=${this.data.avatar}`
      })
      wx.setStorageSync('avatar_url', this.data.avatar)
    }
    // if (e.currentTarget.dataset.index === 10) {
    //   this.setData({
    //     path: '/pages/saomazhuce/index'
    //   })
    // }
    wx.navigateTo({
      url: this.data.path
    })
  },
  goToSheZhi: function () {
    wx.navigateTo({
      url: `/pages/jibenxinxi/index?id=${this.data.resume_id}`
    })
  },
  getUserInfo(e) {
    const userInfo = e.detail.userInfo
    app.fun.post('/user/auth', {
      nickname: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      sex: userInfo.gender, //性别 0：未知、1：男、2：女
      province: userInfo.province,
      city: userInfo.city,
      country: userInfo.country
    }).then((res) => {
      console.log(res)
      wx.setStorageSync('avatar_url', this.data.avatar)
    })
  },
  onLoad() {
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    app.fun.post('/user/index', {}).then((res) => {
      if (res.result) {
        this.setData({
          title: res.result.title,
          id: res.result.id,
          nickName: res.result.nickname,
          avatar: res.result.avatar,
          is_workers: res.result.is_workers,
          is_bind:res.result.is_bind,
          cooperate_shop_id: res.result.cooperate_shop_id,
          share_title: res.result.share_title,
          share_img: res.result.share_img,
          hasInfo:true
        })
        for (let i = 0; i < this.data.list.length; i++) {
          if (i === 11 || i === 12) {
            this.data.list[i].show = false
          }
        }
        wx.setStorageSync('avatar_url', this.data.avatar)
        if (parseInt(this.data.is_workers) === 0) {
          for (let i = 0; i < this.data.list.length; i++) {
            if (i === 7 || i === 9 || i === 10) {
              this.data.list[i].show = false
            }
          }
          this.setData({
            list: this.data.list
          })
        } else if(parseInt(this.data.is_workers) === 1) {
          for (let i = 0; i < this.data.list.length; i++) {
            if (i === 7 || i === 9 || i === 10) {
              this.data.list[i].show = true
            }
          }
          this.setData({
            list: this.data.list
          })
        }
        if (parseInt(this.data.cooperate_shop_id) === 0) {
          for (let i = 0; i < this.data.list.length; i++) {
            if (i === 8) {
              this.data.list[i].show = false
            }
          }
        }
        this.setData({
          list: this.data.list
        })
      }
    })
    app.fun.post('/user/resume').then((res) => {
      this.setData({
        resume_id : res.result.id
      })
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
  // onShareAppMessage(res) {
  //   const rec_id = wx.getStorageSync('rec_id')
  //   if (res.from === 'button') {
  //     console.log(res.target)
  //   }
  //   return {
  //     title: this.data.title,
  //     path: `/pages/account/index?rec_id=${rec_id}`,
  //     success(res) {
  //       console.log(res.shareTickets)
  //       if (res.from === 'menu') {
  //         wx.getShareInfo({
  //           shareTicket: res.shareTickets[0],
  //           success: (res) => {
  //             console.log('已成功获取到加密信息')
  //           }
  //         })

  //       }
  //     }
  //   }
  // },
  readyGetUserInfo(e) {
    if (e.detail.userInfo !== undefined) {
      const userInfo = e.detail.userInfo
      this.setData({
        nickName: userInfo.nickName,
        avatar: userInfo.avatarUrl,
      })
      app.fun.post('/user/auth', {
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        sex: userInfo.gender, //性别 0：未知、1：男、2：女
        province: userInfo.province,
        city: userInfo.city,
        country: userInfo.country
      }).then((res) => {
        console.log(res)
        this.setData({
          is_auth: 1
        })
        wx.setStorageSync('is_auth', 1)
        app.globalData.is_auth = 1
      })
    }
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.onLoad()
  },
})
