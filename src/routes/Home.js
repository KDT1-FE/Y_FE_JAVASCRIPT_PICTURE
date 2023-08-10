import MemberList from '../components/MemberList';
import { Component } from '../core/component';

export default class Home extends Component {
  render() {
    this.el.innerHTML = `<header class="header">
    <div class="title">직원 관리 시스템</div>
    <div class="container">
      <input class="search" placeholder="이름으로 검색해주세요"/>
      <button class="button-home add-person">등록</button>
      <button class="button-home delete-person">삭제</button>
    </div>
    </header>
    `;
    const memberList = new MemberList().el;
    this.el.append(memberList);
    const title = this.el.querySelector('.title');
    title.addEventListener('click', () => {
      window.history.pushState(null, null, '/');
      routeRender();
    });
  }
}
