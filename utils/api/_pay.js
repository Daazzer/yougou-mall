import http from '../http'

/**
 * 获取支付参数
 * @param {Object} data 请求体参数
 * @param {string} data.order_number 订单总价格
 * @returns {Promise}
 */
const getPayParams = data => http.post('/my/orders/req_unifiedorder', data)

export default {
  getPayParams
}
