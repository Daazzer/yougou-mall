const { checkLogin } = require('../../utils/util')
const app = getApp()

Page({
  data: {
    checkedGoodsItems: [],
    consignee: {},
    isPaying: false,
    isIPhoneX: false
  },
  totalPrice (checkedGoodsItems) {
    return checkedGoodsItems.reduce((totalPrice, checkedGoodsItem) => {
      return totalPrice += checkedGoodsItem.goods_price * checkedGoodsItem.goods_number
    }, 0)
  },
  chooseAddress () {
    wx.chooseAddress({
      success: res => {
        const {
          provinceName,
          cityName,
          countyName,
          detailInfo,
          userName,
          telNumber
        } = res

        const consignee = {
          address: provinceName + cityName + countyName + detailInfo,
          name: userName,
          phone: telNumber
        }

        this.setData({ consignee })

        app.yougou.setData('consignee', { ...this.data.consignee })
      }
    })
  },
  async pay () {
    if (!checkLogin()) {
      wx.showModal({
        title: '提示',
        content: '需要登录后才能支付，是否登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/login/index' })
          }
        }
      })
      return
    }

    this.setData({ isPaying: true })

    const [orderErr, order_number] = await this.getOrderNumber()

    if (orderErr) {
      this.setData({ isPaying: false })
      app.showErrorTips(orderErr, '创建订单失败')
      return
    }

    const [payParamsErr, payParams] = await this.getPayParams(order_number)

    if (payParamsErr) {
      this.setData({ isPaying: false })
      app.showErrorTips(payParamsErr, '获取支付参数失败')
      return
    }

    wx.requestPayment({
      ...payParams,
      complete: async () => {
        const [err, res] = await app.api.checkOrder({ order_number })

        if (err) {
          if (err.msg) {
            app.showErrorTips({}, err.msg)
            setTimeout(() => {
              wx.navigateTo({ url: '/pages/order/index?type=2' })
              this.setData({ isPaying: false })
            }, 1600)
          } else {
            app.showErrorTips(err, '支付失败')
            this.setData({ isPaying: false })
          }
        } else {
          wx.showToast({ title: res.data.message })
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/order/index?type=3' })
            this.setData({ isPaying: false })
            this.clearCheckedGoods()
          }, 1600)
        }
      }
    })
  },
  async getOrderNumber () {
    const data = {
      order_price: this.totalPrice(this.data.checkedGoodsItems),
      consignee_addr: this.data.consignee.address,
      goods: this.data.checkedGoodsItems.map(v => ({
        goods_id: v.goods_id,
        goods_number: v.goods_number,
        goods_price: v.goods_price
      }))
    }

    const [err, res] = await app.api.createOrder(data)

    if (err) {
      return [err]
    }

    return [null, res.data.message.order_number]
  },
  async getPayParams (order_number) {
    const [err, res] = await app.api.getPayParams({ order_number })

    if (err) {
      return [err]
    }

    return [null, res.data.message.pay]
  },
  clearCheckedGoods () {
    let cart = app.yougou.getData('cart')

    const unCheckedGoodsItems = cart.filter(goodsItem => !goodsItem.checked)

    cart = unCheckedGoodsItems

    app.yougou.setData('cart', cart)
  },
  async onShow () {
    const cart = app.yougou.getData('cart')
    let consignee = app.yougou.getData('consignee')

    consignee = consignee ? consignee : {}
    const checkedGoodsItems = cart ? cart.filter(goodsItem => goodsItem.checked) : []

    this.setData({
      consignee,
      checkedGoodsItems
    })
  }
})
