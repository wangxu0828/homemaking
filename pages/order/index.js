import Order from "../../model/order";

// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: {},
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const service = JSON.parse(options.service)
    this.setData({
      service
    })
  },

  async handleSelectAddress() {
    const address = await wx.chooseAddress();
    this.setData({
      address
    })
  },

  async handleOrder() {
    if (this.data.service.designated_place === 0 && Object.keys(this.data.address).length === 0) {
      wx.showModal({
        title: '错误',
        title: '该服务必须指定服务地点',
        showCancel: false
      });
      return
    }

    const res = await wx.showModal({
      title: '注意',
      content: '是否确认预约该地址'
    })

    if (!res.confirm) {
      return
    }

    wx.showLoading({
      title: '正在预约',
      mask: true,
    });
    try {
      Order.createOrder(this.data.service.id, this.data.address)
      wx.navigateTo({
        url: '/pages/order-success/index',
      });

    } catch (error) {
      wx.showModal({
        title: '错误',
        content: '预定订单失败,请稍后重试',
        showCancel: false,
      });

    }
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})