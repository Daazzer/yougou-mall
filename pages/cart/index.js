const app = getApp()

Page({
  data: {
    goodsItems: []
  },
  isCheckedAll (goodsItems) {
    const unCheckedIndex = goodsItems.findIndex(goodsItem => goodsItem.checked === false)
    return unCheckedIndex === -1 && goodsItems.length > 0
  },
  checkedGoodsNum (goodsItems) {
    return goodsItems.reduce((checkedNum, goodsItem) => {
      if (goodsItem.checked) {
        checkedNum++
      }
      return checkedNum
    }, 0)
  },
  handleCheckedGoods (e) {
    const index = e.currentTarget.dataset.index
    const goodsItems = this.data.goodsItems
    const checked = goodsItems[index].checked
    goodsItems[index].checked = !checked
    this.setData({ goodsItems })
    this.setCart()
  },
  handleAddGoodsNum (e) {
    const index = e.currentTarget.dataset.index
    const goodsItems = this.data.goodsItems
    goodsItems[index].goods_number++
    this.setData({ goodsItems })
    this.setCart()
  },
  handleReduceGoodsNum (e) {
    const index = e.currentTarget.dataset.index
    const goodsItems = this.data.goodsItems
    if (goodsItems[index].goods_number > 1) {
      goodsItems[index].goods_number--
      this.setData({ goodsItems })
      this.setCart()
    }
  },
  checkedAll () {
    const goodsItems = this.data.goodsItems
    if (goodsItems.length <= 0) {
      return
    }
    const checked = this.isCheckedAll(goodsItems)
    goodsItems.forEach(goodsItem => {
      if (goodsItem.checked === checked) {
        goodsItem.checked = !checked
      }
    })
    this.setData({ goodsItems })
    this.setCart()
  },
  setCart () {
    app.yougou.setData('cart', [...this.data.goodsItems])
  },
  deleteGoodsItems () {
    let goodsItems = this.data.goodsItems
    if (this.checkedGoodsNum(goodsItems) <= 0) {
      wx.showToast({ title: '请选择要删除的商品', icon: 'none' })
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否删除选中的商品',
      success: res => {
        if (res.confirm) {
          const reserveGoodsItems = goodsItems.filter(goodsItem => !goodsItem.checked)
          goodsItems = reserveGoodsItems
          this.setData({ goodsItems })
          this.setCart()
        }
      }
    })
  },
  goToPay () {
    wx.navigateTo({ url: '/pages/pay/index' })
  },
  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentIndex: 2 })
    }

    const cart = app.yougou.getData('cart')
    const goodsItems = cart ? cart : []

    this.setData({ goodsItems })
  }
})
