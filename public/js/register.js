const db = firebase.firestore();
const storage = firebase.storage();


const uploadBtnEl = document.getElementById('upload-btn');
const resetBtnEl = document.getElementById('reset-btn');

uploadBtnEl.addEventListener('click', () => {
  //입력 폼 유효성 검사 (입력 값이 비어있으면)
  if ($('#name').val() === '') {
    alert('이름을 입력하세요.');
  } if ($('#age').val() === '') {
    alert('나이를 입력하세요.');
  } if ($('#phone').val() === '') {
    alert('휴대폰 번호를 입력하세요.');
  } if ($('#group').val() === '') {
    alert('소속 그룹을 입력하세요.');
    return;
  }

  //휴대폰 번호 유효성 검사 (010-0000-0000 형식에 맞게 입력하지 않았을 시)
  if (!/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test($('#phone').val())) {
    console.log('휴대폰 번호 양식 error');
    alert('휴대폰 번호 양식에 맞춰 입력하세요.');
    return;
  }

  // 이미지 유효성 검사 (이미지를 선택하지 않았을 시)
  const imageUrl = previewImg.getAttribute('src');
  if (imageUrl === 'https://firebasestorage.googleapis.com/v0/b/artist-photo.appspot.com/o/image%2FNo-Image.png?alt=media&token=3dfa5a87-5480-436b-ac2b-fc81fbec36a8') {
    alert('이미지를 선택해주세요.');
    return;
  }

  //이미지 Firebase에 업로드
  var file = document.querySelector('#profileImgInput').files[0];
  var storageRef = storage.ref();
  var 저장할경로 = storageRef.child('image/' + file.name);
  var 업로드작업 = 저장할경로.put(file);
  업로드작업.snapshot.ref.getDownloadURL().then(url => {
    console.log('업로드된 경로는', url);
    // Firestore에 업로드
    const artistInfo = {
      이름: $('#name').val(),
      나이: parseInt($('#age').val()),
      휴대폰번호: $('#phone').val(),
      그룹: $('#group').val(),
      등록날짜: new Date(),
      이미지: url,
    }
    //then() : 성공했을 때 실행할 함수
    //catch() : 실패했을 때 실행할 함수
    db.collection('artistList')
      .add(artistInfo)
      .then(result => {
        //성공 후에 실행할 코드~
        alert('등록 완료!');
        console.log(result);
        window.location.href = "index.html";
      })
      .catch(err => {
        //실패후에 실행할 코드~
        alert('등록 실패!');
        console.error(error);
      })
  })
})


//'취소' 버튼 클릭시 index.html로 돌아감
resetBtnEl.addEventListener('click', () => {
  window.location.href = "index.html";
})