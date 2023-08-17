import AbstractView from '../AbstractView.js'

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Detail')
  }

  async getHtml() {
    return /* HTML */ ` <div class="members">
      <div class="members__container container">
        <div class="members__title d-flex align-items-center p-3 my-3 rounded">
          <div class="lh-1">
            <h1 class="h3 mb-0 lh-1">Member Profile</h1>
          </div>
        </div>
        <div class="member__contents">
          <!-- 폼 수정 -->
          <form class="updateform needs-validation" novalidate="" id="updateForm">
            <h6 class="member__contents__title">Profile Card</h6>
            <div class="member__row row" data-id="0UwQLEkKWKjFzMieZc2Z">
              <div class="member__col-l col-md-5 col-lg-3 order-md-first">
                <div class="member__image">
                  <label for="image" class="updateform-img">
                    <img id="previewImage" class="hidden" alt="Preview" />
                  </label>
                  <input type="file" class="input-file" id="image" accept="image/*" style="display: none" disabled />
                </div>
              </div>
              <div class="member__col-r col-md-7 col-lg-8">
                <div class="member__row__wrap row">
                  <div class="col">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control-plaintext" id="name" name="name" placeholder="Name" required="" readonly />
                    <div class="invalid-feedback">이름을 입력해주세요.</div>
                  </div>

                  <div class="col-12">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control-plaintext" id="email" name="email" placeholder="you@example.com" readonly />
                    <div class="invalid-feedback">이메일을 입력해주세요.</div>
                  </div>

                  <div class="col-md">
                    <label for="Team" class="form-label">Team <span class="text-muted">(Optional)</span></label>
                    <input type="text" class="form-control-plaintext" id="team" name="team" placeholder="Team" readonly />
                    <div class="invalid-feedback">팀 이름을 입력해주세요.</div>
                  </div>

                  <div class="col-md">
                    <label for="Position" class="form-label">Position <span class="text-muted">(Optional)</span></label>
                    <select class="form-select-plaintext" id="position" name="position" form="updateForm" disabled>
                      <option selected disabled value="">Choose...</option>
                      <option value="FE">FE</option>
                      <option value="BE">BE</option>
                      <option value="UIUX">UIUX</option>
                      <option value="PM">PM</option>
                    </select>
                    <div class="invalid-feedback">포지션을 선택해주세요.</div>
                  </div>
                </div>

                <hr class="my-4" />

                <div class="member__btnbox">
                  <button type="submit" class="btn btn-danger">Remove</button>
                  <button type="submit" class="btn btn-primary">Change</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
  }
}
