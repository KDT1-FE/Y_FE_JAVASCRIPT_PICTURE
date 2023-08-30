import { Component } from '../core/component';
import { navigate } from '../core/router';

export default class Header extends Component {
  constructor() {
    super({ tagName: 'header', attributes: { class: 'header' } });
  }
  render() {
    this.componentRoot.innerHTML =
      '  <div class="title">직원 관리 시스템</div>';

    const title = this.componentRoot.querySelector('.title');
    title.addEventListener('click', () => {
      navigate();
    });
  }
}
