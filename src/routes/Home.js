import { Component } from "../core/core";
import Header from "../components/common/Header";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
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
            <input type="text" id="search-worker" placeholder="직원의 이름을 입력하세요"/>
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
    <div id="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    `;
    this.el.appendChild(homeContainer);

    const registerButton = this.el.querySelector(".button-register");
    registerButton.addEventListener("click", () => {
      location.href = "/#/registration";
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
    const inputEl = this.el.querySelector("#search-worker");
    inputEl.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) searchWorker();
    });

    async function searchWorker() {
      const searchKeyword = inputEl.value.trim();
      if (searchKeyword === "") return;

      const workerItemsContainer = document.querySelector(".worker-items");
      workerItemsContainer.innerHTML = "";

      const q = query(
        collection(db, "board"),
        where("name", "==", searchKeyword)
      );
      const querySnapshot = await getDocs(q);

      const searchedWorkers = [];
      querySnapshot.forEach((doc) => {
        searchedWorkers.push(doc.data());
      });

      workerItemsContainer.append(
        ...searchedWorkers.map(
          (worker) =>
            new Worker({
              props: {
                ...worker,
              },
            }).el
        )
      );
    }
  }
}
