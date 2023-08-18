async function displayProfile() {
  const listProfile = document.querySelector(".profile_container");
  listProfile.innerHTML = "";
  await db
    .collection("person")
    .orderBy("생성일")
    .get()
    .then((snapshot) => {
      console.log(snapshot);
      if (snapshot.size === 0) {
        listProfile.innerHTML = "<p>등록된 선수가 없습니다.</p>";
        return;
      }
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        let containerBox = `
        <div class ="player_profileContainer">
            <img src="${data.사진}" class="player_profilePhoto" onClick="redirectToDetail('${doc.id}')" />
            <div class ="overlay">
                <div class="player_text">${data.닉네임}</div>
                <div class="player_text">선수 상세 보기</div>
            </div>
        </div>`;
        listProfile.innerHTML += containerBox;
      });
    });
}

function redirectToDetail(id) {
  window.location.href = `./html/detail.html?id=${id}`;
}

// 페이지 완전 로드시, 함수 호출하여 초기 선수 목록 자동 표시.
window.onload = displayProfile();
