import http from '../http'

const getSwiperdata = () => http.get('/home/swiperdata')

const getCateItems = () => http.get('/home/catitems')

const getRecommeds = () => http.get('/home/floordata')

export default {
  getSwiperdata,
  getCateItems,
  getRecommeds
}
