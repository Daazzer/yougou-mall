import http from '../http'

/**
 * 创建订单
 * @param {Object} data 请求体参数
 * @param {string} data.order_price 订单总价格
 * @param {string} data.consignee_addr 收货地址
 * @param {Object[]} data.goods 订单数组
 * @param {number} data.goods[].goods_id 商品id
 * @param {number} data.goods[].goods_number 购买的数量
 * @param {number} data.goods[].goods_price 单价
 * @returns {Promise}
 */
const createOrder = data => http.post('/my/orders/create', data)

/**
 * 查看订单支付状态
 * @param {Object} data 请求体参数
 * @param {string} data.order_number 订单编号
 * @returns {Promise}
 */
const checkOrder = data => http.post('/my/orders/chkOrder', data)

/**
 * 历史订单查询
 * @param {Object} data 请求体参数
 * @param {number} data.type 接受的值: 1:全部订单 2:待付款 3:待发货
 * @param {number} [data.pageIndex=10] 当前页码
 * @param {number} [data.pageSize=1] 每页条数
 * @returns {Promise}
 */
const checkOrderHistory = data => http.get('/my/orders/all', data)

export default {
  createOrder,
  checkOrder,
  checkOrderHistory
}
