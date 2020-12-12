const app = getApp()

Page({
  data: {
    categoryNavSelected: 0,
    categoryNavItems: []
  },
  async renderCategoryNavItems () {
    const [err, res] = await app.api.getCategories()

    if (err) {
      app.showErrorTips(err, '获取分类信息失败')
      return
    }

    let categoryNavItems = []

    if (res.data.message) {
      categoryNavItems = res.data.message
    }

    this.setData({ categoryNavItems })
  },
  handleTapCategoryNav (e) {
    const { index: categoryNavSelected } = e.currentTarget.dataset
    this.setData({ categoryNavSelected })
  },
  onLoad ({ cate_nav_index }) {
    if (cate_nav_index) {
      this.setData({ cateNavSelected: cate_nav_index })
    }
    this.renderCategoryNavItems()
  },
  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentIndex: 1 })
    }
  },
  onPullDownRefresh () {
    Promise.all([this.renderCategoryNavItems()]).then(() => wx.stopPullDownRefresh())
  }
})
