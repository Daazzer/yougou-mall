Page({
  data: {
    questTypeItems: [
      { content: '功能问题', checked: true },
      { content: '性能问题', checked: false },
      { content: '体验问题', checked: false },
      { content: '其他', checked: false }
    ],
    imageItems: []
  },
  checkQuest (e) {
    const { index, checked } = e.currentTarget.dataset

    const questTypeItems = this.data.questTypeItems

    questTypeItems[index].checked = !checked

    this.setData({ questTypeItems })
  },
  uploadImg () {
    wx.chooseImage({
      count: 4,
      success: chooseImageRes => {
        if (this.data.imageItems.length >= 4) {
          wx.showToast({ title: '最多上传四张图片', icon: 'none' })
          return
        }
        const tempFilePaths = chooseImageRes.tempFilePaths
        const imageItems = this.data.imageItems
        tempFilePaths.forEach(tempFilePath => {
          if (imageItems.length < 4) {
            this.setData({ imageItems: [...imageItems, tempFilePath] })
          }
        })
      }
    })
  },
  clearImage (e) {
    const index = e.currentTarget.dataset.index
    const imageItems = this.data.imageItems
    imageItems.splice(index, 1)
    this.setData({ imageItems })
  }
})
