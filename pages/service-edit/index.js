import Service from "../../model/service"

const pageOptions = {
  // 页面数据
  data: {
    formData: {},
    serviceId: ''
  },
  // 页面载入时
  onLoad(e) {
    const service = JSON.parse(e.service)
    console.log(service);
    this._init(service)
  },
  // 页面初始化
  _init(service) {
    const formData = {
      type: service.type,
      title: service.title,
      category_id: service.category.id,
      description: service.description,
      designated_place: service.designated_place,
      cover_image: service.cover_image,
      begin_date: service.begin_date,
      end_date: service.end_date,
      price: service.price
    }
    this.setData({
      formData,
      serviceId: service.id
    })
  },
  // 页面准备好时
  onReady() { },
  // 页面显示时
  onShow() {
    const { isFirstOnShow } = this.data

    if (isFirstOnShow) {
      // 首次执行时
      this.setData({
        isFirstOnShow: false,
      })
      return
    }
  },
  // 页面隐藏时
  onHide() { },
  // 页面卸载时
  onUnload() { },
  // 下拉页面时
  onPullDownRefresh() { },
  // 到达页面底部时
  onReachBottom() { },
  // 页面滚动时
  onPageScroll() { },
  // 分享时，注：onShareAppMessage不能为async异步函数，会导致不能及时取得返回值，使得分享设置无效
  onShareAppMessage() {
    /* const title = ''
    const path = ''
    const imageUrl = ``

    return {
      title,
      path,
      imageUrl,
    } */
  },
  async handleSubmit(e) {
    const res = await wx.showModal({
      title: '提示',
      content: '是否确认修改该服务?提交后会进入审核状态',
      showCancel: true,
    });
    console.log(res.confirm);
    if (!res.confirm) {
      return
    }

    wx.showToast({
      title: '正在发布',
      mask: true
    })
    const formData = e.detail.formData
    try {
      console.log(312321);
      await Service.editService(this.data.serviceId, formData)
      this._resetForm()
      wx.redirectTo({
        url: `/pages/publisher-success/index?type=${formData.type}`
      })
    } catch (error) {
      console.log(error);
    }
    wx.hideLoading();
  }
}

Page(pageOptions)
