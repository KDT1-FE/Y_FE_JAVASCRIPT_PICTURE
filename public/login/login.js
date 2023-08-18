const joinBtn = document.getElementById("join-btn");
const loginBtn = document.getElementById("login-btn");

//가입하기 버튼 누르면
joinBtn.addEventListener("click", function () {
  const joinName = document.getElementById("join__name").value;
  const joinEmail = document.getElementById("join__email").value;
  const joinPw = document.getElementById("join__pw").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(joinEmail, joinPw)
    .then((result) => {
      const userInfo = {
        name: joinName,
        email: joinEmail,
      };

      db.collection("user")
        .doc(result.user.uid)
        .set(userInfo)
        .then(() => {
          window.location.reload(true);
          alert("회원가입이 완료되었습니다.:)");

          // console.log(result);
          // console.log(result.user);
          result.user.updateProfile({ displayName: joinName });
        });
    });
});

//로그인 버튼 누르면
loginBtn.addEventListener("click", function () {
  const loginEmail = document.getElementById("login__email").value;
  const loginPw = document.getElementById("login__pw").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(loginEmail, loginPw)
    .then((result) => {
      alert("로그인 완료!");
      window.location.href = "/index.html";
      document.querySelector(".user-welcome").classList.remove("none");
      document.querySelector(".logout").classList.remove("none");
      document.querySelector(".login").classList.add("none");
    });
});

//로그인, 회원가입 탭
const tabBtn = document.querySelectorAll(".tab-btn");
const tabCon = document.querySelectorAll(".tab-con");
for (let i = 0; i < tabBtn.length; i++) {
  tabBtn[i].addEventListener("click", function (e) {
    for (let j = 0; j < tabBtn.length; j++) {
      tabBtn[j].classList.remove("act");
      tabCon[j].classList.remove("show");
    }

    tabBtn[i].classList.add("act");
    tabCon[i].classList.add("show");
  });
}
