import Header from '../components/Header';
import { Component } from '../core/component';
import { getUrlParam, navigate } from '../core/router';
import { getMemberDetail } from '../store/memberStore';

export default class Detail extends Component {
  templateSkeleton() {
    return `
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
  }
  template(member) {
    return `
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
  }
  setEvent(member) {
    this.addEvent('click', 'button', () => navigate(`/edit?id=${member.id}`));
  }

  async render() {
    this.componentRoot.innerHTML = this.templateSkeleton();
    this.componentRoot.prepend(new Header().componentRoot);
    const member = await getMemberDetail(getUrlParam());
    if (!member) {
      return navigate('/not-found');
    } // 해당 아이디를 가진 멤버가 존재하지 않을 때
    this.componentRoot.innerHTML = this.template(member);
    this.componentRoot.prepend(new Header().componentRoot);
    this.setEvent(member);
  }
}
