import AbstractView from '../AbstractView.js'
const headerTemplate = require('../components/header.hbs')
const footerTemplate = require('../components/footer.hbs')

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Dashboard')
  }

  async init() {}

  async getHtml() {
    const header = headerTemplate()
    const footer = footerTemplate()

    // 렌더링된 HTML 반환
    return `
      ${header}

      ${footer}
    `
  }
}
