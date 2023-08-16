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
    await getMembersData(); // getMembersData 함수를 통해 store 업데이트 (store에 memberList를 담음)
    const memberList = new MemberList().el;
    //getMembersData 를 사용해서 얻은 결과값을 MemberList에 넘겨줄 수도 있지만

    const header = this.el.querySelector('.header');
    header.after(memberList);
    //memberList 컴포넌트 등록
    const title = this.el.querySelector('.title');
    title.addEventListener('click', () => navigate());
    //title 클릭 시 Home 페이지로 이동
    /*Home 페이지는 따로 header 분리 X,  
    why? -> header을 prepend로 삽입했을 때 container는 따로 요소를 생성하고 header의 자식으로 할당하는 과정이 필요
    이 과정이 더 불필요하다고 생각하기에  
     */
    const addButton = this.el.querySelector('#navigate-write');
    addButton.addEventListener('click', () => navigate('/#/write'));

    const deleteMembers = async () => {
      await Promise.all(
        memberStore.state.deleteMembers.map(({ id, photoUrl }) => {
          deleteData(id, photoUrl);
        })
      ); // 멤버를 삭제하는 순서는 순차적으로 X
      // 하지만 Promise.all로 병렬처리 , 모두 끝난 후 routeRender 함수 실행
      routeRender();
    };

    const deleteButton = this.el.querySelector('#delete-members');
    deleteButton.addEventListener('click', deleteMembers);
    // 삭제

    const searchInput = this.el.querySelector('.search');
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && searchInput.value.trim()) {
        searchData(searchInput.value);
      }
    });
  }
}
