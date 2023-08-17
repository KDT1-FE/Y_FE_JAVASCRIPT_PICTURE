import AbstractView from '../AbstractView.js'
import modalTemplate from '../components/modalForm.hbs'
import { compile } from 'handlebars'
export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Members')
  }

  async getContent() {
    const title = 'Add member'
    // Handlebars 템플릿 렌더링
    const modal = modalTemplate({ title: title })

    return /* HTML */ `
      ${modal}
      <div class="members__container container">
        <div class="members__title d-flex align-items-center p-3 my-3 rounded">
          <div class="lh-1">
            <h1 class="h3 mb-0 lh-1">Members</h1>
          </div>
        </div>
        <div class="members__contents p-3">
          <div class="members__contents__header">
            <h6 class="members__contents__title">Members workspace</h6>
            <button type="button" id="openModal-btn" class="btn btn-sm btn-pink members__modal-btn" data-bs-target="#myModal">Add member</button>
          </div>
          <hr class="members-hr" />
        </div>
      </div>
    `
  }
}
