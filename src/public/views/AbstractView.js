export default class {
  constructor(params, template) {
    this.params = params
    this.template = template
  }
  /**
   *
   * @param {string} title
   */
  setTitle(title) {
    document.title = title
  }

  async getHtml() {
    return this.template
  }
}
