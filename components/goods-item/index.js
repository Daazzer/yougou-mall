Component({
  externalClasses: ['iconfont', 'icon-jianhao', 'icon-jiahao'],
  properties: {
    url: {
      type: String
    },
    goodsChecked: {
      type: Boolean,
      value: null
    },
    goodsImage: {
      type: String
    },
    goodsName: {
      type: String
    },
    goodsPrice: {
      type: Number,
      value: null
    },
    goodsNum: {
      type: Number
    },
    goodsCount: {
      type: Number,
      value: null
    }
  },
  methods: {
    linkToUrl () {
      if (this.properties.goodsChecked === null) {
        wx.navigateTo({ url: this.properties.url })
      } else {
        this.triggerEvent('checked-goods')
      }
    },
    checkGoods () {
      this.triggerEvent('checked-goods')
    },
    reduceGoodsNum () {
      this.triggerEvent('reduce-goods-num')
    },
    addGoodsNum () {
      this.triggerEvent('add-goods-num')
    }
  }
})
