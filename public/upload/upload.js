//비로그인시 업로드 불가
if (localStorage.getItem("user") == null) {
  document.querySelectorAll("input").forEach((el) => {
    el.addEventListener("focus", function () {
      alert("로그인 후 업로드 가능합니다!");
      this.blur();
    });
  });
}

// 올리기 버튼을 누르면 입력한 정보 db저장
document.getElementById("send").addEventListener("click", function () {
  if (localStorage.getItem("user") != null) {
    //스토리지에 이미지 저장

    const file = document.querySelector("#image").files[0];
    const storageRef = storage.ref();
    const imgPath = storageRef.child(
      "image/" + Math.round(Math.random() * 9999) + file
    );

    const upload = imgPath.put(file);

    //이미지 업로드 성공,실패 확인
    upload.on(
      "state_changed",
      // 변화시 동작하는 함수
      null,
      //에러시 동작하는 함수
      (error) => {
        console.error("실패사유는", error);
      },
      // 성공시 동작하는 함수
      () => {
        upload.snapshot.ref.getDownloadURL().then((url) => {
          //이미지 url 가져오기
          console.log("업로드된 경로는", url);

          const saveData = {
            name: document.getElementById("name").value,
            ext: document.getElementById("tel").value,
            team: document.getElementById("team").value,
            rank: document.getElementById("rank").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            memo: document.getElementById("memo").value,
            img: url,
            uid: JSON.parse(localStorage.getItem("user")).uid,
            username: JSON.parse(localStorage.getItem("user")).displayName,
          };

          console.log(name, phone, email, rank, memo);

          db.collection("member")
            .add(saveData)
            .then((result) => {
              window.location.href = "/index.html";
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  } else {
    alert("로그인 후 업로드 가능합니다!");
  }
});
