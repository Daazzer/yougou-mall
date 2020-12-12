const { checkLogin } = require('../../utils/util')
const app = getApp()

Page({
  data: {
    activeOrderOptionItem: 0,
    orderOptionItems: [
      { text: '待付款', icon: 'icon-test' },
      { text: '待收货', icon: 'daishouhuo' },
      { text: '退货/退款', icon: 'tuihuo' },
      { text: '全部订单', icon: 'quanbudingdan01' },
      { text: '我的收藏', icon: 'shoucang' }
    ],
    user: {}
  },
  handleOption (e) {
    const key = e.currentTarget.dataset.text
    const data = e.currentTarget.dataset.subtext
    switch (key) {
      case '注销':
        this.logout()
        break
      case '意见反馈':
        wx.navigateTo({ url: '/pages/feedback/index' })
        break
      case '联系客服':
        wx.makePhoneCall({ phoneNumber: data })
        break
      case '全部订单':
      case '待付款':
      case '我的收藏':
        this.orderOption(key)
        break
    }
  },
  logout () {
    wx.showModal({
      title: '提示',
      content: '真的要退出吗？',
      success: res => {
        if (res.confirm) {
          this.setData({ user: {} })
          this.setYouGouUser()
          wx.showToast({ title: '退出成功' })
        }
      }
    })
  },
  orderOption (key) {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }

    let url = '/pages/order/index'

    if (key === '待付款') {
      url = '/pages/order/index?type=2'
    }

    if (key === '我的收藏') {
      url = '/pages/collect/index'
    }

    wx.navigateTo({ url })
  },
  setYouGouUser () {
    app.yougou.setData('user', { ...this.data.user })
  },
  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentIndex: 3 })
    }

    let user = app.yougou.getData('user')
    user = user ? user : {}

    this.setData({ user })
  }
})
