import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";
import Header from "../components/common/Header";
import { Component } from "../core/core";
export default class Registration extends Component {
  constructor() {
    super();
    this.workerData = {};
  }
  render() {
    const header = new Header().el;
    this.el.classList.add("wrap");
    this.el.append(header);
    const registrationContainer = document.createElement("div");
    registrationContainer.className = "registration-container";
    registrationContainer.innerHTML = /* html */ `
      <h2 class="page-title">직원 등록</h2>
      <div class="registration-form">
        <div class="img-input-box">
          <div class="img-preview"></div>
          <div class="worker-img-box">
            <input type="file" id="workerImg" accept="image/*">
          </div>  
        </div>
        <div class="form-right">
          <div class="worker-info-box">
          ${generateInputFields([
            { id: "workerNumber", label: "사원번호" },
            { id: "workerName", label: "이름" },
            { id: "workerDepartment", label: "부서" },
            { id: "workerRank", label: "직급" },
            { id: "workerEmail", label: "이메일" },
          ])}
          </div>
          <div class="register-button-box">
            <button type="button">등록</button>
            <button type="button">취소</button>
          </div>
        </div>
      </div>
    `;

    this.el.appendChild(registrationContainer);

    function generateInputFields(fields) {
      return fields
        .map(
          (field) => /* html */ `
        <div class="info-item">
          <label for="${field.id}">${field.label}</label>
          <input type="text" id="${field.id}">
        </div>
      `
        )
        .join("");
    }

    const registerButton = registrationContainer.querySelector(
      ".register-button-box button:first-child"
    );
    registerButton.addEventListener("click", async () => {
      await collectDataSave();
      await imgFileUpload();
    });

    const collectDataSave = async () => {
      try {
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
      } catch (error) {
        console.error("데이터 수집 및 저장 중 에러가 발생했습니다:", error);
      }
    };

    const imgFileUpload = async () => {
      let file = document.querySelector("#workerImg").files[0];
      const storageRef = ref(storage, "images/" + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("실패사유는", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              const data = {
                imgURL: downloadURL,
                name: this.workerData.workerName,
                number: this.workerData.workerNumber,
                department: this.workerData.workerDepartment,
                email: this.workerData.workerEmail,
                rank: this.workerData.workerRank,
              };
              setDoc(doc(db, "board", data.name), data);
              alert("직원 등록이 완료되었습니다.");
              location.replace("/#/home");
            })
            .catch((error) => {
              console.error(
                "Firebase에 데이터 업로드 중 에러가 발생했습니다:",
                error
              );
            });
        }
      );
    };
  }
}
