import Service from '../../model/service'
import Category from '../../model/category'
import { throttle } from '../../utils/utils'
const service = new Service()

Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    categoryList: [],
    ServiceList: [],
    currentTabId: null,
    currentCategoryId: null,
    loading: true,
  },
  // 微信小程序钩子函数
  async onLoad() {
    await this._getServiceList()
    await this._getcategoryList()
    this.setData({
      loading: false,
    })
  },
  // 获取服务列表
  async _getServiceList() {
    const res = await service
      .reset()
      .getServiceList(this.data.currentCategoryId, this.data.currentTabId)
    this.setData({
      ServiceList: res,
    })
  },
  // 获取分类列表
  async _getcategoryList() {
    const categoryList = await Category.getCategoryList()
    categoryList.unshift({
      id: 0,
      name: '全部',
    })
    this.setData({
      categoryList: categoryList,
    })
  },
  handleCategoryChange: throttle(function (e) {
    this.data.currentCategoryId = e.currentTarget.dataset.id
    this._getServiceList()
  }, 1000),

  handlerTabChange: throttle(function (e) {
    this.data.currentTabId = e.detail
    this._getServiceList()
  }, 1000),

  handleSelectService(e) {
    const serviceid = e.currentTarget.dataset.serviceid
    wx.navigateTo({
      url: '/pages/service-detail/service-detail?serviceid=' + serviceid,
    })
  },
  // 上拉触底生命周期函数
  async onPullDownRefresh() {
    // const res =await service.reset().getServiceList()
    // console.log(res);
    // this.setData({
    //   ServiceList: res,
    // })
    this._getServiceList()
    wx.stopPullDownRefresh()
  },
  // 下拉触底生命周期函数
  async onReachBottom() {
    const res = await service.getServiceList()
    this.setData({
      ServiceList: res,
    })
  },
})
