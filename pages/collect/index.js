const app = getApp()
const { checkLogin } = require('../../utils/util')

Page({
  data: {
    collectItems: []
  },
  onShow () {
    if (!checkLogin()) {
      wx.showToast({ title: '请登录', icon: 'none' })
      setTimeout(() => wx.redirectTo({ url: '/pages/login/index' }), 1500)
      return
    }

    const favoriteGoodsItems = app.yougou.getData('favoriteGoodsItems')

    this.setData({ collectItems: favoriteGoodsItems ? favoriteGoodsItems : [] })
  }
})
