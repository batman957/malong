Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#46cfc4",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "../assets/images/zw.png",
        selectedIconPath: "../assets/images/zw-s.png",
        text: "职位"
      }, {
        pagePath: "/pages/video/index",
        iconPath: "../assets/images/sp.png",
        selectedIconPath: "../assets/images/sp-s.png",
        text: "视频"
      }, {
        pagePath: "/pages/index/index",
        iconPath: "../assets/images/fabu-btn.png",
        selectedIconPath: "../assets/images/fabu-btn.png",
        text: "发布"
      }, {
        pagePath: "/pages/shangmai/index",
        iconPath: "../assets/images/sm.png",
        selectedIconPath: "../assets/images/sm-s.png",
        text: "商脉"
      }, {
        pagePath: "/pages/account/index",
        iconPath: "../assets/images/wd.png",
        selectedIconPath: "../assets/images/wd-s.png",
        text: "我的"
      }
    ]
  },
  attached() {
  },
  pageLifetimes: {
    show() {
      if (typeof this.switchTab === 'function' &&
        this.switchTab()) {
        this.switchTab().setData({
          selected: 1
        })
      }
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
      console.log(data.path)
    }
  }
})
