Component({
  properties: {
    paddingBottom: {
      type: String,
      value: 0
    },
    checkedAllBtn: {
      type: Boolean,
      value: false
    },
    showDeleteBtn: {
      type: Boolean,
      value: false
    },
    isCheckedAll: {
      type: Boolean,
      value: true
    },
    totalPrice: {
      type: Number,
      value: 0
    },
    checkedNum: {
      type: Number,
      value: 0
    },
    disabledSettleBtn: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    checkedAll () {
      this.triggerEvent('checked-all')
    },
    delete () {
      this.triggerEvent('delete')
    },
    handleSettle () {
      if (!this.properties.disabledSettleBtn) {
        this.triggerEvent('settle')
      }
    }
  }
})
