

if (localStorage.getItem("user") != null) {
    console.log("현재로그인중");
    //로컬스토리지에서 유저정보 가져오기
    const localDataUser = localStorage.getItem("user");
    const localName = JSON.parse(localDataUser).displayName;
    document.querySelector("#user-name").innerHTML = localName + "님";
    document.querySelector(".welcome__logout").classList.remove("none");
    document.querySelector(".welcome__login").classList.add("none");
} else {
  console.log("현재로그아웃중");
  localStorage.removeItem("user");
  document.querySelector(".welcome__logout").classList.add("none");
  document.querySelector(".welcome__login").classList.remove("none");
}


//로그인 상태 확인. 로그인,로그아웃,새로고침 등 유저 인증상태 변경시마다 실행됨
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    console.log(user.displayName + "로그인 완료");
    document.querySelector(".welcome__logout").classList.remove("none");
    document.querySelector(".welcome__login").classList.add("none");

    //로컬스토리지에 유저정보 저장
    localStorage.setItem("user", JSON.stringify(user));
    // userUid = user.uid;
    // console.log(userUid)
  } else if ((user = null)) {
    localStorage.removeItem("user");
    document.querySelector(".welcome__logout").classList.add("none");
    document.querySelector(".welcome__login").classList.remove("none");
  }
});

const logoutBtn = document.getElementById("logout-btn");
//로그아웃 버튼 누르면
logoutBtn.addEventListener("click", function () {
  firebase.auth().signOut();
  localStorage.removeItem("user");
  alert("로그아웃 완료!");
  document.querySelector(".welcome__logout").classList.add("none");
  document.querySelector(".welcome__login").classList.remove("none");
});


function deleteBtnClick() {
    //db정보 삭제
    db.collection("member")
      .doc(queryString.get("id"))
      .delete()
      .then(() => {
        alert("삭제되었습니다.");
        window.location.href = "/";
  
        //이미지 삭제
        var deleteFilename = document.getElementById("image-delete").value;
        var deleteRef = storage.refFromURL(deleteFilename);
        // console.log(deleteRef)
  
        deleteRef
          .delete()
          .then(function () {
            console.log("File deleted successfully");
          })
          .catch(function (error) {
            console.error("Error removing file.", error);
          });
      });
  }

  function editBtnClick(){
    window.location.href='/edit/edit.html?id='+ queryString.get('id')
}

  
  function alertLogin(){
      alert('로그인이 필요합니다!')
      window.location.href='login/login.html'
  }



