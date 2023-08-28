import AbstractView from '../AbstractView.js'
import jumbotronTemplate from '../components/jumbotron.hbs'
import member1 from '../../asset/member1.png'
import member2 from '../../asset/member2.png'
import member3 from '../../asset/member3.png'

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Project Management Tool')
  }

  async getContent() {
    const data = {
      member1: member1,
      member2: member2,
      member3: member3,
    }

    const jumbotron = jumbotronTemplate(data)

    return /* HTML */ `
      ${jumbotron}

      <div class="members__container container">
        <h2 class="members__title pb-2 border-bottom">Members</h2>
        <div class="members__wrap">
          <div class="members__contents p-3">
            <div class="members__contents__header">
              <h6 class="members__contents__title">Members workspace</h6>
            </div>
            <hr class="members-hr" />
          </div>
        </div>
      </div>

      <div class="teams__container container" id="custom-cards">
        <h2 class="teams__title pb-2 border-bottom">Teams</h2>
        <div class="teams__contents row row-cols-1 row-cols-md-2 g-4"></div>
      </div>
    `
  }
}
