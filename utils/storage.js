class Yougou {
  constructor () {
    this.user = this.getData('user')
    this.favoriteGoodsItems = this.getData('favoriteGoodsItems')
    this.cart = this.getData('cart')
    this.consignee = this.getData('consignee')
  }

  initData () {
    this.user = {}
    this.favoriteGoodsItems = []
    this.cart = [],
    this.consignee = {}
  }

  getData (key) {
    const yougou = wx.getStorageSync('yougou')

    if (!yougou) {
      // 初始化对象数据
      this.initData()
    } else {
      this[key] = yougou[key]
    }

    return this[key]
  }

  setData (key, data) {
    this[key] = data
    wx.setStorageSync('yougou', this)
  }
}

export default new Yougou
