import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'
class http {
  static async request({ url, data, method = 'GET' }) {
    const res = await wxToPromise('request', {
      url: APIConfig.baseUrl + url,
      data,
      method,
    })
    // 全局的响应处理
    // 请求成功
    if (res.statusCode < 400) {
      return res.data.data
    }
    if (res.statusCode === 401) {
      // TODO 令牌相关操作
      return
    }
    // 接口错误信息,一定要看清楚文档,哪些适合适合展示,那些不合适
    http._showError(res.data.error_code, res.data.message)
  }

  static _showError(code, message) {
    let title = ''
    const errorMessage = exceptionMessage[code]
    title = errorMessage || message || '未知异常'

    title = typeof title === 'object' ? Object.values(title).join(';') : title

    wx.showToast({
      title,
      icon: 'none',
      duration: 3000,
    })
  }
}

export default http
