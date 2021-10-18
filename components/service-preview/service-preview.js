import serviceType from "../../enum/service-type";

Component({
  data: {
    serviceTypeEnum: serviceType
  },
  properties: {
    service: {
      type: Object,
      default: {},
    },
  },
  methods: {},
})
