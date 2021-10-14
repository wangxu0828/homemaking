import Http from '../utils/http'
class Service {

  page = 1
  count = 7
  service={}
  serviceList = []
  serviceFlag = true
 async getServiceList(category_id = null, type = null) {
   console.log(category_id,type);
    if(!this.serviceFlag) {
      return this.serviceList
    }
    const res = await Http.request({
      url: 'v1/service/list',
      data: {
        page: this.page,
        count: this.count,
        category_id:category_id || '',
        type:type || ''
      },
    })
    
    this.service = res
    if(this.service.last_page===this.page) {
      this.serviceFlag=false
    }

    this.page += 1
    this.serviceList = [...this.serviceList, ...this.service.data]
    return this.serviceList
  }

  reset() {
    this.page = 1
    this.count= 7
    this.serviceFlag = true
    this.serviceList = []
    this.service = {}
    return this
  }
}

export default Service
