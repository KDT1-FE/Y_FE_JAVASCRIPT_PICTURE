const sendBtn = document.getElementById('send-btn');
const storage = firebase.storage();
let imageUrl = '';
const auth = firebase.auth();
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');
const previewWrap = document.querySelector('.preview-wrap');
const deleteBtn = document.querySelector('delete-btn');

previewWrap.style.display = 'none';
hideLoadingImage();

// 이미지 미리보기
imageInput.addEventListener('change', function (event) {
  previewWrap.style.display = 'block';

  const selectedImage = event.target.files[0];

  if (selectedImage) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(selectedImage);
  } else {
    imagePreview.src = '';
  }
});

// 프로필 새로 등록하기
auth.onAuthStateChanged((user) => {
  if (user) {
    // 사용자가 로그인한 상태

    const displayName = user.displayName;

    // 상품 업로드 관련 로직 실행
    const sendData = function () {
      // 이미지 저장하기
      let file = document.querySelector('#image').files[0];
      let storageRef = storage.ref();
      let storageDir = storageRef.child('image/' + file.name);
      let storageUpload = storageDir.put(file);

      // 이미지 url 구하기
      storageUpload.on(
        'state_changed',
        // 변화시 동작하는 함수
        showLoadingImage(),
        //에러시 동작하는 함수
        (error) => {
          console.error('실패사유는', error);
        },
        // 성공시 동작하는 함수
        () => {
          storageUpload.snapshot.ref.getDownloadURL().then((url) => {
            console.log('업로드된 경로는', url);
            imageUrl = url;
            // 입력한 값 등록하기
            let nameValue = document.getElementById('name').value;
            let ageValue = Number(document.getElementById('age').value);
            let sortValue = document.getElementById('sort').value;
            let maleRadio = document.getElementById('male');
            let femaleRadio = document.getElementById('female');
            let genderValue = '';
            let memoValue = document.getElementById('significant').value;

            if (maleRadio.checked) {
              genderValue = '남';
            } else if (femaleRadio.checked) {
              genderValue = '여';
            }

            db.collection('person')
              .add({
                name: nameValue,
                gender: genderValue,
                age: ageValue,
                sort: sortValue,
                image: imageUrl,
                uid: JSON.parse(localStorage.getItem('user')).uid,
                memo: memoValue,
                currentUser: displayName,
              })
              .then((result) => {
                console.log(result);
                alert('등록 완료되었습니다');
                window.location.href = '../index.html';
                // 성공 후에 실행할 코드
                hideLoadingImage();
              })
              .catch((err) => {
                alert(err);
                // 실패 후에 실행할 코드
              });
          });
        }
      );
    };
    sendBtn.addEventListener('click', sendData);
  } else {
    // 사용자가 로그인하지 않은 상태
    // 로그인 페이지로 리다이렉트 또는 로그인을 유도하는 메시지 표시 등
    alert('로그인 후에 사용 가능합니다');
    window.location.href = './login.html';
  }
});