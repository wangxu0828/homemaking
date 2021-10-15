import Http from '../utils/http'
import Base from './base'

class Rating extends Base{
  
 async getRatingList(serviceId) {
    if (!this.serviceFlag) {
      return this.serviceList
      }
      const res = await Http.request({
        url: 'v1/rating/service',
        data: {
          page: this.page,
          count: this.count,
          service_id: serviceId
        },
      })

      this.service = res
      console.log(res);
      if (this.service.last_page === this.page) {
        this.serviceFlag = false
      }

      this.page += 1
      this.serviceList = [...this.serviceList, ...this.service.data]
      return this.serviceList
    }
}

export default Rating