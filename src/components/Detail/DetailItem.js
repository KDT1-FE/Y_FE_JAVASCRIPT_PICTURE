import { Component } from "../../modules";
import detailStore, {
  detailEmployee,
  changeInfoEmployee,
  deleteEmployee,
} from "../../store/employee";
import { storage } from "../../firebase";

export default class DetailItem extends Component {
  constructor() {
    super();
  }
  async render() {
    await detailEmployee(history.state.id);

    const { employee, docs } = detailStore.state;

    const docsId = docs;

    this.el.classList.add("detail");
    this.el.innerHTML = /* html */ `
            ${
              employee.name === undefined
                ? `<h1 class="default-detail">올바른 접근 방법이 아닙니다.</h1>

                    <h2>1. 메인 페이지에서 '불러오기' 버튼을 클릭합니다.</h2>
                    <div class="default-tutorial">
                      <img src="https://firebasestorage.googleapis.com/v0/b/employee-database-f5521.appspot.com/o/how-to-tutorial-1.png?alt=media&token=037cc7c5-3ae6-4673-a8e6-65ca40791d41">
                    </div>

                    <h2>2. 리스트의 직원 정보를 클릭합니다.</h2>
                    <div class="default-tutorial">
                      <img src="https://firebasestorage.googleapis.com/v0/b/employee-database-f5521.appspot.com/o/how-to-tutorial-2.png?alt=media&token=4f56e425-bcd6-450a-b7f2-fd5935ee093f">
                    </div>

                     <h2>3. 다음과 같이 직원 정보를 확인할 수 있습니다.</h2>
                     <div class="default-tutorial">
                      <img src="https://firebasestorage.googleapis.com/v0/b/employee-database-f5521.appspot.com/o/how-to-tutorial-3.png?alt=media&token=087476f7-fe71-4bdc-b2d0-558758e503e8">
                    </div>
                `
                : `<div class="detail-container">
                <div class="detail-texts">
                  <div class="detail-title">직원 정보</div>
                  <div class="sub">
                    <span>이름</span>
                    ${employee.name}
                  </div>
                  <div class="sub">
                     <span>이메일</span>
                    ${employee.email}
                  </div>
                  <div class="sub">
                     <span>휴대폰 번호</span>
                    ${employee.phone}
                  </div>
                  <div class="sub">
                     <span>직급</span>
                    ${employee.division}
                  </div>
                  <div class="btn-container">
                    <button class="btn btn-change">정보 변경</button>
                   <button class="btn btn-delete">정보 삭제</button>
                  </div>
                </div>
                <div class="detail-image">
                  <img src="${employee.profile}" alt="">
                </div>
            </div>
            <!-- 정보 변경시 -->
            <div class="form-register hide">
                <div class="register-texts">
                  <div class="register-title">직원 정보</div>
                  <form class="register-form">
                    <label for="name">
                      <span>이름</span>
                      <input class="name-input" value="${employee.name}" >
                    </label>
                    <label for="email">
                      <span>이메일</span>
                      <input class="email-input" value="${employee.email}">
                    </label>
                    <label for="phone">
                      <span>휴대폰 번호</span>
                      <input  
                          class="phone-input"
                          value="${employee.phone}"
                          >
                    </label>
                    <label for="division">
                      <span>분류</span>
                      <select name="division" class="division-input" value="${employee.division}">
                        <option value="사원">사원</option>
                        <option value="대리">대리</option>
                        <option value="과장">과장</option>
                        <option value="부장">부장</option>
                      </select>
                    </label>
                    <label for="profile">
                      <span>프로필 사진</span>
                      <input type="file" class="nb profile-input" value="${employee.profile}">
                    </label>
                    <button class="btn register-btn">저장</button>
                  </form>
                </div>
                <div class="detail-image">
                  <img src="${employee.profile}" alt="">
                </div>
            </div>`
            }
        `;

    const changeBtn = this.el.querySelector(".btn-change");
    const deleteBtn = this.el.querySelector(".btn-delete");
    const container = this.el.querySelector(".detail-container");
    const fomrContainer = this.el.querySelector(".form-register");

    changeBtn.addEventListener("click", () => {
      fomrContainer.classList.remove("hide");
      container.classList.add("hide");
    });

    const registerBtn = this.el.querySelector(".register-btn");
    registerBtn.addEventListener("click", () => {
      fomrContainer.classList.add("hide");
      container.classList.remove("hide");

      const nameInput = this.el.querySelector(".name-input");
      const emailInput = this.el.querySelector(".email-input");
      const phoneInput = this.el.querySelector(".phone-input");
      const divisionInput = this.el.querySelector(".division-input");

      const file = document.querySelector(".profile-input").files[0];
      if (file) {
        const storageRef = storage.ref();
        const imageUrl = storageRef.child("profile" + file.name);
        const uploadProfile = imageUrl.put(file);

        uploadProfile.on(
          "state_changed",
          null,
          (error) => {
            console.log(error);
          },
          () => {
            uploadProfile.snapshot.ref.getDownloadURL().then((url) => {
              const date = new Date();
              const createdAt = date.getTime();

              const updateDB = {
                id: createdAt,
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                division: divisionInput.value,
                date: new Date(),
                profile: url,
              };
              alert("정보가 업데이트 되었습니다.");
              changeInfoEmployee(docsId, updateDB);
            });
          }
        );
      }
      if (!file) {
        const date = new Date();
        const createdAt = date.getTime();

        const updateDB = {
          id: createdAt,
          name: nameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          division: divisionInput.value,
          date: new Date(),
          profile: `${employee.profile}`,
        };
        alert("정보가 업데이트 되었습니다.");
        changeInfoEmployee(docsId, updateDB);
      }
    });

    deleteBtn.addEventListener("click", () => {
      if (confirm("삭제하시면 복구할 수 없습니다. 삭제하시겠습니까?") == true) {
        deleteEmployee(docsId);
      } else {
        return false;
      }
    });
  }
}
