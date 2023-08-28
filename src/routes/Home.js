import MemberList from '../components/MemberList';
import { Component } from '../core/component';
import { navigate, routeRender } from '../core/router';
import {
  deleteData,
  memberStore,
  getMembersData,
  searchData,
} from '../store/memberStore';

export default class Home extends Component {
  async render() {
    this.componentRoot.innerHTML = `<header class="header">
    <div class="title">직원 관리 시스템</div>
    <div class="container">
      <input class="search" placeholder="이름으로 검색해주세요"/>
      <button class="button-home" id="navigate-write">등록</button>
      <button class="button-home" id ="delete-members">삭제</button>
    </div>
    </header>
    <div class="the-loader"></div>
    `;
    await getMembersData();
    const memberList = new MemberList().componentRoot;

    const header = this.componentRoot.querySelector('.header');
    header.after(memberList);

    const title = this.componentRoot.querySelector('.title');
    title.addEventListener('click', navigate);
    /*Home 페이지는 따로 header 분리 X,  
    why? -> header을 prepend로 삽입했을 때 container는 따로 요소를 생성하고 header의 자식으로 할당하는 과정이 필요
    이 과정이 더 불필요하다고 생각하기에  
     */

    const addButton = this.componentRoot.querySelector('#navigate-write');
    addButton.addEventListener('click', () => navigate('/#/write'));

    const deleteMembers = async () => {
      await Promise.all(
        memberStore.state.deleteMembers.map(({ id, photoUrl }) => {
          deleteData(id, photoUrl);
        })
      );
      memberStore.state.deleteData = [];
      routeRender();
    };

    const deleteButton = this.componentRoot.querySelector('#delete-members');
    deleteButton.addEventListener('click', deleteMembers);

    const searchInput = this.componentRoot.querySelector('.search');
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && searchInput.value.trim()) {
        searchData(searchInput.value);
      }
    });
  }
}
