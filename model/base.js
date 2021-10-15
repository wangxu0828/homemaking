class Base {
  page = 1
  count = 7
  service = {}
  serviceList = []
  serviceFlag = true

  reset() {
    this.page = 1
    this.count = 7
    this.serviceFlag = true
    this.serviceList = []
    this.service = {}
    return this
  }
}

export default Base