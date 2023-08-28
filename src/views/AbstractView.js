import headerTemplate from './components/header.hbs'
import footerTemplate from './components/footer.hbs'

export default class {
  constructor(params) {
    this.params = params
  }
  /**
   *
   * @param {string} title
   */
  setTitle(title) {
    document.title = title
  }

  async getHtml() {
    const header = headerTemplate()
    const content = await this.getContent()
    const footer = footerTemplate()

    return /*html*/ `
      ${header}
      ${content}
      ${footer}
    `
  }
  async getContent() {
    throw new Error('getContent() method must be overridden')
  }
}
