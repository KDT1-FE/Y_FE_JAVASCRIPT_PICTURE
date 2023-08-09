import { Component } from '../core/component';
import { memberStore, renderMemberList } from '../store/memberStore';
import Member from './Member';

export default class MemberList extends Component {
  constructor() {
    super();
    memberStore.subscribe('member', () => {
      this.render();
    });
    memberStore.subscribe('loading', () => {
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

    renderMemberList();
    this.el.append(
      ...memberStore.state.members.map((member) => new Member({ member }).el)
    );
  }
}
