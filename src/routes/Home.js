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
  async deleteMembers() {
    const existsDeleteMembers = memberStore.state.deleteMembers.length;
    if (!existsDeleteMembers) {
      alert('삭제할 직원을 선택해주세요');
      return;
    }
    await Promise.all(
      memberStore.state.deleteMembers.map(({ id, photoUrl }) => {
        deleteData(id, photoUrl);
      })
    );
    memberStore.state.deleteMembers = [];
    routeRender();
  }

  template() {
    return `<header class="header">
    <div class="title">직원 관리 시스템</div>
    <div class="container">
      <input class="search" placeholder="이름으로 검색해주세요"/>
      <button class="button-home" id="navigate-write">등록</button>
      <button class="button-home" id ="delete-members">삭제</button>
    </div>
    </header>
    <div class="the-loader"></div>
    `;
  }

  async mounted() {
    await getMembersData();
    const memberList = new MemberList().componentRoot;
    const header = this.componentRoot.querySelector('.header');
    header.after(memberList);
  }

  setEvent() {
    this.addEvent('click', '.title', () => {
      navigate();
    });

    this.addEvent('click', '#navigate-write', () => {
      navigate('/write');
    });

    this.addEvent('click', '#delete-members', this.deleteMembers);

    this.addEvent('keydown', '.search', (event) => {
      const searchInput = this.componentRoot.querySelector('.search');
      if (event.key === 'Enter' && searchInput.value.trim()) {
        searchData(searchInput.value);
      }
    });
  }
}
