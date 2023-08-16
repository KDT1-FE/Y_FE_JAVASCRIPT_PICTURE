import Header from '../components/Header';
import { Component } from '../core/component';
import { getUrlParam, navigate } from '../core/router';
import { getMemberDetail } from '../store/memberStore';

export default class Detail extends Component {
  async render() {
    this.el.innerHTML = `
    <main class="detail">
    <div class='photo-detail skeleton'></div>
    <section class='information-container'>
      <section class='information-title'>
        INFORMATION
        <button class='navigate-edit'>수정</button>
      </section>
      <p class='information skeleton'>
      </p>
      <p class='information skeleton'>
      </p>
      </section>
      </main>`;
    this.el.prepend(new Header().el);
    const member = await getMemberDetail(getUrlParam('id')); // 현재 url의 아이디를 가지고 member의 상세 데이터를 받아옴
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
