const componentOptions = {
  // 组件选项
  options: {
    multipleSlots: true, //默认情况下,一个组件的wxml中只能有一个slot.需要使用多solt时,可以在组件js中声明启用
  },
  behaviors: [],
  properties: {
    tabs: {
      type: Array,
      value: [],
    },
  },
  // 组件数据
  data: {
    isPageHidden: false, // 页面是否处于隐藏状态
    currentTabNumber: 0,
  },
  // 数据监听器
  observers: {},
  // 组件方法
  methods: {
    init() {},
    handlerTabChange(event) {
      if (this.data.currentTabNumber === event.currentTarget.dataset.index) {
        return
      }

      this.setData({
        currentTabNumber: event.currentTarget.dataset.index,
      })
      this.triggerEvent('handlerTabChange', event.currentTarget.dataset.index)
    },
    handleTouch(e) {
      let targetTabNumber = e.direction + this.data.currentTabNumber
      let event = {
        currentTarget: {
          dataset: {
            index: targetTabNumber,
          },
        },
      }
      if (targetTabNumber < 0 || targetTabNumber > this.data.tabs.length - 1) {
        return
      }
      this.handlerTabChange(event)
    },
  },
  // 组件生命周期
  lifetimes: {
    created() {},
    attached() {
      this.init()
    },
    ready() {},
    moved() {},
    detached() {},
  },
  definitionFilter() {},
  // 页面生命周期
  pageLifetimes: {
    // 页面被展示
    show() {
      const { isPageHidden } = this.data

      // show事件发生前，页面不是处于隐藏状态时
      if (!isPageHidden) {
        return
      }

      // 重新执行定时器等操作
    },
    // 页面被隐藏
    hide() {
      this.setData({
        isPageHidden: true,
      })

      // 清除定时器等操作
    },
    // 页面尺寸变化时
    resize() {},
  },
}

Component(componentOptions)
