const app = getApp()

Page({
  data: {
    isSearchBarFixed: false,
    isLoadingGoodsItems: false,
    isLastPage: false,
    params: {
      pagenum: 1,
      pagesize: 15
    },
    sortSelected: 0,
    sortItems: [
      { title: '综合' },
      { title: '销量' },
      { title: '价格' }
    ],
    goodsItems: []
  },
  async renderGoodsItems (params) {
    this.setData({ isLoadingGoodsItems: true })
    const [err, res] = await app.api.getGoodsList(params)

    if (err) {
      app.showErrorTips(err, '获取商品列表数据失败')
      this.setData({ isLoadingGoodsItems: false })
      return
    }

    let goodsItems = []

    if (res.data.message) {
      goodsItems = res.data.message.goods
    }

    if (goodsItems.length < this.data.params.pagesize) {
      this.setData({ isLastPage: true })
    }

    if (this.data.params.pagenum === 1) {
      this.setData({ goodsItems })
    } else {
      this.setData({ goodsItems: [...this.data.goodsItems, ...goodsItems] })
    }

    this.setData({ isLoadingGoodsItems: false })
  },
  handleSort (e) {
    const sortSelected = e.currentTarget.dataset.index

    this.setData({ sortSelected })
  },
  onLoad (params) {
    this.setData({ params: { ...this.data.params, ...params } })
    this.renderGoodsItems(this.data.params)
  },
  onShow () {
    const tabBar = this.selectComponent('#tabBar')
    tabBar.setData({ currentIndex: 1 })
  },
  onPullDownRefresh () {
    this.setData({
      isLastPage: false,
      params: { ...this.data.params, pagenum: 1 }
    })
    Promise.all([
      this.renderGoodsItems(this.data.params)
    ]).then(() => wx.stopPullDownRefresh())
  },
  async onPageScroll ({ scrollTop }) {
    const isSearchBarFixed = this.data.isSearchBarFixed

    if (scrollTop > 0 && !isSearchBarFixed) {
      this.setData({ isSearchBarFixed: true })
    } else if (scrollTop <= 0 && isSearchBarFixed) {
      this.setData({ isSearchBarFixed: false })
    }
  },
  onReachBottom () {
    if (!this.data.isLastPage && !this.data.isLoadingGoodsItems) {
      const pagenum = ++this.data.params.pagenum
      this.setData({ params: { ...this.data.params, pagenum } })
      this.renderGoodsItems(this.data.params)
    }
  }
})
