const db = firebase.firestore();
const storage = firebase.storage();

//document가 준비되면 불러온 데이터 화면에 보여주기
$(document).ready(function () {
  //현재 주소url 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  //현재 주소url에서 idvalue 값 가져오기
  const id = urlParams.get('id');

  if (id) {
    const docRef = db.collection('artistList').doc(id);
    docRef
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const data = snapshot.data();
          // firebase 에서 가져온 데이터를 input의 값으로 넣어줌
          $('#previewImg').attr('src', data.이미지);
          $('#name').val(data.이름);
          $('#phone').val(data.휴대폰번호);
          $('#age').val(data.나이);
          $('#group').val(data.그룹);
        } else {
          console.error(error);
          alert('데이터를 불러올 수 없습니다!');
        }
      })
      .catch(error => {
        console.error(error);
        alert('데이터를 불러올 수 없습니다!')
      })

    // '사진 삭제' 버튼
    const removeImgBtnEl = document.getElementById('remove-img-btn');

    removeImgBtnEl.addEventListener('click', () => {
      const previewImg = document.getElementById('previewImg');

      //미리보기 이미지 기본 이미지로 변경
      previewImg.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/artist-photo.appspot.com/o/image%2FNo-Image.png?alt=media&token=3dfa5a87-5480-436b-ac2b-fc81fbec36a8");


      //firebase에서 프로필 사진을 기본 이미지로 변경
      docRef.update({ "이미지": "https://firebasestorage.googleapis.com/v0/b/artist-photo.appspot.com/o/image%2FNo-Image.png?alt=media&token=3dfa5a87-5480-436b-ac2b-fc81fbec36a8" });
    })

    // '수정' 버튼 클릭 시
    $('#edit-btn').click(event => {

      //로딩 애니메이션 노출
      var animation = `
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
      </div>`;
      $('.loading-wrap').append(animation)

      // e.stopPropagation();

      //새로 입력받은(수정된) 데이터 저장
      const updatedData = {
        이름: $('#name').val(),
        휴대폰번호: $('#phone').val(),
        나이: $('#age').val(),
        그룹: $('#group').val(),
      }

      // 이미지 변경 처리
      var file = document.querySelector('#profileImgInput').files[0];

      if (file) {
        var storageRef = storage.ref();
        var 저장할경로 = storageRef.child('image/' + file.name);
        var 업로드작업 = 저장할경로.put(file);
        업로드작업.snapshot.ref.getDownloadURL()
          .then(url => {
            // 새로 업로드된 이미지 url을 업데이트
            updatedData.이미지 = url;
            console.log('새로운 이미지 경로 : ', url);

            // 데이터 업데이트
            docRef
              .update(updatedData)
              .then(result => {
                console.log('업데이트 완료!', result);
                alert('업데이트 완료!');
                window.location.href = 'index.html';
              })
              .catch(error => {
                console.error('업데이트실패!', error);
                alert('업데이트 실패!');
              })
          })
          .catch(error => {
            console.error('Firebase에 이미지 업데이트 실패!', error);
            alert('Firebase에 이미지 업데이트 실패!');
          })
      } else {
        // 이미지가 선택되지 않은 경우 데이터만 업데이트
        docRef
          .update(updatedData)
          .then(result => {
            console.log('Firebase에 데이터 업데이트 완료!', result);
            window.location.href = 'index.html';
          })
          .catch(error => {
            console.error('Firebase에 데이터 등록 실패!', error);
            alert('Firebase에 데이터 등록 실패!');
          });
      }
    })

    // 'Home' 버튼
    const resetBtnEl = document.getElementById('reset-btn');
    resetBtnEl.addEventListener('click', () => {
      window.location.href = "index.html";
    })
  }
})