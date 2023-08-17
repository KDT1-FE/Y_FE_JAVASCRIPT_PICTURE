import { Component } from "../core/core";
import Header from "../components/common/Header";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Worker from "../components/Home/Worker";
export default class Home extends Component {
  constructor() {
    super({
      state: {
        workers: [],
      },
    });
  }
  render() {
    const header = new Header().el;
    this.el.classList.add("wrap");
    this.el.append(header);
    const homeContainer = document.createElement("div");
    homeContainer.className = "home-container";
    homeContainer.innerHTML = /* html */ `
    <div class="home-main-container">
      <h2 class="page-title">직원 관리</h2>
      <div class="action-bar">
        <div class="button-box">
          <button type="button" class="button-register">직원 등록</button>
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
            <li>프로필 사진</li>
            <li>사원번호</li>
            <li>이름</li>
            <li>부서</li>
            <li>직급</li>
            <li>이메일</li>
          </ul>
        </div>
        <div class="worker-items"></div>
      </div>
    </div>
    `;
    this.el.appendChild(homeContainer);

    const registerButton = this.el.querySelector(".button-register");
    registerButton.addEventListener("click", () => {
      location.replace("/#/registration");
    });

    const fetchWorkersData = async () => {
      const querySnapshot = await getDocs(collection(db, "board"));
      const workerItemsContainer = document.querySelector(".worker-items");

      querySnapshot.forEach((doc) => {
        this.state.workers.push(doc.data());
      });

      workerItemsContainer.append(
        ...this.state.workers.map(
          (worker) =>
            new Worker({
              props: {
                ...worker,
              },
            }).el
        )
      );
    };

    fetchWorkersData();
  }
}
