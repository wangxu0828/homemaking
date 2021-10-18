import Token from './token'

class User {
  static getUserInfoByLocal() {
    return wx.getStorageSync('user-info')
  }

  static async login() {
    const token = await Token.getToken()
    console.log(token)
    wx.setStorageSync('token', token)
  }
}

export default User
