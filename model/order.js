// 订单模型
import Http from '../utils/http'
class Order {
  static createOrder(service_id, address) {
    return Http.request({
      url: "v1/order",
      data: {
        service_id,
        address
      },
      method: 'POST'
    })
  }
}

export default Order