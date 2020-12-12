Component({
  data: {
    currentIndex: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconPath: '/static/images/index.png',
        selectedIconPath: '/static/images/index_selected.png'
      },
      {
        pagePath: '/pages/category/index',
        text: '分类',
        iconPath: '/static/images/category.png',
        selectedIconPath: '/static/images/category_selected.png'
      },
      {
        pagePath: '/pages/cart/index',
        text: '购物车',
        iconPath: '/static/images/cart.png',
        selectedIconPath: '/static/images/cart_selected.png'
      },
      {
        pagePath: '/pages/user/index',
        text: '我的',
        iconPath: '/static/images/user.png',
        selectedIconPath: '/static/images/user_selected.png'
      }
    ]
  },
  methods: {
    switchTap (e) {
      const { index: currentIndex, path: url } = e.currentTarget.dataset
      wx.switchTab({ url })
      this.setData({ currentIndex })
    }
  }
})
