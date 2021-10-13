import Http from '../utils/http'
class Service {
  getServiceList({ page, count, category_id = null, type = null }) {
    return Http.request({
      url: 'v1/service/list',
      data: {
        page: page,
        count,
      },
    })
  }
}

export default Service
