const app = getApp()

Page({
  data: {
    goods_id: 0,
    goods_number: 0,
    goodsDetail: {
      pics: []
    },
    isFavoriteGoods: false
  },
  shareMsg () {
    return {
      title: this.data.goodsDetail.goods_name,
      imageUrl: this.data.goodsDetail.goods_big_logo
    }
  },
  async renderGoodsDetail (goods_id) {
    const [err, res] = await app.api.getGoodsDetail({ goods_id })

    if (err) {
      app.showErrorTips(err, '获取商品详情数据失败')
      return
    }

    let goodsDetail = {}

    if (res.data.message) {
      goodsDetail = res.data.message
    }

    this.setData({ goodsDetail })
  },
  previewGoodsImages (e) {
    const { pics, index } = e.currentTarget.dataset
    const urls = pics.map(pic => pic.pics_big)
    const current = pics[index].pics_big
    wx.previewImage({ urls, current })
  },
  favoriteGoods () {
    let title = '收藏成功'
    let icon = 'success'
    let favoriteGoodsItems = app.yougou.getData('favoriteGoodsItems')

    favoriteGoodsItems = favoriteGoodsItems ? favoriteGoodsItems : []

    const delIndex = favoriteGoodsItems.findIndex(favoriteGoodsItem => favoriteGoodsItem.goods_id === this.data.goods_id)

    if (delIndex > -1) {
      title = '取消收藏'
      icon = 'none'
      favoriteGoodsItems.splice(delIndex, 1)
    } else {
      const favoriteGoodsItem = {
        goods_id: this.data.goodsDetail.goods_id,
        goods_name: this.data.goodsDetail.goods_name,
        goods_price: this.data.goodsDetail.goods_price,
        goods_small_logo: this.data.goodsDetail.goods_small_logo
      }

      favoriteGoodsItems.push(favoriteGoodsItem)
    }

    app.yougou.setData('favoriteGoodsItems', favoriteGoodsItems)
    this.setData({ isFavoriteGoods: icon === 'success' })
    wx.showToast({ title, icon })
  },
  addToCart () {
    let cart = app.yougou.getData('cart')

    cart = cart ? cart : []

    let goodsItemIndex = cart.findIndex(goodsItem => goodsItem.goods_id === this.data.goods_id)

    if (goodsItemIndex > -1) {
      this.setData({ goods_number: ++cart[goodsItemIndex].goods_number })
    } else {
      this.setData({ goods_number: ++this.data.goods_number })
      const goodsItem = {
        checked: true,
        goods_id: this.data.goods_id,
        goods_name: this.data.goodsDetail.goods_name,
        goods_price: this.data.goodsDetail.goods_price,
        goodsImage: this.data.goodsDetail.goods_small_logo,
        goods_number: this.data.goods_number
      }
      cart.push(goodsItem)
    }

    app.yougou.setData('cart', cart)
    wx.showToast({ title: '已加入购物车' })
  },
  onLoad ({ goods_id }) {
    wx.showShareMenu({ withShareTicket: true })
    this.setData({ goods_id: Number(goods_id) })
    this.renderGoodsDetail(Number(goods_id))
  },
  onShow () {
    let favoriteGoodsItems = app.yougou.getData('favoriteGoodsItems')
    let cart = app.yougou.getData('cart')

    favoriteGoodsItems = favoriteGoodsItems ? favoriteGoodsItems : []
    cart = cart ? cart : []

    const favoriteItemIndex = favoriteGoodsItems.findIndex(favoriteGoodsItem => favoriteGoodsItem.goods_id === this.data.goods_id)
    const goodsItem = cart.find(goodsItem => goodsItem.goods_id === this.data.goods_id)

    if (goodsItem) {
      this.setData({ goods_number: goodsItem.goods_number })
    }

    this.setData({ isFavoriteGoods: favoriteItemIndex > -1 })
  },
  onPullDownRefresh () {
    Promise
      .all([this.renderGoodsDetail(this.data.goods_id)])
      .then(() => wx.stopPullDownRefresh())
  },
  onShareAppMessage () {
    return this.data.shareMsg
  },
  onAddToFavorites () {
    return this.data.shareMsg
  }
})
