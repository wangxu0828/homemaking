import http from '../utils/http'

class Category {
  static getCategoryList() {
    return http.request({
      url: 'v1/category',
    })
  }
}

export default Category
