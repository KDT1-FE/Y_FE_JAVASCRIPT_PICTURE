import { Component } from '../core/component';
import { memberStore, getNextMembersData } from '../store/memberStore';
import Member from './Member';

export default class MemberList extends Component {
  constructor() {
    super();
    memberStore.subscribe('members', () => {
      this.render();
    });
  }
  render() {
    this.el.classList.add('table');
    this.el.innerHTML = `<div class="row">  <div class='checkbox-container'>
        <input class='checkbox' type='checkbox'></input>
      </div>
      <p class='photo-title'>PHOTO</p>
      <p class="name-title">NAME</p>
      <p class="email-title">EMAIL</p></div>`;

    this.el.append(
      ...memberStore.state.members.map((member) => new Member({ member }).el)
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !memberStore.state.search) {
          // 요소의 마지막 요소가 뷰포트로 들어오면 다음 요소들 가져오기
          // 만약 memberStore.state.search가 true라면 마지막 요소가 뷰포트로 들어와도 다음 멤버 데이터를 가져오지않음
          getNextMembersData();
        } // entry is 'IntersectionObserverEntry'
      });
    });
    observer.observe(this.el.lastChild);
  }
}
