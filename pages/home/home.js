Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    currentTabNumber: 0,
  },
  handlerTabChange(event) {
    this.setData({
      currentTabNumber: event.currentTarget.dataset.index,
    })
  },
})
