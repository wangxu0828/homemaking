const componentOptions = {
  // 组件选项
  options: {
    multipleSlots: true,
  },
  behaviors: [],
  properties: {
    // 默认展示的图片文件
    files: {
      type: Array,
      value: []
    },
    // 最大上传图片数量
    maxCount: {
      type: Number,
      value: 4
    },
    // 单个图片文件大小限制，单位 M
    size: {
      type: Number,
      value: 2
    },
    // 可选图片大小类型，original：原图，compressed：压缩图
    // 默认都可以
    sizeType: {
      type: Array,
      value: ['original', 'compressed']
    },
    // 可选图片来源，album: 从相册选图, camera：使用相机
    // 默认都可以
    sourceType: {
      type: Array,
      value: ['album', 'camera']
    },
  },
  // 组件数据
  data: {
    uploadStatusEnum: {
      ERROR: 0,
      UPLOADING: 1,
      SUCCESS: 2
    },
    _files: []
  },
  // 数据监听器
  observers: {
    files(newValue) {
      if (!newValue.length) {
        return
      }
      const _files = []
      newValue.forEach((item, index) => {
        const file = {
          id: item.id,
          key: index + '',
          path: item.path,
          status: this.data.uploadStatusEnum.SUCCESS,
          error: ''
        }
        _files.push(file)
      })
      this.setData({
        _files
      })
    }
  },
  // 组件方法
  methods: {
    init() { },
  },
  // 组件生命周期
  lifetimes: {
    created() { },
    attached() {
      this.init()
    },
    ready() { },
    moved() { },
    detached() { },
  },
  definitionFilter() { },
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
    resize() { },
  },
}

Component(componentOptions)
