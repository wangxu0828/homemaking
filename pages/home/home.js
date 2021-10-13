import Service from '../../model/service'

const service = new Service()

Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    currentTabNumber: 0,
    categoryList: [
      {
        "id": 1,
        "name": "保洁"
      },
      {
        "id": 2,
        "name": "汽修"
      },
      {
        "id": 3,
        "name": "疏通"
      }
    ]
  },
  // 微信小程序钩子函数
  onLoad() {
    this._getServiceList()
  },
  // 获取服务列表
  _getServiceList() {
    service.getServiceList({ page: 1, count: 10 })
  },
  handleCategoryChange(e) {
    console.log(e.currentTarget.dataset.id);
  },
  handlerTabChange(e) {
    console.log(e);
  }
})
