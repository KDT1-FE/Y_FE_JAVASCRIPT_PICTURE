let personId = new URLSearchParams(window.location.search);
const detailWrap = document.getElementById('detail-wrap');
let detailView = '';
const updateBtn = document.getElementById('update-btn');
const completeBtn = document.getElementById('complete-btn');
const auth = firebase.auth();

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
    detailWrap.innerHTML = detailView;
    hideLoadingImage();
  });

// 프로필 정보 수정하기
auth.onAuthStateChanged((user) => {
  updateBtn.addEventListener('click', function () {
  const currentUser = auth.currentUser;
  if(!user){
    alert('로그인 후에 사용 가능합니다');
    window.location.href = './login.html';
    return;
  } else {
    db.collection('person')
    .doc(personId.get('id'))
    .get()
    .then((result) => {
      if (user.uid == 'jusBruEPBGcrT4YlxuBR3wuquYo2' || result.data().uid == currentUser.uid){
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

        // 종류 값 가져오기
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

        imageInput.addEventListener('change', async function (event) {
          const selectedImage = event.target.files[0];
        
          if (!selectedImage) {
            imagePreview.src = '';
            return;
          }
          // firebase에 이미지 등록하고 url 가져오는 함수 후에 
          // data 업데이트 하는 함수로 인자를 전달
          try {
            const imageUrl = await uploadImage(selectedImage);
            imagePreview.src = imageUrl;
            await updateFirestoreImage(imageUrl);
          } catch (error) {
            console.error('Error:', error);
          }

          // firebase에 등록
          async function uploadImage(imageFile) {
            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child('image/' + imageFile.name);
          
            try {
              await imageRef.put(imageFile);
              const imageUrl = await imageRef.getDownloadURL();
              return imageUrl;
            } catch (error) {
              throw new Error('Error uploading image: ' + error.message);
            }
          }
          
          // 현재 이미지 url을 포함하도록 data 업데이트
          async function updateFirestoreImage(imageUrl) {
            const newData = {
              image: imageUrl,
              // ... 기타 필드 데이터 ...
            };
          
            try {
              await db.collection('person').doc(personId.get('id')).update(newData);
            } catch (error) {
              throw new Error('Error updating Firestore: ' + error.message);
            }
          }
        });
      } else{
        alert('작성자만 수정 가능합니다');
        return;
      }
      hideLoadingImage();
    })
  } 
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