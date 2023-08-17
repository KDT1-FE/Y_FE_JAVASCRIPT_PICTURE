import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import login from "../asset/images/login.jpg";
import logo from "../asset/images/logo.jpg";
import { Component } from "../core/core";
export default class Login extends Component {
  async fetchData() {
    const docRef = doc(db, "login", "admin");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
  async render() {
    const adminData = await this.fetchData();
    this.el.classList.add("login-wrap");
    this.el.innerHTML = /* html */ `
        <div class="container">
          <div class="container-img-box">
            <img src=${login} alt="login-page-img"/>
            <div class="img-top">
              <p>패스트캠퍼스 X 야놀자</p>
              <p>인재개발팀</p>
            </div>
            <div class="img-mid">
              <h2>직원 사진</h2>
              <h2>관리 서비스</h2>
            </div>
          </div>
          <div class="login-container">
            <div class="login-box">
              <img src=${logo}/>
              <input class="id" type="text" placeholder="아이디" />
              <input class="password" type="password" placeholder="비밀번호"/>
              <button type="button">로그인</button>
            </div>
          </div>
        </div>
    `;

    const idInputEl = this.el.querySelector(".id");
    const passwordInputEl = this.el.querySelector(".password");

    const loginButton = this.el.querySelector("button");
    loginButton.addEventListener("click", () => {
      const enteredId = idInputEl.value;
      const enteredPassword = passwordInputEl.value;

      if (
        adminData &&
        enteredId === adminData.id &&
        enteredPassword === adminData.password
      ) {
        location.replace("/#/home");
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    });
  }
}
