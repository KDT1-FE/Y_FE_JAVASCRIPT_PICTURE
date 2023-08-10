import { Component } from '../core/component';
import { memberStore } from '../store/memberStore';
import Member from './Member';

export default class MemberList extends Component {
  constructor() {
    super();
    memberStore.subscribe('members', () => {
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

    this.el.append(
      ...memberStore.state.members.map((member) => new Member({ member }).el)
    );
  }
}
