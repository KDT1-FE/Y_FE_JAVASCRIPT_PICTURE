import { Component } from '../core/component';
import { navigate } from '../core/router';

export default class Header extends Component {
  constructor() {
    super({ tagName: 'header' });
  }
  render() {
    this.el.classList.add('header');
    this.el.innerHTML = '  <div class="title">직원 관리 시스템</div>';

    const title = this.el.querySelector('.title');
    title.addEventListener('click', () => navigate());
  }
}
