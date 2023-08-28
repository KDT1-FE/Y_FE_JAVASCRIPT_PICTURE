const joinFormEl = document.querySelector(".main__join_box");
const joinBtnEl = document.querySelector(".join-btn");
const loginBtnEl = document.querySelector(".login-btn");
const user_checkboxsEl = document.querySelectorAll(
  ".checkbox_division_box[type='checkbox']"
);

//

loginBtnEl.addEventListener("click", () => {
  window.location.href = "./login.html";
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

joinFormEl.addEventListener("submit", joinUserInfo);
function joinUserInfo(e) {
  e.preventDefault();
  const formData = new FormData(joinFormEl);
  let dataObj = {};
  for (let [key, value] of formData) {
    dataObj[key] = value;
  }
  console.log(dataObj);
  if (!dataObj.name || dataObj.name.length < 1) {
    alert("이름을 입력해주세요");
    const user_name = document.querySelector(".name_box");
    user_name.focus();
    return;
  }
  if (!dataObj.phone || dataObj.phone.length < 7) {
    alert("전화번호 입력해주세요");
    const user_phone = document.querySelector(".phone_box");
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
    const user_email = document.querySelector(".email_box");
    user_email.focus();
    return;
  }
  if (!dataObj.password || dataObj.password.length < 7) {
    alert("비밀번호을 입력해주세요");
    const user_password = document.querySelector(".password_box");
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
  } else {
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
            name: dataObj.name,
            phone: dataObj.phone,
            email: dataObj.email,
            password: dataObj.password,
            division: dataObj.division,
            date: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            window.location.href = "./login.html";
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
}
