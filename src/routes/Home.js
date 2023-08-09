import { Component } from '../core/component';

export default class Home extends Component {
  render() {
    this.el.innerHTML = `<header class="header">
    <div class="title">직원 관리 시스템</div>
    <div class="container">
      <input class="search" placeholder="이름으로 검색해주세요"/>
      <button class="button-home add-person">등록</button>
      <button class="button-home delete-person">삭제</button>
    </div>
    </header>
    <div class='table'>
  <div class='checkbox-container'>
    <input class='checkbox' type='checkbox'></input>
  </div>
  <p class='photo-title'>PHOTO</p>
  <p class="name-title">NAME</p>
  <p class="email-title">EMAIL</p>
</div>
    `;
  }
}
