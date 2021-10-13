import Service from '../../model/service'
import Category from '../../model/category'
const service = new Service()

Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    currentTabNumber: 0,
    categoryList: [
      {
        id: 1,
        name: '保洁',
      },
      {
        id: 2,
        name: '汽修',
      },
      {
        id: 3,
        name: '疏通',
      },
    ],
    ServiceList: [],
  },
  // 微信小程序钩子函数
  onLoad() {
    this._getServiceList()
    this._getcategoryList()
  },
  // 获取服务列表
  async _getServiceList() {
    const res = await service.getServiceList({ page: 1, count: 10 })
    this.setData({
      ServiceList: res.data,
    })
    console.log(this.data.ServiceList)
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
  handleCategoryChange(e) {
    console.log(e.currentTarget.dataset.id)
  },
  handlerTabChange(e) {},
})
