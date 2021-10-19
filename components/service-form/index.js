import serviceType from '../../enum/service-type'
const componentOptions = {
  // 组件选项
  options: {
    multipleSlots: true,
  },
  behaviors: [],
  properties: {
    form: Object
  },
  // 组件数据
  data: {
    typeList: [
      {
        id: serviceType.PROVIDE,
        name: '提供服务'
      },
      {
        id: serviceType.SEEK,
        name: '找服务'
      }
    ],
    typePickerIndex: null
  },
  methods: {
    _init() {

    },
  },
  lifetime: {
    attached() {
      this._init()
    }
  }
}

Component(componentOptions)
