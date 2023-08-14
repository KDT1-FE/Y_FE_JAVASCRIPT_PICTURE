import { Component } from '../core/component';
import { memberStore, nextMemberList } from '../store/memberStore';
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
        if (entry.isIntersecting) {
          // 다음 요소 또 가져오기
          // 요소의 마지막 요소가 뷰포트로 들어오면~
          nextMemberList();
        } // entry is 'IntersectionObserverEntry'
      });
    });
    observer.observe(this.el.lastChild);
  }
}
