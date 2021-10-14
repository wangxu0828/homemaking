import Service from '../../model/service'
Page({
  data: {
    serviceId: '',
    service: {},
  },
  onLoad(options) {
    const serviceId = options.serviceid
    this.setData({
      serviceId,
    })

    // 获取当前页面服务
    this._getServiceById()
  },

  async _getServiceById() {
    const service = await Service.getServiceById(this.data.serviceId)
    console.log(service)
    this.setData({
      service,
    })
  },
})
