const db = firebase.firestore();
const storage = firebase.storage();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const team = document.getElementById("team");
const playerName = document.getElementById("player_name");
const personName = document.getElementById("name");
const birthday = document.getElementById("birthday");
const nickname = document.getElementById("nickname");
const lane = document.getElementById("lane");

if (!id) {
  alert("잘못된 접근입니다.");
} else {
  displayDetailPlayer(id);
}

// 선수 정보 디테일 화면 구성
function displayDetailPlayer(id) {
  const detailContainer = document.querySelector(".player_detail");
  detailContainer.innerHTML = "";

  const playerRef = db.collection("person").doc(id);

  playerRef.get().then((snapshot) => {
    const playerData = snapshot.data();
    console.log(playerData);
    const currentImgURL = playerData.사진;
    const team = playerData.팀명;
    const playerName = playerData.선수명;
    const personName = playerData.선수이름;
    const birthday = playerData.생일;
    const nickname = playerData.닉네임;
    const lane = playerData.라인;

    let containerBox = `
                <div class="player_imgBox">
                  <img src=${currentImgURL} class="player_img"></img>
                </div>
                <div class="player_detailBox">
                    <span>팀명/선수명: ${team}/${playerName}</span>
                    <span>본명: ${personName}</span>
                    <span>생일: ${birthday}</span>
                    <span>닉네임: ${nickname}</span>
                    <span>라인: ${lane}</span>
                </div>
            `;
    detailContainer.innerHTML += containerBox;
  });
}

// 선수 정보 수정
const editHandle = document.querySelector(".edit_btn");

editHandle.addEventListener("click", () => {
  db.collection("person")
    .doc(id)
    .update({
      팀명: team.value,
      선수명: playerName.value,
      선수이름: personName.value,
      생일: birthday.value,
      닉네임: nickname.value,
      라인: lane.value,
    })
    .then(() => {
      alert("변경 완료");
      window.location.href = `../html/detail.html?id=${id}`;
    })
    .catch((err) => {
      console.log(err);
    });
});

// 선수 정보 삭제

document.addEventListener("DOMContentLoaded", () => {
  const removeHandle = document.querySelector(".remove_btn");

  removeHandle.addEventListener("click", () => {
    db.collection("person")
      .doc(id)
      .delete()
      .then(() => {
        alert("수정 완료");
        window.location.href = "../index.html";
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
