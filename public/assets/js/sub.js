let personId = new URLSearchParams(window.location.search);
const detailWrap = document.getElementById('detail-wrap');
let detailView = '';
const updateBtn = document.getElementById('update-btn');
const completeBtn = document.getElementById('complete-btn');
const chatBtn = document.getElementById('chat-btn');

showLoadingImage();

completeBtn.style.display = 'none';

// 초기 렌더링
db.collection('person')
  .doc(personId.get('id'))
  .get()
  .then((result) => {
    detailView = `
<div class="detail-inner">
  <h5 class="image"><img src="${result.data().image}"></h5>
  <hr />
  <p class="lists">담당 상담사 : ${result.data().currentUser}</p>
  <p class="lists">이름 : ${result.data().name}</p>
  <p class="lists">성별 : ${result.data().gender}</p>
  <p class="lists">나이 : ${result.data().age}</p>
  <p class="lists">진행상황 : ${result.data().sort}</p>
  <p class="lists">특이사항 : ${result.data().memo}</p>
</div>
    `;
    // console.log(result);
    // console.log(result.data());
    detailWrap.innerHTML = detailView;
    hideLoadingImage();
  });

// 프로필 정보 수정하기
updateBtn.addEventListener('click', function () {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser) {
    alert('로그인 후에 사용 가능합니다');
    window.location.href = './login.html';
    return;
  }

  db.collection('person')
    .doc(personId.get('id'))
    .get()
    .then((result) => {
      if (currentUser.uid === result.data().uid) {
        // 성별 값 가져오기
        const genderValue = result.data().gender;
        let femaleChecked = 'checked';
        let maleChecked = 'checked';

        // 성별 라디오 버튼 체크하기

        if (genderValue === '남') {
          maleChecked = 'checked';
          femaleChecked = '';
        } else if (genderValue === '여') {
          maleChecked = '';
          femaleChecked = 'checked';
        }

        // 성별 값 가져오기
        const sortValue = result.data().sort;
        let selected1 = '';
        let selected2 = '';
        let selected3 = '';

        if (sortValue === '상담중') {
          selected1 = 'selected';
        } else if (sortValue === '종결') {
          selected2 = 'selected';
        } else if (sortValue === '치료중') {
          selected3 = 'selected';
        }

        detailView = `

  <div class="detail-inner">
    <h5 class="image">
      <input type="file" id="image" />
      <p class="preview-wrap">
        <img src="${result.data().image}" id="image-preview">
      </p>
    </h5>
  <hr />

  <p class="lists"><input type="text" class="form-control" id="name" placeholder="이름" value="${result.data().name}" /></p>

  <p class="lists">
  <div class="form-check">
    <input type="radio" class="form-check-input" id="male" name="gender" value="male" ${maleChecked} />
    <label class="form-check-label" for="male">남</label>
  </div>
  <div class="form-check">
    <input type="radio" class="form-check-input" id="female" name="gender" value="female" ${femaleChecked} />
    <label class="form-check-label" for="female">여</label>
  </div>
</p>

  <p class="lists"><input type="text" class="form-control" id="age" placeholder="나이" value="${result.data().age}" /></p>

  <p class="lists">
  <select id="sort" class="form-control">
  <option value="">진행상황</option>
  <option value="상담중" ${selected1}>상담중</option>
  <option value="종결" ${selected2}>종결</option>
  <option value="치료중" ${selected3}>치료중</option>
  </select>
</p>

  <p class="lists">
    <textarea name="significant" id="memo" class="form-control" cols="10" rows="10" value="${result.data().memo}">${result.data().memo}</textarea>
  </p>
</div>
  `;

        detailWrap.innerHTML = detailView;
        completeBtn.style.display = 'inline-block';
        updateBtn.style.display = 'none';

        const imageInput = document.getElementById('image');
        const imagePreview = document.getElementById('image-preview');
        const previewWrap = document.querySelector('.preview-wrap');
        const deleteBtn = document.querySelector('delete-btn');

        // 이미지 미리보기
        imageInput.addEventListener('change', function (event) {
          const selectedImage = event.target.files[0];

          if (selectedImage) {
            const reader = new FileReader();

            reader.onload = function (e) {
              imagePreview.src = e.target.result;

              const storageRef = firebase.storage().ref();
              const imageRef = storageRef.child('image/' + selectedImage.name);

              imageRef
                .put(selectedImage)
                .then(() => {
                  console.log('Image uploaded successfully');

                  // 업로드한 이미지의 URL을 받아옴
                  imageRef
                    .getDownloadURL()
                    .then((imageUrl) => {
                      // imageUrl을 사용하여 Firebase Firestore에 업데이트
                      const newData = {
                        // ... 기타 필드 데이터 ...
                        image: imageUrl, // 업로드한 이미지의 URL
                      };

                      db.collection('person')
                        .doc(personId.get('id'))
                        .update(newData)
                        .then(() => {
                          console.log('Firestore updated with image URL');
                        })
                        .catch((error) => {
                          console.error('Error updating Firestore:', error);
                        });
                    })
                    .catch((error) => {
                      console.error('Error getting image URL:', error);
                    });
                })
                .catch((error) => {
                  console.error('Error uploading image:', error);
                });
            };

            reader.readAsDataURL(selectedImage);
          } else {
            imagePreview.src = '';
          }
        });
      } else {
        alert('작성자만 수정 가능합니다');
      }
      hideLoadingImage();
    })
    .catch((error) => {
      console.error('Error getting document:', error);
      hideLoadingImage();
    });
});

// 수정 완료하기
completeBtn.addEventListener('click', function () {
  let newNameValue = document.getElementById('name').value;
  let newAgeValue = document.getElementById('age').value;
  let newSortValue = document.getElementById('sort').value;
  let newMemoValue = document.getElementById('memo').value;
  let maleRadio = document.getElementById('male');
  let femaleRadio = document.getElementById('female');

  db.collection('person')
    .doc(personId.get('id'))
    .get()
    .then((result) => {
      const existData = result.data();
      let newGenderValue = '';

      if (maleRadio.checked) {
        newGenderValue = '남';
      } else if (femaleRadio.checked) {
        newGenderValue = '여';
      }

      const updatedData = {
        ...existData,
        name: newNameValue,
        gender: newGenderValue,
        age: newAgeValue,
        sort: newSortValue,
        memo: newMemoValue,
      };

      db.collection('person')
        .doc(personId.get('id'))
        .update(updatedData)
        .then(() => {
          console.log('DATA updated');
          detailView = `

          <div class="detail-inner">
  <h5 class="image"><img src="${updatedData.image}"></h5>
  <hr />
  <p class="lists">담당 상담사 : ${updatedData.currentUser}</p>
  <p class="lists">이름 : ${updatedData.name}</p>
  <p class="lists">성별 : ${updatedData.gender}</p>
  <p class="lists">나이 : ${updatedData.age}</p>
  <p class="lists">진행상황 : ${updatedData.sort}</p>
  <p class="lists">특이사항 : ${updatedData.memo}</p>
</div>
    `;
          detailWrap.innerHTML = detailView;
          completeBtn.style.display = 'none';
          updateBtn.style.display = 'inline-block';
        });
    })

    .catch((error) => {
      console.log('Error updating data:', error);
    });
});