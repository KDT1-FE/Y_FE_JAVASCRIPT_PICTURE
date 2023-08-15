import { Component } from '../core/component';
import { navigate, routeRender } from '../core/router';

export default class Header extends Component {
  constructor() {
    super({ tagName: 'header' });
  }
  render() {
    this.el.classList.add('header');
    this.el.innerHTML = '  <div class="title">직원 관리 시스템</div>';

    //title 클릭시 메인 페이지로 이동
    const title = this.el.querySelector('.title');
    title.addEventListener('click', () => navigate('/'));
  }
}
