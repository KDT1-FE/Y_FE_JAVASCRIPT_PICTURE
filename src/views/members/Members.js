import AbstractView from '../AbstractView.js'
import addTemplate from '../components/addForm.hbs'
import editTemplate from '../components/editForm.hbs'

import { compile } from 'handlebars'
export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Members')
  }

  async getContent() {
    const add = addTemplate()
    const edit = editTemplate()
    return /* HTML */ `
      ${add} ${edit}
      <div class="members__container container">
        <h2 class="members__title pb-2 border-bottom">Members</h2>
        <div class="members__wrap">
          <div class="members__contents p-3">
            <div class="members__contents__header">
              <h6 class="members__contents__title">Members workspace</h6>
              <button type="button" id="openModal-btn" class="btn btn-sm btn-pink members__modal-btn" data-bs-target="#myModal">Add member</button>
            </div>
            <hr class="members-hr" />
          </div>
        </div>
      </div>
    `
  }
}
