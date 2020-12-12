const { checkLogin } = require('../../utils/util')
const app = getApp()

Page({
  data: {
    type: 1,
    pageIndex: 1,
    pageSize: 15,
    isLoadingOrderItems: false,
    isLastPage: false,
    orderNavItems: [
      { title: '全部', type: 1 },
      { title: '待付款', type: 2 },
      { title: '待发货', type: 3 }
    ],
    orderItems: []
  },
  switchNav (e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      type,
      pageIndex: 1,
      isLastPage: false
    })
    this.renderOrderItems(this.data.type)
  },
  async renderOrderItems (type) {
    this.setData({ isLoadingOrderItems: true })
    const [err, res] = await app.api.checkOrderHistory({
      type,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    })

    if (err) {
      app.showErrorTips(err, '获取订单数据失败')
      this.setData({ isLoadingOrderItems: false })
      return
    }

    let orderItems = []

    if (res.data.message) {
      orderItems = res.data.message.orders
    }

    if (orderItems.length < this.data.pageSize) {
      this.setData({ isLastPage: true })
    }

    if (this.data.pageIndex === 1) {
      this.setData({ orderItems })
    } else {
      this.setData({ orderItems: [...this.data.orderItems, ...orderItems] })
    }

    this.setData({ isLoadingOrderItems: false })
  },
  onLoad ({ type }) {
    this.setData({ type: type ? Number(type) : 1 })

    this.renderOrderItems(this.data.type)
  },
  onShow () {
    if (!checkLogin()) {
      wx.redirectTo({ url: '/pages/login/index' })
    }
  },
  onReachBottom () {
    if (!this.data.isLastPage && !this.data.isLoadingOrderItems) {
      this.setData({ pageIndex: ++this.data.pageIndex })
      this.renderOrderItems(this.data.type)
    }
  }
})
