import User from '../../model/user'

Page({
  async handleLogin() {
    const res = await wx.getUserProfile({
      desc: '完善用户信息',
    })
    console.log(res)

    wx.showLoading({
      title: '正在授权',
      mask: true,
    })

    await User.login()
    wx.hideLoading()
  },
})
