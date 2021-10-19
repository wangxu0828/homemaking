import User from "../../model/user";

Page({


  // 授权登录
  async handleLogin() {
    const res = await wx.getUserProfile({
      desc: '完善用户信息',
    })
    // 异常会中断后续代码的执行
    // 错误不会中断后续代码的执行
    wx.showLoading({
      title: '正在授权',
      mask: true,
    })

    try {
      await User.login()
      // 每次登录之后,将用户信息更新一下
      await User.updateUserInfo(res.userInfo)
      const events = this.getOpenerEventChannel()
      events.emit('login')
      wx.navigateBack();
    } catch (error) {
      wx.showModal({
        title: '注意',
        content: '登录失败,请稍后重试',
        showCancel: false,
      });
      console.log(error);
    }
    wx.hideLoading()

  },

  handleToHome() {
    wx.switchTab({
      url: '/pages/home/home',
    });

  }
})
