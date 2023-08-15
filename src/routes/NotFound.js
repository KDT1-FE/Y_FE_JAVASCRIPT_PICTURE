import { Component } from '../core/component';
import { navigate } from '../core/router';

export default class NotFound extends Component {
  render() {
    this.el.innerHTML = `요청하신 페이지를 찾을 수 없습니다<button class="not-found-button">홈으로 돌아가기 </button>`;
    this.el.classList.add('not-found');
    const notFoundButton = this.el.querySelector('.not-found-button');
    notFoundButton.addEventListener('click', () => navigate('/'));
  }
}
