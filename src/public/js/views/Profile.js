import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Detail');
  }

  /**
   *
   * @returns app div에 그려낼 해당 view의 html을 반환합니다.
   */
  async getHtml() {
    console.log(this.params.id); // id값만 찍힘
    return `
            <h1>상세 페이지입니다</h1>
            <p>      
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim dolore quia
              voluptate odio corporis aliquid? At adipisci labore eligendi rerum qui
              numquam tempora molestiae porro! Maxime hic aperiam sit eligendi?
            </p>
            <nav class="nav">
              <a href="/" class="nav__link" data-link>초기페이지</a>
              <a href="/members" class="nav__link" data-link>코스</a>
              <a href="/profile" class="nav__link" data-link>프로필</a>
            </nav>
        `;
  }
}
