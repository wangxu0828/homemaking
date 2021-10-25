
class FileUploader{
  static async upload(filePath, key="file") {
    let res
    try {
      res = await wxToPromise('uploadFile', {
        url:APIConfig.baseUrl + '/v1/file',
        filePath:filePath,
        name:key
      })
    } catch (error) {
      wx.showToast({
        title: '上传文件失败',
        icon: 'none',
        duration: 1500,
      });
      throw new Error(error.errMsg)
    }

    const serverData = JSON.parse(res.data)

    if(res.statusCode !== 201) {
      wx.showToast({
        title: serverData.message,
        icon: 'none',
        duration: 1500,
      });
    }
    return serverData.data
  }
}

export default FileUploader