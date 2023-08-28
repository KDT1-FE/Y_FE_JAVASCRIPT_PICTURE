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
        <input class='checkbox' type='checkbox' disabled></input>
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
          getNextMembersData();
        }
      });
    });
    observer.observe(this.el.lastChild);
  }
}
