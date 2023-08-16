// 이미지 등록 시 미리보기 기능
function handleImageChange(event) {
  const imagePreview = document.getElementById("imagePreview");
  const selectedImage = event.target.files[0];

  if (selectedImage) {
    // 이미지 등록 시
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.setAttribute("src", e.target.result); // 등록한 파일로 이미지변경
    };
    reader.readAsDataURL(selectedImage);
  } else {
    // 이미지 등록이 안된 상태는 기본 이미지 출력
    imagePreview.setAttribute("src", "../assets/pictures/no-image.png");
  }
}
// ------------------------------------------------------------------------
// Firebase SDK
import { firebaseConfig } from './firebaseConfig.js';

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

$('#sendButton').click(function () {
  // 이미지 업로드 기능
  var file = document.querySelector('#photoInput').files[0];
  var storageRef = storage.ref();
  var 저장할경로 = storageRef.child('image/' + file.name);
  var 업로드작업 = 저장할경로.put(file);

  업로드작업.on(
    'state_changed',
    // 변화시 동작하는 함수
    null,
    //에러시 동작하는 함수
    (error) => {
      console.error('실패사유: ', error);
    },
    // 성공시 동작하는 함수
    () => {
      업로드작업.snapshot.ref.getDownloadURL().then((url) => {
        console.log('업로드된 경로는', url);

        // 인적사항 업로드 기능
        var albaInfo = {
          이름: $('#name').val(),
          연락처: $('#phone').val(),
          직급: $('#position').val(),
          근무시간: $('#workingHours').val(),
          등록날짜: new Date(),
          이미지: url,
        };

        // 유효성 검사 코드
        if (albaInfo.이름 === '' || albaInfo.연락처 === '' || albaInfo.직급 === '' || albaInfo.근무시간 === '') {
          alert('빈 값이 있습니다.');
          return;
        }

        db.collection('albainfo')
          .add(albaInfo)
          .then((result) => {
            window.location.href = '/albaSelect.html';
            console.log(result);
          })
          .catch((err) => {
            alert('등록실패!');
            console.log(err);
          });
      });
    }
  );
});

// ------------------------------------------------------------------------

// '이전으로' 버튼 기능
const backButton = document.querySelector(".back-button");
backButton.addEventListener("click", () => {
  window.history.go(-1);
});

// ------------------------------------------------------------------------