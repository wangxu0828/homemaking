import serviceType from '../../enum/service-type'
import Category from '../../model/category'
const moment = require('../../lib/moment')
const componentOptions = {
  // 组件选项
  options: {
    multipleSlots: true,
  },
  behaviors: [],
  observers: {
    form(newValue) {
      if (!newValue) {
        return
      }
      this._init()
    }
  },
  properties: {
    form: Object,
  },
  // 组件数据
  data: {
    typeList: [
      {
        id: serviceType.PROVIDE,
        name: '提供服务',
      },
      {
        id: serviceType.SEEK,
        name: '找服务',
      },
    ],
    typePickerIndex: null,
    categoryList: [],
    categoryPickerIndex: null,
    formData: {
      type: null,
      title: '',
      category_id: null,
      cover_image_id: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_data: '',
      price: '',
    },
    rules: [
      {
        name: 'type',
        rules: { required: true, message: '请指定服务类型' },
      },
      {
        name: 'title',
        rules: [
          { required: true, message: '服务标题内容不能为空' },
          { minlength: 5, message: '服务描述内容不能少于 5 个字' },
        ],
      },
      {
        name: 'category_id',
        rules: { required: true, message: '未指定服务所属分类' },
      },
      {
        name: 'cover_image_id',
        rules: { required: true, message: '请上传封面图' },
      },
      {
        name: 'description',
        rules: [
          { required: true, message: '服务描述不能为空' },
          { minlength: 20, message: '服务描述内容不能少于 20 个字' },
        ],
      },
      {
        name: 'begin_date',
        rules: [
          { required: true, message: '请指定服务有效日期开始时间' },
        ],
      },
      {
        name: 'end_date',
        rules: [
          { required: true, message: '请指定服务有效日期结束时间' },
          {
            validator: function (rule, value, param, models) {
              if (moment(value).isSame(models.begin_date) || moment(value).isAfter(models.begin_date)) {
                return null
              }
              return '结束时间必须大于开始时间'
            }
          }
        ],

      },
      {
        name: 'price',
        rules: [
          { required: true, message: '请指定服务价格' },
          {
            validator: function (rule, value, param, models) {
              const pattern = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
              const isNum = pattern.test(value);

              if (isNum) {
                return null
              }
              return '价格必须是数字'
            }
          },
          { min: 1, message: '天下没有免费的午餐' },
        ],
      },
    ],
    error: null
  },
  methods: {
    async _init() {
      const typePickerIndex = this.data.typeList.findIndex(
        item => this.data.form.type === item.id,
      )
      //获取分类列表
      const categoryList = await Category.getCategoryList()
      console.log(categoryList);

      const categoryPickerIndex = categoryList.findIndex((item) => {
        item.id === this.data.form.category_id
      })

      this.setData({
        typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
        files: this.data.form.cover_image ? [this.data.form.cover_image] : [],
        formData: {
          type: this.data.form.type,
          title: this.data.form.title,
          category_id: this.data.form.category_id,
          cover_image_id: this.data.form.cover_image
            ? this.data.form.cover_image.id
            : null,
          description: this.data.form.description,
          designated_place: this.data.form.designated_place,
          begin_date: this.data.form.begin_date,
          end_date: this.data.form.end_date,
          price: this.data.form.price,
        },
        categoryList,
        categoryPickerIndex:
          categoryPickerIndex !== -1 ? categoryPickerIndex : null,
      })
    },

    handleTypeChange(e) {
      const index = e.detail.value
      this.setData({
        typePickerIndex: index,
        // 对一个对象里面指定的属性做数据绑定
        ['formData.type']: this.data.typeList[index].id,
      })
    },

    handleInput(e) {
      const field = e.currentTarget.dataset.field
      const value = e.detail.value
      this.setData({
        [`formData.${field}`]: value,
      })
    },

    handleCategoryChange(e) {
      const index = e.detail.value
      this.setData({
        categoryPickerIndex: index,
        // 对一个对象里面指定的属性做数据绑定
        ['formData.category_id']: this.data.categoryList[index].id,
      })
    },

    handleSwitchChange(e) {
      const res = e.detail.value;
      this.setData({
        ['formData.designated_place']: res
      })
    },

    handleBeginDateChange() {
      const beginDate = e.detail.value;
      this.setData({
        ['formData.begin_date']: endDate
      })
    },

    handleEndDateChange() {
      const endDate = e.detail.value;
      this.setData({
        ['formData.end_date']: endDate
      })
    },

    submit() {
      // console.log(this.data.formData);
      this.selectComponent('#form').validate((valid, errors) => {
        console.log(valid, errors);
        if (!valid) {
          const errMsg = errors.map(item => item.message)
          this.setData({
            error: errMsg.join(';')
          })
          return
        }
        this.triggerEvent('submit', { formData: this.data.formData })
      })
    },

    handleUploadSuccess(e) {
      const id = e.detail.files[0].id
      this.setData({
        ['formData.cover_image_id']: id
      })
    }
  },
  lifetimes: {
    // attached() {
    //   this._init()
    // },
  },
}

Component(componentOptions)
