import http from '../http'

/**
 * 获取商品列表搜索
 * @param {Object} [data] 参数对象
 * @param {string} [data.query] 关键字
 * @param {string} [data.cid] 分类id
 * @param {number} [data.pagenum] 页码
 * @param {number} [data.pagesize] 页容量
 * @returns {Promise}
 */
const getGoodsList = data => http.get('/goods/search', data)
/**
 * 获取商品详情
 * @param {Object} data 参数对象
 * @param {number} data.goods_id 商品id
 * @returns {Promise}
 */
const getGoodsDetail = data => http.get('/goods/detail', data)
/**
 * 商品搜索
 * @param {Object} data 参数对象
 * @param {number} data.query 关键字
 * @returns {Promise}
 */
const getGoodsSearch = data => http.get('/goods/qsearch', data)

export default {
  getGoodsList,
  getGoodsDetail,
  getGoodsSearch
}
