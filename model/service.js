import Http from '../utils/http'
import Base from './base'
class Service extends Base {
  
  async getServiceList(category_id = null, type = null) {
    if (!this.serviceFlag) {
      return this.serviceList
    }
    const res = await Http.request({
      url: 'v1/service/list',
      data: {
        page: this.page,
        count: this.count,
        category_id: category_id || '',
        type: type || '',
      },
    })

    this.service = res
    if (this.service.last_page === this.page) {
      this.serviceFlag = false
    }

    this.page += 1
    this.serviceList = [...this.serviceList, ...this.service.data]
    return this.serviceList
  }

  

  static getServiceById(serviceId) {
    return Http.request({
      url: 'v1/service/' + serviceId,
    })
  }
}

export default Service
