const loadEl = document.querySelector("#loading");
const imgEl = document.querySelector(".img_section");
const img_inputEl = document.querySelector(".user_imgInput");
const firebaseAddUser = document.querySelector(".section__user_add_btn");
const userAddForm = document.querySelector("#user-add-btn");

const LOCALSTORAGE_DIVISION_VIP = "vip";

userAddForm.addEventListener("click", async () => {
  const userEditFormEl = document.querySelector(".section__user-add-box");
  userEditFormEl.style.display = "block";
});
imgEl.addEventListener("click", () => {
  img_inputEl.click();
});
img_inputEl.addEventListener("change", (e) => {
  readURL(e);
});

firebaseAddUser.addEventListener("click", async (e) => {
  e.preventDefault();
  const img_file = document.querySelector(".user_imgInput").files[0];
  if (!img_file) {
    const response = await fetch("./images/user/user.png");
    const blob = await response.blob();
    img_file = new File([blob], "user.png", { type: "image/png" });
  }
  const storageRef = storage.ref();
  const img_path = storageRef.child("/image" + img_file?.name);
  const img_upload = img_path.put(img_file);

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
        dataObj = dataCheckAddFirebase(dataObj);
      });
    }
  );
});

function getUserInfoData() {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const localData = JSON.parse(localStorage.getItem("user_data"));
  const headerEl = document.querySelector(".main__header");
  const logBox = document.createElement("div");
  logBox.setAttribute("class", "main__header_log-box");
  logBox.innerHTML = `<a class="user_data_name">${userData.name}</a><a class="user_data_logout">로그아웃</a>`;
  headerEl.appendChild(logBox);
  if (userData !== null) {
    if (localData.division === LOCALSTORAGE_DIVISION_VIP) {
      const btnsEl = document.querySelector(".main__btn-box-sub");
      btnsEl.style.display = "none";
      const logoutBtn = document.querySelector(".user_data_logout");
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user_data");
        window.location.href = "login.html";
      });
    } else {
      const logoutBtn = document.querySelector(".user_data_logout");
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user_data");
        window.location.href = "login.html";
      });
    }
    const user_info = document.querySelector(".user_data_name");
    user_info.addEventListener("click", () => {
      const doc_id = localStorage.getItem("uid");
      const userEditFormEl = document.querySelector(".section__user-add-box");
      userEditFormEl.style.display = "block";
      userEditFormEl.innerHTML = "";
      db.collection("usersInfo")
        .doc(doc_id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userForm = managerPageBox(doc.data());
            userEditFormEl.append(userForm);
          }
        });
    });
  } else {
    const headerEl = document.querySelector(".main__header");
    const logBox = document.createElement("div");
    const btnsEl = document.querySelector(".main__btn-box-sub");
    logBox.innerHTML = `<a href="./login.html">로그인</a>`;
    btnsEl.style.display = "none";
    headerEl.appendChild(logBox);
  }
}
window.addEventListener("load", getUserInfoData);

//
//
//
function createListBox(doc_data, doc_id, localData) {
  let userData = document.createElement("div");
  userData.classList.add("user-list-box");
  userData.setAttribute("data-doc-id", doc_id);
  const { image, name, email, phone, division } = doc_data;

  if (localData === null || localData.division === LOCALSTORAGE_DIVISION_VIP) {
    userData.innerHTML = `
    <input type="checkbox" name="docId" class="doc-id" value="${doc_id}" />
    ${
      image === undefined
        ? `<img class='user-list-img' src="./images/user/user.png" alt="" />`
        : `<img class='user-list-img' src=${image} alt="" />`
    }
    <span>${name}</span>
    <span>${email}</span>
    <span>${phone}</span>
    <span>${division}</span>
    `;
  } else {
    userData.innerHTML = `
    <input type="checkbox" name="docId" class="doc-id" value="${doc_id}" />
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
    </div>
    `;
  }
  return userData;
}

