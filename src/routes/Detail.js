import Header from "../components/common/Header";
import { Component } from "../core/core";
import logoImage from "../asset/images/logo.jpg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async render() {
    const worker_name = decodeURIComponent(history.state.name);

    const docRef = doc(db, "board", worker_name);
    const fetchData = async () => {
      const docSnap = await getDoc(docRef);
      this.state = docSnap.data();
    };
    await fetchData(); // await 사용하여 데이터 가져오기 기다림

    const { name, department, email, number, rank, imgURL } = this.state;
    const header = new Header().el;
    this.el.classList.add("detail-wrap");
    this.el.append(header);
    const detailContainer = document.createElement("div");
    detailContainer.className = "detail-container";
    detailContainer.innerHTML = /*html*/ `
        <div class="detail-box">
            <div class="detail-box-logo">
                <img src=${logoImage}>
            </div>
            <div class="worker-detail-box">
                <div class="worker-detail-box-left">
                    <div class="detail-box-header">
                        <h2>직원 정보</h2>
                        <div class="detail-btn-box">
                            <button type="button">정보 변경</button>
                            <button type="button">정보 삭제</button>
                        </div>
                    </div>
                    <div class="detail-main">
                        <div class="detail-item">
                            <span>사원번호</span>
                            ${number}
                        </div>
                        <div class="detail-item">
                            <span>이름</span>
                            ${name}
                        </div>
                        <div class="detail-item">
                            <span>부서</span>
                            ${department}
                        </div>
                        <div class="detail-item">
                            <span>직급</span>
                            ${rank}
                        </div>
                        <div class="detail-item">
                            <span>이메일</span>
                            ${email}
                        </div>
                    </div>
                </div>
                <div class="worker-detail-box-right">
                    <img src=${imgURL}>
                </div>
            </div>
        </div>
    `;

    this.el.append(detailContainer);
  }
}
