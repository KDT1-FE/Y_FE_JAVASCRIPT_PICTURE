import AbstractView from '../AbstractView.js'

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Teams')
  }

  async getContent() {
    return /* HTML */ `
      <div class="teams__container container" id="custom-cards">
        <h2 class="teams__title pb-2 border-bottom">Teams</h2>
        <div class="teams__contents row row-cols-1 row-cols-md-2 g-4"></div>
      </div>
    `
  }
}
