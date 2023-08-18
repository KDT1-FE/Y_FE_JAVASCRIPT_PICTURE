const joinBtnEl = document.querySelector(".join-btn");
const loginBtnEl = document.querySelector(".login-btn");
const loginDataFormEl = document.querySelector(".main__login_box");
joinBtnEl.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./join.html";
});

loginDataFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(loginDataFormEl);
  let dataObj = {};
  for (const [key, value] of formData.entries()) {
    dataObj[key] = value;
  }
  if (!dataObj.email || !dataObj.email.includes("@")) {
    alert("이메일을 입력해주세요");
    const user_email = document.querySelector(".email_box");
    user_email.focus();
    return;
  }
  if (!dataObj.password || dataObj.password.length < 2) {
    alert("비밀번호을 입력해주세요");
    const user_password = document.querySelector(".password_box");
    user_password.focus();
    return;
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(dataObj.email, dataObj.password)
      .then(() => {
        const user = firebase.auth().currentUser;

        const uid = user.uid;
        const userRef = firebase.firestore().collection("usersInfo").doc(uid);
        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const user_data = JSON.stringify(doc.data());
              sessionStorage.setItem("user_data", user_data);
              sessionStorage.setItem("uid", uid);

              window.location.href = "./index.html";
            } else {
              console.log("No such user!");
            }
          })
          .catch((error) => {
            console.log("Error getting user:", error);
          });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found" || "auth/wrong-password":
            alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
          case "auth/network-request-failed":
            alert("네트워크 연결에 실패 하였습니다.");
          case "auth/invalid-email":
            alert("잘못된 이메일 형식입니다.");
          case "auth/internal-error":
            alert("잘못된 요청입니다.");
          default:
            alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
        }
      });
  }
});
