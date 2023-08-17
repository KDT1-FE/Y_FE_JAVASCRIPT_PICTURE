import AbstractView from '../AbstractView.js'

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Profile')
  }

  async getContent() {
    return /* HTML */ ``
  }
}
