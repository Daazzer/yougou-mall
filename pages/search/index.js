const app = getApp()

Page({
  data: {
    isSearched: false,
    isSearching: false,
    searchText: '',
    searchResultItems: []
  },
  handleInput (e) {
    this.setData({ searchText: e.detail.value })
  },
  async renderSearchResultItems () {
    const query = this.data.searchText

    const [err, res] = await app.api.getGoodsSearch({ query })

    this.setData({ isSearching: false })

    if (!this.data.isSearched) {
      this.setData({ isSearched: true })
    }

    if (err) {
      app.showErrorTips(err, '搜索失败')
      return
    }

    let searchResultItems = []

    if (res.data.message) {
      searchResultItems = res.data.message
    }

    this.setData({ searchResultItems })
  },
  searchGoods () {
    if (this.data.isSearching) {
      return
    }

    this.setData({ isSearching: true })

    this.renderSearchResultItems()
  }
})
