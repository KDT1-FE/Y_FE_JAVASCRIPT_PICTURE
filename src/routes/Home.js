import { Component } from "../core/core";
import logoImage from "../asset/images/logo.jpg";
import EojoonHyuk from "../asset/images/EojoonHyuk.jpg";
export default class Home extends Component {
  render() {
    this.el.classList.add("wrap");
    this.el.innerHTML = /* html */ `
      <header class="header">
        <nav class="header-item-box">
          <div class="header-item-box-logo">
            <img src=${logoImage} alt="logo"/>
          </div>
          <div></div>
        </nav>
      </header>
      <div class="home-container">
        <h2 class="page-title">직원 관리</h2>
        <div class="action-bar">
          <div class="button-box">
            <button class="button-register">직원 등록</button>
            <button class="button-delete">직원 삭제</button>
          </div>
          <div class="search-box">
            <div class="search-input-box">
              <span class="material-symbols-outlined">
              search
              </span>
              <input type="text" placeholder="이름 또는 이메일을 입력하세요"/>
            </div>
          </div>
        </div>
        <div class="workers-info-box">
          <div class="workers-info-box-header">
            <ul class="worker-box">
              <li id="check">
                <input type="checkbox"/>
              </li>
              <li>프로필 사진</li>
              <li>사원번호</li>
              <li>이름</li>
              <li>핸드폰 번호</li>
              <li>부서</li>
              <li>직급</li>
              <li>이메일</li>
            </ul>
          </div>
          <ul class="worker-box" id="worker">
            <li id="check">
              <input type="checkbox"/>
            </li>
            <li>
              <img src=${EojoonHyuk}/>
            </li>
            <li>19017060</li>
            <li>어준혁</li>
            <li>010-3016-0696</li>
            <li>프론트엔드</li>
            <li>CTO</li>
            <li>djwnsgur741@naver.com</li>
          </ul>
        </div>
      </div>
    `;
  }
}
