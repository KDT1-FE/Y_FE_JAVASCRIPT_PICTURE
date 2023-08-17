import Header from "../components/common/Header";
import { Component } from "../core/core";
import logoImage from "../asset/images/logo.jpg";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

export default class Edit extends Component {
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
                        <h2>정보 수정</h2>
                        <div class="detail-btn-box">
                            <button type="button" id="save-button">저장</button>
                            <button type="button" id="cancel-button">취소</button>
                        </div>
                    </div>
                    <div class="detail-main">
                        <div class="detail-item">
                            <span>사원번호</span>
                            <input type="text" value=${number} id="workerNumber" disabled>
                        </div>
                        <div class="detail-item">
                            <span>이름</span>
                            <input type="text" value=${name} id="workerName" disabled>
                        </div>
                        <div class="detail-item">
                            <span>부서</span>
                            <input type="text" value=${department} id="workerDepartment">
                        </div>
                        <div class="detail-item">
                            <span>직급</span>
                            <input type="text" value=${rank} id="workerRank">
                        </div>
                        <div class="detail-item">
                            <span>이메일</span>
                            <input type="text" value=${email} id="workerEmail">
                        </div>
                        <div class="detail-item">
                            <span>사진</span>
                            <input type="file" id="select-img">
                        </div>
                    </div>
                    <div class="info-message">
                        <p>첨부된 프로필 사진이 없을 시, 기본 이미지 또는 변경 전 이미지로 첨부됩니다.</p>
                    </div>
                </div>
                <div class="worker-detail-box-right">
                    <img src=${imgURL}>
                </div>
            </div>
        </div>
    `;

      this.el.append(detailContainer);
    };
    await fetchData();

    const editDataSave = () => {
      const fieids = [
        "workerNumber",
        "workerName",
        "workerDepartment",
        "workerRank",
        "workerEmail",
      ];
      fieids.forEach((fieid) => {
        const input = document.querySelector(`#${fieid}`);
        this.state[fieid] = input.value;
      });
    };

    const editImgUpload = async () => {
      let file = document.querySelector("#select-img").files[0];

      const handleError = (error) => {
        console.error("에러가 발생했습니다:", error);
        alert("다시 시도해주세요");
        location.href = `/#/detail?name=${worker_name}&number=${this.state.number}`;
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
          imgURL: imgURL,
          name: this.state.workerName,
          number: this.state.workerNumber,
          department: this.state.workerDepartment,
          email: this.state.workerEmail,
          rank: this.state.workerRank,
        };

        try {
          await setDoc(doc(db, "board", worker_name), data);
          alert("직원 정보 수정이 완료되었습니다.");
          location.href = `/#/detail?name=${worker_name}&number=${this.state.number}`;
        } catch (error) {
          handleError(error);
        }
      };

      if (!file) {
        const defaultImageRef = ref(storage, "images/default.jpg");
        try {
          const defaultImgURL = await getDownloadURL(defaultImageRef);
          if (this.state.imgURL !== defaultImgURL) {
            await uploadDataAndRedirect(this.state.imgURL);
          }
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

    const saveButton = document.querySelector("#save-button");
    saveButton.addEventListener("click", async () => {
      editDataSave();
      await editImgUpload();
    });
    const cancelButton = document.querySelector("#cancel-button");
    cancelButton.addEventListener("click", async () => {
      location.href = `/#/detail?name=${worker_name}&number=${this.state.number}`;
    });
  }
}