function managerPageBox(doc_data) {
  const { image, name, email, phone, password, division } = doc_data;
  const userForm = document.createElement("form");
  userForm.setAttribute("class", "section__user_form");
  userForm.setAttribute("id", "section__user_form");
  userForm.innerHTML = `
      <div class="section__user_img_container">
        <input style="display: none" name="image" type="file" class="user_imgInput" />
        ${
          image === undefined
            ? `<img class='user-list-img' src="./images/user/user.png" alt="" />`
            : `<img class='user-list-img' src=${image} alt="" />`
        }
      </div>
      <input type="text" name="name" class="user_name" value="${name}" placeholder="이름을 입력해주세요." />
      <input type="text" name="phone" class="user_phone" maxlength="14" value="${phone}" placeholder="전화번호를 입력해주세요." />
      <input type="text" class="user_email" name="email" value="${email}" placeholder="이메일을 입력해주세요." readonly />
      <input type="password" name="password" class="user_password" value="${password}" placeholder="비밀번호를 입력해주세요."/>
      <div class="section__user_division_checkbox">
      <label>
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
          </label>
      </div>
      <div class="section__user_button_container">
         <button class="section__user_cancel_btn">확인</button>
      </div>
      `;

  return userForm;
}
function detailPageBox(doc_data, localData) {
  const { image, name, email, phone, password, division } = doc_data;
  const userForm = document.createElement("form");
  userForm.setAttribute("class", "section__user_form");
  userForm.setAttribute("id", "section__user_form");
  if (localData === null || localData.division === LOCALSTORAGE_DIVISION_VIP) {
    userForm.innerHTML = `
      <div class="section__user_img_container">
        <input style="display: none" name="image" type="file" class="user_imgInput" />
        ${
          image === undefined
            ? `<img class='user-list-img' src="./images/user/user.png" alt="" />`
            : `<img class='user-list-img' src=${image} alt="" />`
        }
      </div>
      <input type="text" name="name" class="user_name" value="${name}" placeholder="이름을 입력해주세요." />
      <input type="text" name="phone" class="user_phone" maxlength="14" value="${phone}" placeholder="전화번호를 입력해주세요." />
      <input type="text" class="user_email" name="email" value="${email}" placeholder="이메일을 입력해주세요." readonly />
      <input type="password" name="password" class="user_password" value="${password}" placeholder="비밀번호를 입력해주세요."/>
      <div class="section__user_division_checkbox">
      ${
        division === LOCALSTORAGE_DIVISION_VIP
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
         <button class="section__user_cancel_btn">확인</button>
      </div>
      `;
  } else {
    userForm.innerHTML = `
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
        <input
          type="text"
          class="user_email"
          name="email"
          value="${email}"
          placeholder="이메일을 입력해주세요."
          readonly
        />
      <input
        type="password"
        name="password"
        class="user_password"
        value="${password}"
        placeholder="비밀번호를 입력해주세요."
      />
      <div class="section__user_division_checkbox">
      ${
        division === LOCALSTORAGE_DIVISION_VIP
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
      `;
  }
  return userForm;
}

function readURL(input) {
  if (input.target.files && input.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      imgEl.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(input.target.files[0]);
  }
}

function dataCheckAddFirebase(dataObj) {
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
    const user_checkbox = document.querySelector(
      ".checkbox_division_box.d_vip"
    );
    user_checkbox.checked = true;
    return;
  } else
    firebase
      .auth()
      .createUserWithEmailAndPassword(dataObj.email, dataObj.password)
      .then((userCredential) => {
        // 회원가입 성공
        const user = firebase.auth().currentUser;
        firebase
          .firestore()
          .collection("usersInfo")
          .doc(user.uid)
          .set({
            image: dataObj.image,
            name: dataObj.name,
            phone: dataObj.phone,
            email: dataObj.email,
            password: dataObj.password,
            division: dataObj.division,
            date: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            window.location.href = "./index.html";
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // 오류 처리
        console.log(error.message);
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("이미 사용중인 이메일 입니다.");
            const user_email = document.querySelector(".email_box");
            user_email.value = "";
            user_email.focus();
            return;
          case "auth/invalid-email":
            alert("이메일 양식이 맞지 않습니다.");
            user_email.value = "";
            user_email.focus();
            return;
          case "auth/weak-password":
            alert("비밀번호는 6글자 이상 입력해주세요");
            const user_password = document.querySelector(".password_box");
            user_password.focus();
            return;
        }
      });
}

loadEl.style.display = "block";
db.collection("usersInfo")
  .orderBy("date", "desc")
  .get()
  .then((res) => {
    loadEl.style.display = "none";
    let localData = JSON.parse(localStorage.getItem("user_data"));
    res.forEach((doc) => {
      const usersListBox = document.querySelector(".users-list-box");
      const userData = createListBox(doc.data(), doc.id, localData);
      usersListBox.append(userData);

      userData.addEventListener("click", () => {
        const userEditFormEl = document.querySelector(".section__user-add-box");
        userEditFormEl.style.display = "block";
        userEditFormEl.innerHTML = "";
        db.collection("usersInfo")
          .doc(doc.id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userForm = detailPageBox(doc.data(), localData);
              userEditFormEl.append(userForm);
              userForm
                .querySelector(".user-list-img")
                .addEventListener("click", () => {
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
              const updateBtn = userForm.querySelector(
                ".section__user_edit_btn"
              );
              updateBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                let img_file =
                  document.querySelector(".user_imgInput").files[0];
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
                          console.error("Error updating document: ", error);
                        });
                    });
                  }
                );
              });
            }
          });
      });

      if (localData !== null && localData.division === "manager") {
        const deleteBtn = userData.querySelector(".user-list-btn-delete");

        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          if (!confirm("해당 사용자를 삭제하시겠습니까?")) {
            return;
          }

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
      }
    });
  })
  .catch((err) => {
    loadEl.style.display = "none";
    console.log(err);
  });
