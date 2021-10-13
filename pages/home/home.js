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
  handleCategoryChange(e) {
    console.log(e.currentTarget.dataset.id);
  },
  handlerTabChange(e) {
    console.log(e);
  }
})
