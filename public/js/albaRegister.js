// Firebase SDK
import { firebaseConfig } from './firebaseConfig.js';

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

$('#sendButton').click(function () {
  const imagePreview = document.getElementById('imagePreview');
  const imageUrl = imagePreview.getAttribute('src');
  // 이미지파일 유효성 검사
  if (imageUrl === '../assets/pictures/no-image.png') {
    alert('이미지를 선택해주세요.');
    return;
  }

  // 인적사항 Form 유효성 검사
  if (
    $('#name').val() === '' ||
    $('#phone').val() === '' ||
    $('#position').val() === '' ||
    $('#workingHours').val() === ''
  ) {
    alert('빈 값이 있습니다. 다시 확인해주세요!');
    return;
  }

  // 이미지 파일 선택
  var file = document.querySelector('#photoInput').files[0];
  var storageRef = storage.ref();
  var 저장할경로 = storageRef.child('image/' + file.name + $('#name'));
  var 업로드작업 = 저장할경로.put(file);

  // 이미지 업로드 기능
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
const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', () => {
  window.history.go(-1);
});

// ------------------------------------------------------------------------
