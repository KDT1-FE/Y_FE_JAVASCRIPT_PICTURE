const userAddBtnsEl = document.querySelectorAll("#user-add-btn");
const cancelBtnEl = document.querySelector(".section__user_cancel_btn");
const addBtnEl = document.querySelector(".section__user_add_btn");
const headerMenuBtnEl = document.querySelector(".main__header_menu-btn");

const imgEl = document.querySelector(".img_section");
const img_inputEl = document.querySelector(".user_imgInput");
const user_checkboxsEl = document.querySelectorAll(
  ".section__user_checkbox_division[type='checkbox']"
);
const loadEl = document.querySelector("#loading");

function getUserInfoData() {
  const userData = JSON.parse(sessionStorage.getItem("user_data"));
  console.log(userData);
  if (userData !== null) {
    const headerEl = document.querySelector(".main__header");
    const aEl = document.createElement("a");
    aEl.innerHTML = `<a class="user_data_name">${userData.name}</a>`;
    headerEl.appendChild(aEl);
  } else {
    const headerEl = document.querySelector(".main__header");
    const aEl = document.createElement("a");
    aEl.innerHTML = `<a href="./login.html">로그인</a>`;
    headerEl.appendChild(aEl);
  }

  const user_data_name = document.querySelector(".user_data_name");
  if (user_data_name !== null) {
    user_data_name.addEventListener("click", () => {
      console.log("ggg");
      console.log(userData);
      const userEditFormEl = document.querySelector(".section__user-add-box");
      userEditFormEl.style.display = "block";
      userEditFormEl.innerHTML = "";
      const userForm = document.createElement("form");
      userForm.setAttribute("class", "section__user_form");
      userForm.setAttribute("id", "section__user_form");
      userForm.innerHTML = `
                  <form action="" class="section__user_form" id="section__user_form">
                  <div class="section__user_img_container">
                    <input
                      style="display: none"
                      name="image"
                      type="file"
                      class="user_imgInput"
                    />
                    ${
                      userData.image === undefined
                        ? `<img class='user-list-img' src="./images/user/user.png" alt="" />`
                        : `<img class='user-list-img' src=${userData.image} alt="" />`
                    }
                  </div>
                  <input
                    type="text"
                    name="name"
                    class="user_name"
                    value="${userData.name}"
                    placeholder="이름을 입력해주세요."
                  />
                  <input
                    type="text"
                    name="phone"
                    class="user_phone"
                    maxlength="14"
                    value="${userData.phone}"
                    placeholder="전화번호를 입력해주세요."
                  />
                  <div class="section__user_email_container">
                    <input
                      type="text"
                      class="user_email"
                      name="email"
                      value="${userData.email}"
                      placeholder="이메일을 입력해주세요."
                    />
                  </div>
                  <input
                    type="password"
                    name="password"
                    class="user_password"
                    value="${userData.password}"
                    placeholder="비밀번호를 입력해주세요."
                  />
                  <div class="section__user_division_checkbox">
                  ${
                    userData.division === "vip"
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
      userEditFormEl.append(userForm);
    });
  }
}

window.addEventListener("load", getUserInfoData);

userAddBtnsEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    const userAddForm = document.querySelector(".section__user-add-box");
    userAddForm.style.display = "block";
  });
});
cancelBtnEl.addEventListener("click", () => {
  const userAddForm = document.querySelector(".section__user-add-box");
  userAddForm.style.display = "none";
});
window.addEventListener("click", (event) => {
  const userAddForm = document.querySelector(".section__user-add-box");
  if (event.target === userAddForm) {
    userAddForm.style.display = "none";
  }
});

function readURL(input) {
  if (input.target.files && input.target.files[0]) {
    let reader = new FileReader();

    reader.onload = (e) => {
      imgEl.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(input.target.files[0]);
  }
}
img_inputEl.addEventListener("change", (e) => {
  readURL(e);
});
imgEl.addEventListener("click", () => {
  img_inputEl.click();
});

user_checkboxsEl.forEach((checkbox) => {
  checkbox.onchange = (e) => {
    if (e.target.checked) {
      user_checkboxsEl.forEach((outherCheckbox) => {
        if (outherCheckbox !== e.target) {
          outherCheckbox.checked = false;
        }
      });
    }
  };
});

addBtnEl.addEventListener("click", async (e) => {
  e.preventDefault();
  let img_file = document.querySelector(".user_imgInput").files[0];
  if (!img_file) {
    const response = await fetch("./images/user/user.png");
    const blob = await response.blob();
    img_file = new File([blob], "user.png", { type: "image/png" });
  }
  let storageRef = storage.ref();
  let img_path = storageRef.child("/image" + img_file?.name);
  let img_upload = img_path.put(img_file);

  img_upload.on(
    "state_changed",
    // 변화시 동작하는 함수
    null,
    //에러시 동작하는 함수
    (error) => {
      console.error("error:", error);
    },
    // 성공시 동작하는 함수
    () => {
      img_upload.snapshot.ref.getDownloadURL().then((url) => {
        const user_info_data = document.querySelector(".section__user_form");
        const formdata = new FormData(user_info_data);
        let dataObj = {};
        for (let [key, value] of formdata) {
          dataObj[key] = value;
        }
        dataObj.image = url;
        if (!dataObj.name || dataObj.name.length < 1) {
          alert("이름을 입력해주세요");
          const user_name = document.querySelector(".user_name");
          user_name.focus();
          return;
        }
        if (!dataObj.phone || dataObj.phone.length < 7) {
          alert("전화번호 입력해주세요");
          const user_phone = document.querySelector(".user_phone");
          user_phone.focus();
          return;
        }
        if (!dataObj.phone.includes("-")) {
          dataObj.phone = dataObj.phone
            .replace(/[^0-9]/g, "")
            .replace(
              /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
              "$1-$2-$3"
            );
        }
        if (!dataObj.email || !dataObj.email.includes("@")) {
          alert("이메일을 입력해주세요");
          const user_email = document.querySelector(".user_email");
          user_email.focus();
          return;
        }
        if (!dataObj.password || dataObj.password.length < 2) {
          alert("비밀번호을 입력해주세요");
          const user_password = document.querySelector(".user_password");
          user_password.focus();
          return;
        }

        if (!dataObj.division) {
          alert("분류를 선택해주세요");
          return;
        } else {
          db.collection("usersInfo")
            .add({
              ...dataObj,
              date: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((result) => {
              user_info_data.reset();
              window.location.href = "/index.html";
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  );
});

loadEl.style.display = "block";
db.collection("usersInfo")
  .orderBy("date", "desc")
  .get()
  .then((res) => {
    loadEl.style.display = "none";
    res.forEach((doc) => {
      const usersListBox = document.querySelector(".users-list-box");
      const { image, name, email, phone, division } = doc.data();
      let userData = document.createElement("div");
      userData.classList.add("user-list-box");
      userData.setAttribute("data-doc-id", doc.id);
      userData.innerHTML = `
        <input type="checkbox" name="docId" class="doc-id" value="${doc.id}" />
        ${
          image === undefined
            ? `<img class='user-list-img' src="./images/user/user.png" alt="" />`
            : `<img class='user-list-img' src=${image} alt="" />`
        }
        <span>${name}</span>
        <span>${email}</span>
        <span>${phone}</span>
        <span>${division}</span>
        <div class="user-list-btn-box data-01">
            <button class="user-list-btn-delete"><img class='delete-btn-icon' src='../images/icons/delete.png'/></button>
        </div>`;
      userData.addEventListener("click", async () => {
        const userEditFormEl = document.querySelector(".section__user-add-box");
        db.collection("usersInfo")
          .doc(doc.id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const { image, name, email, phone, password, division } =
                doc.data();
              userEditFormEl.style.display = "block";
              userEditFormEl.innerHTML = "";
              const userForm = document.createElement("form");
              userForm.setAttribute("class", "section__user_form");
              userForm.setAttribute("id", "section__user_form");
              userForm.innerHTML = `
                <form action="" class="section__user_form" id="section__user_form">
                <div class="section__user_img_container">
                  <input
                    style="display: none"
                    name="image"
                    type="file"
                    class="user_imgInput"
                  />
                  ${
                    image === undefined
                      ? `<img class='user-list-img' src="./images/user/user.png" alt="" />`
                      : `<img class='user-list-img' src=${image} alt="" />`
                  }
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
              userEditFormEl.append(userForm);

              userForm
                .querySelector(".user-list-img")
                .addEventListener("click", () => {
                  console.log("수정이미지");
                  console.log(userForm);
                  userForm.querySelector(".user_imgInput").click();
                });
              userForm
                .querySelector(".user_imgInput")
                .addEventListener("change", (e) => {
                  readURL(e);
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                      userForm.querySelector(".user-list-img").src =
                        e.target.result;
                    };
                    reader.readAsDataURL(file);
                  }
                });
              userForm
                .querySelector(".section__user_edit_btn")
                .addEventListener("click", async (e) => {
                  e.preventDefault();
                  let img_file =
                    userForm.querySelector(".user_imgInput").files[0];
                  if (!img_file) {
                    const response = await fetch("./images/user/user.png");
                    const blob = await response.blob();
                    img_file = new File([blob], "user.png", {
                      type: "image/png",
                    });
                  }
                  let storageRef = storage.ref();
                  let img_path = storageRef.child("/image" + img_file?.name);
                  let img_upload = img_path.put(img_file);
                  img_upload.on(
                    "state_changed",
                    // 변화시 동작하는 함수
                    null,
                    //에러시 동작하는 함수
                    (error) => {
                      console.error("error:", error);
                    },
                    // 성공시 동작하는 함수
                    () => {
                      img_upload.snapshot.ref.getDownloadURL().then((url) => {
                        const formdata = new FormData(userForm);

                        let dataObj = {};
                        for (let [key, value] of formdata) {
                          dataObj[key] = value;
                        }
                        dataObj.image = url;

                        if (!dataObj.name || dataObj.name.length < 1) {
                          alert("이름을 입력해주세요");
                          const user_name =
                            document.querySelector(".user_name");
                          user_name.focus();
                          return;
                        }
                        if (!dataObj.phone || dataObj.phone.length < 7) {
                          alert("전화번호 입력해주세요");
                          const user_phone =
                            document.querySelector(".user_phone");
                          user_phone.focus();
                          return;
                        }
                        if (!dataObj.phone.includes("-")) {
                          dataObj.phone = dataObj.phone
                            .replace(/[^0-9]/g, "")
                            .replace(
                              /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
                              "$1-$2-$3"
                            );
                        }
                        if (!dataObj.email || !dataObj.email.includes("@")) {
                          alert("이메일을 입력해주세요");
                          const user_email =
                            document.querySelector(".user_email");
                          user_email.focus();
                          return;
                        }
                        if (!dataObj.password || dataObj.password.length < 2) {
                          alert("비밀번호을 입력해주세요");
                          const user_password =
                            document.querySelector(".user_password");
                          user_password.focus();
                          return;
                        }

                        if (!dataObj.division) {
                          alert("분류를 선택해주세요");
                          return;
                        } else {
                          const docId = userData.getAttribute("data-doc-id");
                          const docRef = db.collection("usersInfo").doc(docId);
                          return docRef
                            .update({
                              ...dataObj,
                              date: firebase.firestore.FieldValue.serverTimestamp(),
                            })
                            .then(() => {
                              window.location.href = "/index.html";
                            })
                            .catch((error) => {
                              // The document probably doesn't exist.
                              console.error("Error updating document: ", error);
                            });
                        }
                      });
                    }
                  );
                });
            } else {
            }
          });
      });
      usersListBox.append(userData);

      userData
        .querySelector(".user-list-btn-delete")
        .addEventListener("click", () => {
          const docId = userData.getAttribute("data-doc-id");
          db.collection("usersInfo")
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
  })
  .catch((error) => {
    loadEl.style.display = "none";
    console.log(error);
  });
