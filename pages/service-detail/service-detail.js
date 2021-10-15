import Service from '../../model/service'
import User from '../../model/user'
Page({
  data: {
    serviceId: '',
    service: {},
    isPulisher:false
  },
 async onLoad(options) {
   const serviceId = options.serviceid
    this.setData({
      serviceId,
    })

    // 获取当前页面服务
    await this._getServiceById()

    this._checkRole()
  },

  async _getServiceById() {
    const service = await Service.getServiceById(this.data.serviceId)
    console.log(service)
    this.setData({
      service,
    })
  },

  _checkRole() {
    const userInfo = User.getUserInfoByLocal()
   
    if(userInfo && userInfo.id === this.data.service.publisher.id) {
      this.setData({
        isPulisher:true
      })
    }
  }
})
