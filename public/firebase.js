const firebaseConfig = {
  apiKey: "AIzaSyCRGQbFr6N75QKYWEc87ize36EV0nZDkjk",
  authDomain: "member-management-bc4f1.firebaseapp.com",
  projectId: "member-management-bc4f1",
  storageBucket: "member-management-bc4f1.appspot.com",
  messagingSenderId: "6436543004",
  appId: "1:6436543004:web:c47939788df0d5b8f99dd9",
  measurementId: "G-L4Q3J34JT6",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
db.collection("userlist")
  .orderBy("date", "desc")
  .get()
  .then((res) => {
    res.forEach((doc) => {
      const usersListBox = document.querySelector(".users-list-box");
      const { image, name, email, phone, division } = doc.data();
      let userData = document.createElement("div");
      userData.classList.add("user-list-box");
      userData.setAttribute("data-doc-id", doc.id);
      userData.innerHTML = `
        <input type="checkbox" name="docId" value="${doc.id}" />
        <img src=${image} alt="" />
        <span>${name}</span>
        <span>${email}</span>
        <span>${phone}</span>
        <span>${division}</span>
        <div class="user-list-btn-box data-01">
            <button class="user-list-btn-edit">수정</button>
            <button class="user-list-btn-delete">삭제</button>
        </div>`;
      usersListBox.append(userData);
      userData
        .querySelector(".user-list-btn-edit")
        .addEventListener("click", () => {
          const userEditFormEl = document.querySelector(
            ".section__user-add-box"
          );
          const docId = userData.getAttribute("data-doc-id");
          db.collection("userlist")
            .doc(docId)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const { image, name, email, phone, password, division } =
                  doc.data();
                const userEditBox = document.querySelector(
                  ".section__user-add-box"
                );
                userEditBox.innerHTML = `
                <form action="" class="section__user_form" id="section__user_form">
                <div class="section__user_img_container">
                  <input
                    style="display: none"
                    name="image"
                    type="file"
                    class="user_imgInput"
                  />
                  <img class="img_section" src="${image}" />
                </div>
                <input
                  type="text"
                  name="name"
                  class="user_name"
                  value="${name}"
                  placeholder="이름을 입력해주세요."
                />
                <input
                  type="text"
                  name="phone"
                  class="user_phone"
                  maxlength="14"
                  value="${phone}"
                  placeholder="전화번호를 입력해주세요."
                />
                <div class="section__user_email_container">
                  <input
                    type="text"
                    class="user_email"
                    name="email"
                    value="${email}"
                    placeholder="이메일을 입력해주세요."
                  />
                </div>
                <input
                  type="password"
                  name="password"
                  class="user_password"
                  value="${password}"
                  placeholder="비밀번호를 입력해주세요."
                />
                <div class="section__user_division_checkbox">
                ${
                  division === "vip"
                    ? `<label>
                <input
                  type="checkbox"
                  name="division"
                  value="vip"
                  class="section__user_checkbox_division"
                  checked
                />vip
              </label>
              <label>
                <input
                  type="checkbox"
                  name="division"
                  value="manager"
                  class="section__user_checkbox_division"
                />관리자
              </label>`
                    : `<label>
              <input
                type="checkbox"
                name="division"
                value="vip"
                class="section__user_checkbox_division"
              />vip
            </label>
            <label>
              <input
                type="checkbox"
                name="division"
                value="manager"
                class="section__user_checkbox_division"
                checked
              />관리자
            </label>`
                }
                </div>
                <div class="section__user_button_container">
                  <button class="section__user_edit_btn" type="submit">
                    수정
                  </button>
                  <button class="section__user_cancel_btn">취소</button>
                </div>
              </form>
                `;
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
          userEditFormEl.style.display = "block";
        });
      userData
        .querySelector(".user-list-btn-delete")
        .addEventListener("click", () => {
          const docId = userData.getAttribute("data-doc-id");
          db.collection("userlist")
            .doc(docId)
            .delete()
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error removing document: ", error);
            });
        });
    });
  });
