// ---------------------------------------------------------------------------------
// Firebase SDK
import { firebaseConfig } from './firebaseConfig.js';

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idValue = urlParams.get('idvalue');

  if (idValue) {
    const docRef = db.collection('albainfo').doc(idValue);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          // 데이터를 이용하여 폼 필드에 값을 설정하거나 화면에 표시
          $('#imagePreview').attr('src', data.이미지);
          $('#name').val(data.이름);
          $('#phone').val(data.연락처);
          $('#position').val(data.직급);
          $('#workingHours').val(data.근무시간);
        } else {
          console.error('오류발생! 데이터를 불러올 수 없음!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
      
    // 수정 버튼 클릭 시 데이터 수정
    $('#sendButton').click(function () {
      const updatedData = {
        이름: $('#name').val(),
        연락처: $('#phone').val(),
        직급: $('#position').val(),
        근무시간: $('#workingHours').val(),
        // 기타 필요한 필드 추가
      };

      // 이미지 업로드 처리
      const selectedImage = $('#photoInput')[0].files[0];
      if (selectedImage) {
        const storageRef = storage.ref(`images/${selectedImage.name}`);
        storageRef
          .put(selectedImage)
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
          })
          .then((downloadURL) => {
            // 업로드된 이미지 URL을 데이터와 함께 업데이트
            updatedData.이미지 = downloadURL;
            // 데이터 업데이트
            docRef
              .update(updatedData)
              .then(() => {
                console.log('문서 업데이트 완료');
                window.location.href = '/albaSelect.html';
              })
              .catch((error) => {
                console.error('오류 발생:', error);
              });
          })
          .catch((error) => {
            console.error('이미지 업로드 오류:', error);
          });
      } else {
        // 이미지가 선택되지 않은 경우 데이터만 업데이트
        docRef
          .update(updatedData)
          .then(() => {
            window.location.href = '/albaSelect.html';
            console.log('문서 업데이트 완료');
          })
          .catch((error) => {
            alert('등록실패!');
            console.log(err);
          });
      }
    });

    // '이전으로' 버튼 기능
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', () => {
      window.history.go(-1);
    });
  }
});
