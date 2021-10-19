import APIConfig from '../config/api'
import Http from '../utils/http'

class Token {
  static async getToken() {
    const res = await Http.request({
      url: 'v1/token',
      data: {
        order_no: APIConfig.order_no,
        i_code: APIConfig.icode,
      },
      method: 'Post',
    })

    return res.token
  }
}

export default Token
