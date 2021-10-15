const componentOptions = {
  // 组件选项
  options: {
    multipleSlots: true,
  },
  behaviors: [],
  properties: {
    avatar: String,
    nickname: String,
    size:{
      type:String,
      value:"120"
    },
    // 展示文本的字体大小
    fontSize: {
      type: String,
      value: '28'
    },
    // 头像形状
    shape: {
      type:String,
      value: 'square'
    },
    // 头像边框半径，当 shape 等于 circle 时这个配置无效
    radius: {
      type: String,
      value: '0'
  },
  },
  // 组件数据
  data: {
    isPageHidden: false, // 页面是否处于隐藏状态
  },
  // 数据监听器
  observers: {},
  // 组件方法
  methods: {
    init() {},
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
