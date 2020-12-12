const app = getApp()

Page({
  data: {
    isSearchBarFixed: false,
    carouselItems: [],
    cateItems: [],
    recommendItems: []
  },
  async renderCarousel () {
    const [err, res] = await app.api.getSwiperdata()

    if (err) {
      app.showErrorTips(err, '获取轮播数据失败')
      return
    }

    let carouselItems = []

    if (res.data.message) {
      carouselItems = res.data.message
    }

    this.setData({ carouselItems })
  },
  async renderCateItems () {
    const [err, res] = await app.api.getCateItems()

    if (err) {
      app.showErrorTips(err, '获取分类导航数据失败')
      return
    }

    let cateItems = []

    if (res.data.message) {
      cateItems = res.data.message.map(v => {
        // 添加导航路径
        if (v.name === '分类') {
          v.navigatorUrl = '/pages/category/index'
        } else {
          v.navigatorUrl = '/pages/goods_list/index?query=' + v.name
        }
        return v
      })
    }

    this.setData({ cateItems })
  },
  async renderRecommendItems () {
    const [err, res] = await app.api.getRecommeds()

    if (err) {
      app.showErrorTips(err, '获取推荐商品数据失败')
      return
    }

    let recommendItems = []

    if (res.data.message) {
      recommendItems = res.data.message
    }

    this.setData({ recommendItems })
  },
  onLoad () {
    this.renderCarousel()
    this.renderCateItems()
    this.renderRecommendItems()
  },
  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentIndex: 0 })
    }
  },
  onPageScroll ({ scrollTop }) {
    const isSearchBarFixed = this.data.isSearchBarFixed

    if (scrollTop > 0 && !isSearchBarFixed) {
      this.setData({ isSearchBarFixed: true })
    } else if (scrollTop <= 0 && isSearchBarFixed) {
      this.setData({ isSearchBarFixed: false })
    }
  },
  onPullDownRefresh () {
    const renderAll = [
      this.renderCarousel(),
      this.renderCateItems(),
      this.renderRecommendItems()
    ]
    Promise.all(renderAll).then(() => wx.stopPullDownRefresh())
  }
})
