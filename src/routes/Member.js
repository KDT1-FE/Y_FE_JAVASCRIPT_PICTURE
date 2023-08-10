import { Component } from '../core/component';
import { getUrlParam, routeRender } from '../core/router';
import { getMemberDetail, memberStore } from '../store/memberStore';

export default class Member extends Component {
  async render() {
    const id = getUrlParam('id');
    await getMemberDetail(id);
    const member = memberStore.state.member;
    this.el.innerHTML = `
    <header class="header">
  <div class="title">직원 관리 시스템</div></header>
  <main class="detail">
    <div class='photo-detail' style="background-image: url(${member.photoUrl})"></div>
    <section class='information-container'>
      <section class='information-title'>
        INFORMATION
        <button class='button'>수정</button>
      </section>
      <p class='information'>
        <span class='detail-category'>NAME</span>
        <span class="detail-value">${member.name}</span>
      </p>
      <p class='information'>
        <span class='detail-category'>EMAIL</span>
        <span class="detail-value">${member.email}</span>
      </p>
    </section>
  </main> 
    `;

    const title = this.el.querySelector('.title');
    title.addEventListener('click', () => {
      window.history.pushState(null, null, '/');
      routeRender();
    });
  }
}
