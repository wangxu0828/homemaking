import FileUploader from "../../utils/file-uploader"

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
      value: 1
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
    // 预览图片事件
    handlePreview(e) {
      this.triggerEvent('hidepage')
      const index = e.currentTarget.dataset.index
      const urls = this.data._files.map(item => item.path)
      wx.previewImage({
        urls: urls,
        current: urls[index]
      })
    },
    // 删除图片事件
    handleDelete(e) {
      const index = e.currentTarget.dataset.index
      const deleted = this.data._files.splice(index, 1)

      this.setData({
        _files: this.data._files
      })

      this.triggerEvent('delete', { index, item: deleted[0] })
    },
    // 选择图片事件
    async handleChooseImage() {
      this.triggerEvent('hidepage')
      // 选择图片事件
      const res = await wx.chooseImage({
        count: this.data.maxCount,
        sizeType: this.data.sizeType,
        sourceType: this.data.sourceType,
      });
      const _files = this._fileFilter(res.tempFiles)
      this.setData({
        _files: _files
      })

      // 再做一层过滤,将状态位上传中的图片给过滤出来
      const uploadTask = _files.filter(item => item.status === this.data.uploadStatusEnum.UPLOADING)
      // 真正的上传操作
      this._executeUpload(uploadTask)
    },

    // 对选中的图片做筛选,对大小进行判断,
    _fileFilter(tempFiles) {
      const res = []
      tempFiles.forEach((item, index) => {
        let error = ''
        if (item.size > (1024 * 1024 * this.data.size)) {
          error == `图片大小不能超过${this.data.size}M`
          this.triggerEvent('validateFail', { item, error })
        }

        const length = this.data._files.length

        res.push({
          id: null,
          key: index + length + '',
          path: item.path,
          status: error ? this.data.uploadStatusEnum.ERROR : this.data.uploadStatusEnum.UPLOADING,
          error
        })
      })
      return [...this.data._files, ...res]
    },

    // 上传操作具体
    async _executeUpload(uploadTask) {
      const success = []
      for (const file of uploadTask) {
        try {
          const res = await FileUploader.upload(file.path, file.key)
          file.id = res[0].id
          file.url = res[0].path
          file.status = this.data.uploadStatusEnum.SUCCESS
          this.data._files[file.key] = file
          success.push(file)
        } catch (e) {
          file.status = this.data.uploadStatusEnum.ERROR
          file.error = e
          this.data._files[file.key] = file
          this.triggerEvent('uploadfail', { file, error: e })
        }
      }
      this.setData({
        _files: this.data._files
      })
      if (success.length) {
        this.triggerEvent('uploadsuccess', { files: success })
      }
    }
  },

}

Component(componentOptions)
