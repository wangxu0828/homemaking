/**
 * 将小程序原生api转换为promise
 * @param {*} method 方法
 * @param {*} option 参数
 * @returns
 */
export default function wxToPromise(method, option) {
  return new Promise((resolve, reject) => {
    option.success = resolve
    option.fail = (err) => {
      console.log(err)
    }

    wx[method](option)
  })
}
