import { checkLogin } from './util'

export default {
  baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
  authReg: /^\/my.*/,
  addAuthHeaderField (header) {
    const yougou = wx.getStorageSync('yougou')
    header.Authorization = yougou.user.token

    return header
  },
  /**
   * http 请求
   * @param {string} method 请求方法
   * @param {string} url 请求 url
   * @param {Object} [data] 参数对象
   * @returns {Promise} 请求的 Promise 结果
   */
  request (method, url, data) {
    const p = new Promise((rv, rj) => {
      wx.showLoading({ title: '数据加载中...' })

      let header = { 'content-type': 'application/json' }

      if (this.authReg.test(url) && checkLogin()) {
        header = this.addAuthHeaderField(header)
      }

      wx.request({
        url: this.baseURL + url,
        data,
        header,
        method,
        success (res) {
          if (!res.data) {
            rj({ msg: '' })
            return
          }

          if (res.data.meta.status === 200) {
            rv(res)
          } else {
            rj({ msg: res.data.meta.msg })
          }
        },
        fail (err) {
          rj(err)
        },
        complete () {
          wx.hideLoading()
        }
      })
    })

    return p
  },
  /**
   * 集中处理请求 then/catch
   * @param {Promise} p 请求 Promise 对象
   */
  handler (p) {
    return p.then(res => [null, res]).catch(err => [err])
  },
  /**
   * 发送 GET 请求
   * @param {string} url 请求 url
   * @param {Object} [data] 参数对象
   * @returns {Promise}
   */
  get (url, data) {
    return this.handler(this.request('GET', url, data))
  },
  /**
   * 发送 POST 请求
   * @param {string} url 请求 url
   * @param {Object} [data] 参数对象
   * @returns {Promise}
   */
  post (url, data) {
    return this.handler(this.request('POST', url, data))
  }
}
