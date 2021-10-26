import Service from "../../model/service";

Page({
  data: {
    formData: {
      type: null,
      title: '',
      category_id: null,
      cover_image: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_data: '',
      price: '',
    }
  },
  async handleSubmit(e) {
    const res = wx.showModal({
      title: '提示',
      content: '是否确认申请发布该服务',
      showCancel: true,
    });

    if (!res.confirm) {
      return
    }

    wx.showToast({
      title: '正在发布',
      mask: true
    })
    const formData = e.detail.formData
    try {
      await Service.publishService(formData)
      this._resetForm()
      wx.navigateTo({
        url: `/pages/publisher-success/index?type=${formData.type}`
      })
    } catch (error) {
      console.log(error);
    }
    wx.hideLoading();

  },

  _resetForm() {
    const formData = {
      type: null,
      title: '',
      category_id: null,
      cover_image: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_data: '',
      price: '',
    }

    this.setData({
      formData
    })
  }
})