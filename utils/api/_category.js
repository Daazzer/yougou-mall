import http from '../http'

const getCategories = () => http.get('/categories')

export default {
  getCategories
}
