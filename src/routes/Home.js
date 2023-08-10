import MemberList from '../components/MemberList';
import { Component } from '../core/component';
import { renderMemberList } from '../store/memberStore';

export default class Home extends Component {
  async render() {
    this.el.innerHTML = `<header class="header">
    <div class="title">직원 관리 시스템</div>
    <div class="container">
      <input class="search" placeholder="이름으로 검색해주세요"/>
      <button class="button-home" id="add-member">등록</button>
      <button class="button-home" id ="delete-member">삭제</button>
    </div>
    </header>
    `;
    await renderMemberList(); // renderMemberList 함수를 통해 store 업데이트 (store에 memberList를 담음)
    const memberList = new MemberList().el;
    this.el.append(memberList);
    //memberList 컴포넌트 등록

    const title = this.el.querySelector('.title');
    title.addEventListener('click', () => {
      window.history.pushState(null, null, '/');
      routeRender();
    });
    //title 클릭 시 Home 페이지로 이동

    const addButton = this.el.querySelector('#add-member');
    addButton.addEventListener('click', () => {
      window.history.pushState(null, null, '/write');
      routeRender();
    });
  }
}
