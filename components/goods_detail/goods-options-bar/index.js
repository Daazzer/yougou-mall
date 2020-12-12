Component({
  properties: {
    goods_number: {
      type: Number,
      value: 0
    },
    goods_id: {
      type: Number,
      value: 0
    }
  },
  methods: {
    addToCart () {
      this.triggerEvent('add-to-cart')
    }
  },
  externalClasses: ['iconfont', 'icon-gouwuche', 'icon-kefu']
})
