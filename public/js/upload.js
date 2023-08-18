const db = firebase.firestore();
const storage = firebase.storage();

const registerBtn = document.querySelector(".register_btn");

const team = document.getElementById("team");
const playerName = document.getElementById("player_name");
const personName = document.getElementById("name");
const birthday = document.getElementById("birthday");
const nickname = document.getElementById("nickname");
const lane = document.getElementById("lane");
const date = new Date();

registerBtn.addEventListener("click", () => {
  // 이미지 업로드
  var playerProfile = document.querySelector("#player_profile").files[0];

  var storageRef = storage.ref();
  var storeRoute = storageRef.child("image/" + playerProfile.name);

  storeRoute
    .put(playerProfile)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .then((path) => {
      const playerData = {
        팀명: team.value,
        선수명: playerName.value,
        선수이름: personName.value,
        생일: birthday.value,
        닉네임: nickname.value,
        라인: lane.value,
        생성일: date,
        사진: path,
      };
      return db.collection("person").add(playerData);
    })
    .then((res) => {
      alert("등록 완료 했습니다.");
      window.location.href = "../index.html";
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
