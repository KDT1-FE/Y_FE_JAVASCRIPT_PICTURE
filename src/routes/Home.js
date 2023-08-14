import MemberList from '../components/MemberList';
import { Component } from '../core/component';
import { routeRender } from '../core/router';
import {
  deleteData,
  memberStore,
  renderMemberList,
} from '../store/memberStore';

export default class Home extends Component {
  constructor() {
    super();
  }
  async render() {
    this.el.innerHTML = `<header class="header">
    <div class="title">직원 관리 시스템</div>
    <div class="container">
      <input class="search" placeholder="이름으로 검색해주세요"/>
      <button class="button-home" id="navigate-write">등록</button>
      <button class="button-home" id ="delete-members">삭제</button>
    </div>
    </header>
    <div class="the-loader"></div>
    `;
    await renderMemberList(); // renderMemberList 함수를 통해 store 업데이트 (store에 memberList를 담음)
    const memberList = new MemberList().el;
    const header = this.el.querySelector('.header');
    header.after(memberList);
    //memberList 컴포넌트 등록

    const title = this.el.querySelector('.title');
    title.addEventListener('click', () => {
      window.history.pushState(null, null, '/');
      routeRender();
    });
    //title 클릭 시 Home 페이지로 이동

    const addButton = this.el.querySelector('#navigate-write');
    addButton.addEventListener('click', () => {
      window.history.pushState(null, null, '/write');
      routeRender();
    });

    const deleteMembers = async () => {
      await Promise.all(
        memberStore.state.deleteMembers.map((id) => {
          deleteData(id);
        })
      ); // 멤버를 삭제하는 순서는 순차적으로 X
      // 하지만 Promise.all로 병렬처리 , 모두 끝난 후 routeRender 함수 실행
      routeRender();
    };

    const deleteButton = this.el.querySelector('#delete-members');
    deleteButton.addEventListener('click', deleteMembers);
  }
}
