import { Component } from '../core/component';
import { getUrlParam } from '../core/router';
import { getMemberDetail, memberStore } from '../store/memberStore';

export default class Member extends Component {
  render() {
    const id = getUrlParam();
    getMemberDetail(id);
    const member = memberStore.state.member;
    this.el.innerHTML = `
  <main class="detail">
    <div class='photo'></div>
    <section class='information-container'>
      <section class='information-title'>
        <div class='information-text'>INFORMATION</div>
        <button class='button'>정보 수정</button>
      </section>
      <p class='information'>
        <div class='name-detail'>NAME</div>
        <div>${member.name}</div>
      </p>
      <p class='information'>
        <div class='name-email'>EMAIL</div>
        <div>${member.email}</div>
      </p>
    </section>
  </main> 
    `;
  }
}
