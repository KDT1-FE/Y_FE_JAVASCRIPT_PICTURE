import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";
import Header from "../components/common/Header";
import { Component } from "../core/core";
import logoImage from "../asset/images/logo.jpg";
export default class Registration extends Component {
  constructor() {
    super();
    this.workerData = {};
  }
  render() {
    const header = new Header().el;
    this.el.classList.add("detail-wrap");
    this.el.append(header);
    const registrationContainer = document.createElement("div");
    registrationContainer.className = "detail-container";
    registrationContainer.innerHTML = /* html */ `
      <div class="detail-box">
        <div class="detail-box-logo">
            <img src=${logoImage}>
        </div>
        <div class="worker-detail-box">
          <div class="worker-detail-box-left">
              <div class="detail-box-header">
                  <h2>직원 등록</h2>
                  <div class="detail-btn-box">
                      <button type="button" id="register-worker">등록</button>
                      <button type="button" id="register-cancel">취소</button>
                  </div>
              </div>
              <div class="detail-main">
                  <div class="detail-item">
                      <span>사원번호</span>
                      <input type="text" id="workerNumber">
                  </div>
                  <div class="detail-item">
                      <span>이름</span>
                      <input type="text" id="workerName">
                  </div>
                  <div class="detail-item">
                      <span>부서</span>
                      <input type="text" id="workerDepartment">
                  </div>
                  <div class="detail-item">
                      <span>직급</span>
                      <input type="text" id="workerRank">
                  </div>
                  <div class="detail-item">
                      <span>이메일</span>
                      <input type="text" id="workerEmail">
                  </div>
                  <div class="detail-item">
                      <span>사진</span>
                      <input type="file" id="workerImg">
                  </div>
                  <div class="info-message">
                    <p>첨부된 프로필 사진이 없을 시, 기본 이미지 또는 변경 전 이미지로 첨부됩니다.</p>
                  </div>
              </div>
            </div>
          </div>
      </div>
    `;

    this.el.appendChild(registrationContainer);

    const registerButton =
      registrationContainer.querySelector("#register-worker");
    registerButton.addEventListener("click", async () => {
      collectDataSave();
      await imgFileUpload();
    });
    const registerCancelButton =
      registrationContainer.querySelector("#register-cancel");
    registerCancelButton.addEventListener("click", async () => {
      location.href = "/#/home";
    });

    const collectDataSave = () => {
      const fieids = [
        "workerNumber",
        "workerName",
        "workerDepartment",
        "workerRank",
        "workerEmail",
      ];
      fieids.forEach((fieid) => {
        const input = document.querySelector(`#${fieid}`);
        this.workerData[fieid] = input.value;
      });
    };

    const imgFileUpload = async () => {
      let file = document.querySelector("#workerImg").files[0];

      const handleError = (error) => {
        console.error("에러가 발생했습니다:", error);
        alert("다시 시도해주세요");
        location.href = "/#/home";
      };

      const uploadImage = async (imageRef) => {
        try {
          const uploadTask = uploadBytesResumable(imageRef, file);

          await new Promise((resolve, reject) => {
            uploadTask.on("state_changed", null, reject, resolve);
          });

          return getDownloadURL(uploadTask.snapshot.ref);
        } catch (error) {
          handleError(error);
        }
      };

      const uploadDataAndRedirect = async (imgURL) => {
        const data = {
          imgURL,
          name: this.workerData.workerName,
          number: this.workerData.workerNumber,
          department: this.workerData.workerDepartment,
          email: this.workerData.workerEmail,
          rank: this.workerData.workerRank,
        };

        try {
          await setDoc(doc(db, "board", data.name), data);
          alert("직원 등록이 완료되었습니다.");
          location.href = "/#/home";
        } catch (error) {
          handleError(error);
        }
      };

      if (!file) {
        const defaultImageRef = ref(storage, "images/default.jpg");
        try {
          const defaultImgURL = await getDownloadURL(defaultImageRef);
          await uploadDataAndRedirect(defaultImgURL);
        } catch (error) {
          handleError(error);
        }
      } else {
        const imageRef = ref(storage, "images/" + file.name);
        const imgURL = await uploadImage(imageRef);
        await uploadDataAndRedirect(imgURL);
      }
    };
  }
}
