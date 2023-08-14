const userAddBtnsEl = document.querySelectorAll("#user-add-btn");
const cancelBtnEl = document.querySelector(".section__user_cancel_btn");
const addBtnEl = document.querySelector(".section__user_add_btn");

const imgEl = document.querySelector(".img_section");
const img_inputEl = document.querySelector(".user_imgInput");
const user_checkboxsEl = document.querySelectorAll(
  ".section__user_checkbox_division[type='checkbox']"
);

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
        console.log(formdata);
        console.log(dataObj);
        dataObj.image = url;
        if (!dataObj.name || dataObj.name.length < 1) {
          alert("이름을 입력해주세요");
          const user_name = document.querySelector(".user_name");
          user_name.focus();
          return;
        }
        if (!dataObj.phone || dataObj.phone.length < 1) {
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
          console.log(dataObj);
          db.collection("userlist")
            .add(dataObj)
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
