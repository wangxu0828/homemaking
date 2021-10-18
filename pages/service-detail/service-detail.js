import Service from '../../model/service'
import User from '../../model/user'
import Rating from '../../model/rating'
import serviceType from '../../enum/service-type'
import ServiceStatus from '../../enum/service-status'
const rating = new Rating()
Page({
  data: {
    serviceId: '',
    service: {},
    isPulisher: false,
    ratingList: [],
    serviceTypeEnum: serviceType,
    serviceStatusEnum: ServiceStatus,
  },
  async onLoad(options) {
    const serviceId = options.serviceid
    this.setData({
      serviceId,
    })
    // 获取当前页面服务
    await this._getServiceById()
    await this._getRatingList()
    this._checkRole()
  },

  async _getServiceById() {
    const service = await Service.getServiceById(this.data.serviceId)
    this.setData({
      service,
    })
  },

  _checkRole() {
    const userInfo = User.getUserInfoByLocal()
    if (userInfo && userInfo.id === this.data.service.publisher.id) {
      this.setData({
        isPulisher: true
      })
    }
  },

  async _getRatingList() {
    const res = await rating.reset().getRatingList(this.data.serviceId)
    this.setData({
      ratingList: res
    })
  }
})
