import { getStorage, ref, getDownloadURL } from "./firebase.js";
// URL 매개변수 추출 함수
function getParameterByName(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// 페이지 로드 시 실행될 코드
$(document).ready(function () {
  // URL 매개변수에서 정보 추출
  const userName = decodeURIComponent(getParameterByName("name"));
  const userEmail = decodeURIComponent(getParameterByName("email"));
  const userPhone = decodeURIComponent(getParameterByName("phone"));
  const userClassification = decodeURIComponent(
    getParameterByName("classification")
  );

  $("#name").val(userName);
  $("#email").val(userEmail);
  $("#phone").val(userPhone);
  $("#classification").val(userClassification);
  $("#user-name").text(userName);
  $("#user-email").text(userEmail);
  $("#user-phone").text(userPhone);
  $("#user-classification").text(userClassification);

  const storage = getStorage();
  let targetName = userName;
  let targetEmail = userEmail;
  // 모든 로컬 스토리지의 키를 순회
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i); // 특정 인덱스의 키 가져오기
    let value = JSON.parse(localStorage.getItem(key));
    if (value.name === targetName && value.email === targetEmail) {
      if (value.hasImage) {
        getDownloadURL(ref(storage, `image/${key}`))
          .then((url) => {
            console.log(key);
            const img = $(`#userimg`);
            img.attr("src", url);
          })
          .catch((error) => {
            console.log("이미지 가져오기 실패");
          });
      } else {
        getDownloadURL(ref(storage, `image/default.png`))
          .then((url) => {
            const img = $(`#userimg`);
            img.attr("src", url);
          })
          .catch((error) => {
            console.log("이미지 가져오기 실패");
          });
      }
    }
  }
});
