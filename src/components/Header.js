import { Component } from '../core/component';
import { navigate } from '../core/router';

export default class Header extends Component {
  constructor() {
    super({ tagName: 'header', attributes: { class: 'header' } });
  }
  template() {
    return '  <div class="title">직원 관리 시스템</div>';
  }

  setEvent() {
    this.addEvent('click', '.title', () => {
      navigate();
    });
  }
}
