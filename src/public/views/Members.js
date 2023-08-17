import AbstractView from './AbstractView.js'

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle = 'Members'
  }

  async getContent() {
    return /* HTML */ `
      <div class="members__container container">
        <div class="members__title d-flex align-items-center p-3 my-3 rounded">
          <div class="lh-1">
            <h1 class="h3 mb-0 lh-1">Members</h1>
          </div>
        </div>
        <div class="members__contents p-3">
          <h6 class="members__contents__title">Members workspace</h6>
        </div>
      </div>
    `
  }
}
