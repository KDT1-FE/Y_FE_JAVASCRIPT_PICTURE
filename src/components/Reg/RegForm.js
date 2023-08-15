import { Component } from "../../modules";
import { storage } from "../../firebase";
import { registerEmployee } from "../../store/employee";

export default class RegForm extends Component {
  render() {
    this.el.classList.add("container");
    this.el.innerHTML = /* html */ `
            <div class="form-register">
                <div class="register-texts">
                <div class="register-title">직원 등록</div>
                <form class="register-form">
                <label for="name">
                    <span>이름</span>
                    <input class="name-input" >
                </label>
                <label for="email">
                    <span>이메일</span>
                    <input class="email-input">
                </label>
                 <label for="phone">
                    <span>휴대폰 번호</span>
                    <input  
                        class="phone-input">
                </label>
                <label for="division">
                    <span>분류</span>
                    <select name="division" class="division-input">
                        <option value="사원">사원</option>
                        <option value="대리">대리</option>
                        <option value="과장">과장</option>
                        <option value="부장">부장</option>
                    </select>
                </label>
                <label for="profile">
                    <span>프로필 사진</span>
                     <input type="file" class="nb profile-input">
                </label>
                <button class="btn register-btn">저장</button>
            </form>
            </div>
            <div class="register-image">
                <img src="https://firebasestorage.googleapis.com/v0/b/employee-database-f5521.appspot.com/o/peer.jpg?alt=media&token=008b5cc2-5e36-4cb0-9032-cf54e4f6e5a0" alt="">
            </div>
            </div>
        `;

    const registerBtn = this.el.querySelector(".register-btn");
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();

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
          // 변화시 동작(현재는 null)
          null,
          (error) => {
            console.log(error);
          },
          () => {
            uploadProfile.snapshot.ref.getDownloadURL().then((url) => {
              const date = new Date();
              const createdAt = date.getTime();

              const newDB = {
                id: createdAt,
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                division: divisionInput.value,
                date: new Date(),
                profile: url,
              };
              registerEmployee(newDB);
            });
          }
        );
      }

      if (!file) {
        const date = new Date();
        const createdAt = date.getTime();

        const newDB = {
          id: createdAt,
          name: nameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          division: divisionInput.value,
          date: new Date(),
          profile: `https://firebasestorage.googleapis.com/v0/b/employee-database-f5521.appspot.com/o/unknown_profile.jpg?alt=media&token=b60d11af-e7a7-4a2c-b798-20b53a1c3429`,
        };
        registerEmployee(newDB);
      }
    });
  }
}
