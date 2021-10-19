import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import cache from '../enum/cache'
import User from '../model/user'
import wxToPromise from './wx'
class http {
  static async request({ url, data, method = 'GET', refresh = true }) {
    let res
    try {
      res = await wxToPromise('request', {
        url: APIConfig.baseUrl + url,
        data,
        method,
        header: {
          token: wx.getStorageSync(cache.TOKEN)
          // token: '32131232131231232'

        }
      })
    } catch (error) {

    }
    // 全局的响应处理
    // 请求成功
    if (res.statusCode < 400) {
      return res.data.data
    }
    if (res.statusCode === 401) {
      // TODO 令牌相关操作
      if (res.error_code === 10001) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
        throw Error('请求位携带令牌')
      }
      console.log(refresh);
      if (refresh) {
        return http._refresh({ url, data, method, refresh })
      }
    }
    // 接口错误信息,一定要看清楚文档,哪些适合适合展示,那些不合适
    http._showError(res.data.error_code, res.data.message)
    // 在这里我们将请求的失败变成一个异常,可以中断后续代码的执行
    // const error = typeof res.data.message === 'object' ? Object.values(res.data.message).join(';') : res.data.message
    const error = http._Error(res.data.message)
    throw Error(error)
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

  static _Error(message) {
    return typeof message === 'object' ? Object.values(message).join(';') : message
  }

  static async _refresh({ url, data, method = 'GET', refresh }) {
    await User.login()
    refresh = false
    await http.request({ url, data, method, refresh })
  }
}

export default http
