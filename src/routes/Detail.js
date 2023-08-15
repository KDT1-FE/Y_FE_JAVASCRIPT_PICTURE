import Header from '../components/Header';
import { Component } from '../core/component';
import { getUrlParam, navigate } from '../core/router';
import { getMemberDetail, memberStore } from '../store/memberStore';

export default class Detail extends Component {
  async render() {
    const id = getUrlParam('id');
    await getMemberDetail(id);
    const member = memberStore.state.member;
    this.el.innerHTML = `
  <main class="detail">
    <div class='photo-detail' style="background-image: url(${member.photoUrl})"></div>
    <section class='information-container'>
      <section class='information-title'>
        INFORMATION
        <button class='navigate-edit'>수정</button>
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
    this.el.prepend(new Header().el);
    const navigateEditButton = this.el.querySelector('button');
    navigateEditButton.addEventListener('click', () =>
      navigate(`/edit?id=${member.id}`)
    );
  }
}
