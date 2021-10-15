import Service from '../../model/service'
import User from '../../model/user'
import Rating from '../../model/rating'
const rating = new Rating()
Page({
  data: {
    serviceId: '',
    service: {},
    isPulisher: false,
    ratingList: []
  },
  async onLoad(options) {
    const serviceId = options.serviceid
    this.setData({
      serviceId,
    })

    // 获取当前页面服务
    await this._getServiceById()

    this._checkRole()

    await this._getRatingList()
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

    if (userInfo && userInfo.id === this.data.service.publisher.id) {
      this.setData({
        isPulisher: true
      })
    }
  },

  async _getRatingList() {
    const res = await rating.getRatingList(this.data.serviceId)
    this.setData({
      ratingList: res
    })
  }
})
