import { storage, ref, uploadBytes, deleteObject } from "./firebase.js";

const blackContainer = $(".black-bg");
const closeBtn = $(".close");
// 모달창 열고 닫기 리스너
$(".add-btn").click(() => {
  blackContainer.addClass("show");
});

blackContainer.click((e) => {
  if ($(e.target).is($(blackContainer)) || $(e.target).is($(closeBtn))) {
    blackContainer.removeClass("show");
  }
});

// 데이터 추가
$("form").on("submit", async (event) => {
  // 모달창이 편집창이라면
  if ($(event.currentTarget)[0] === $(".edit-form")[0]) {
    event.preventDefault();
    let targetValue = $("#user-name").text();

    // 모든 로컬 스토리지의 키를 순회
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i); // 특정 인덱스의 키 가져오기
      let value = JSON.parse(localStorage.getItem(key)); // 해당 키에 해당하는 값 가져오기

      if (value.name === targetValue) {
        console.log("찾은 키:", key);
        let file = $("#img")[0].files[0];
        value.name = $("#name").val();
        value.email = $("#email").val();
        value.phone = $("#phone").val();
        value.classification = $("#classification").val();
        // 공란 여부 체크
        if(value.name==='' || value.email==='' || value.phone==='' || value.classification===''){
          alert('공란이 있습니다.')
          return ;
        }

        // 파일창이 안보일경우(이미지 바꾸기 희망 X)
        if ($('input[type="file"].none').length > 0) {
          localStorage.setItem(key, JSON.stringify(value));
          window.location.href = "index.html";
        } else { // 이미지 바꾸기 체크가 되었다면
          let userImage = $("#img")[0].files[0] ? true : false; // 이미지 파일의 유무
          value.hasImage = userImage;
          const desertRef = ref(storage, `image/${value.key}`);
          // 기존 이미지 삭제하고 업로드
          deleteObject(desertRef)
            .then(() => {
              const newImageRef = ref(storage, "image/" + value.key);

              uploadBytes(newImageRef, file).then((snapshot) => {
                localStorage.setItem(key, JSON.stringify(value));
                window.location.href = "index.html";
              });
            })
            .catch((error) => {});
        }
      } else {
        console.log("없음");
      }
    }
  } else {
    event.preventDefault();

    let file = $("#img")[0].files[0];
    let userName = $("#name").val();
    let userEmail = $("#email").val();
    let userPhone = $("#phone").val();
    let userClassification = $("#classification").val();
    let uniqueKey = Date.now().toString();
    let userImage = $("#img")[0].files[0] ? true : false;

    if(userName==='' || userEmail==='' || userPhone==='' || userClassification===''){
      alert('공란이 있습니다.')
      return ;
    }
    const storageRef = ref(storage, "image/" + uniqueKey);

    uploadBytes(storageRef, file).then((snapshot) => {
      let userInfo = {
        box: false,
        name: userName,
        email: userEmail,
        phone: userPhone,
        classification: userClassification,
        hasImage: userImage,
        key: uniqueKey,
      };
      localStorage.setItem(uniqueKey, JSON.stringify(userInfo));
      $(".black-bg").removeClass("show");
      window.location.href = "index.html";
    });
  }
});

// 편집창 이미지 바꾸기 체크박스 
$(".changeImage").on("click", (e) => {
  $("#img").toggleClass("none");
});
