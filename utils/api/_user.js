import http from '../http'

/**
 * 获取用户token
 * 对应参数需要微信登录 api 获取
 * @param {Object} data 参数对象
 * @param {string} data.encryptedData 包括敏感数据在内的完整用户信息的加密数据
 * @param {string} data.rawData 不包括敏感信息的原始数据字符串，用于计算签名
 * @param {string} data.iv 加密算法的初始向量
 * @param {string} data.signature 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
 * @param {string} data.code 用户登录凭证（有效期五分钟）
 * @returns {Promise}
 */
const getToken = data => http.post('/users/wxlogin', data)

export default {
  getToken
}
