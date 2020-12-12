const app = getApp()

Page({
  data: {
    user: {},
    firstLogin: false,
    logging: false
  },
  async login (user) {
    this.setData({ logging: true })
    const [userInfoErr, userInfo] = await this.getUserInfo(user.detail)

    if (userInfoErr) {
      this.setData({ logging: false })
      wx.showToast({ title: '授权失败', icon: 'none' })
      return
    }

    const [err, res] = await app.api.getToken(userInfo)

    if (err) {
      this.setData({ logging: false })
      app.showErrorTips(err, '登录失败')
      return
    }

    wx.showToast({ title: res.data.meta.msg })

    const token = res.data.message.token

    user = {
      ...user.detail.userInfo,
      token
    }

    this.setData({
      user,
      logging: false,
      firstLogin: true
    })

    this.saveUserInfo()

    setTimeout(() => wx.navigateBack(), 3000)
  },
  getUserInfo ({ encryptedData, rawData, iv, signature }) {
    const p = new Promise((rv, rj) => {
      wx.showLoading({ title: '加载用户信息...' })
      wx.login({
        success ({ code }) {
          const userInfo = {
            encryptedData,
            rawData,
            iv,
            signature,
            code
          }

          rv([null, userInfo])
        },
        fail (err) {
          rj([err])
        },
        complete () {
          wx.hideLoading()
        }
      })
    })
    return p
  },
  saveUserInfo () {
    app.yougou.setData('user', { ...this.data.user })
  },
  onShow () {
    let user = app.yougou.getData('user')

    user = user ? user : {}

    this.setData({ user })
  }
})
