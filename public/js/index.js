const storage = firebase.storage();
const db = firebase.firestore();

//firestore에 저장된 데이터 불러서 화면에 출력
db.collection('artistList')
  .get()
  .then(snapshot => {
    // console.log(snapshot);
    snapshot.forEach(doc => {
      // console.log(doc.data())
      // console.log(doc);
      var template = `<tr>
      <td class="artist-list-ckb-td"><input type="checkbox" /></td>
      <td class="artist-list-img-td">
        <img src="${doc.data().이미지}" alt="아티스트 프로필 사진" />
      </td>
      <td class="artist-list-name-td">${doc.data().이름}</td>
      <td class="artist-list-phone-td">${doc.data().휴대폰번호}</td>
      <td class="artist-list-age-td">${doc.data().나이}세</td>
      <td class="artist-list-group-td">${doc.data().그룹}</td>
      <td class="artist-list-edit-td"><button id="edit-btn" class="edit-btn btn orange-btn">정보 수정</button></td>
    </tr>`;
      $('.artist-list-body').append(template);
    })
  })

// '정보 수정' 버튼 클릭 시 profile.html(정보 수정 페이지)로 이동하면서 id 값 넘기기
$(document).on('click', '.edit-btn', function () {
  // 클릭한 버튼의 부모 요소에서 데이터 가져오기
  const parentRow = $(this).closest('tr');
  //부모 요소에서 phone 클래스(=휴대폰 번호)를 갖는 요소의 텍스트 가져오기
  const phoneNum = parentRow.find('.artist-list-phone-td').text();

  // 데이터베이스에서 해당하는 데이터 가져오기
  db.collection('artistList')
    .where('휴대폰번호', '==', phoneNum)
    .get()
    .then(snapshot => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const id = doc.id;
        window.location.href = `profile.html?id=${id}`;
      }
    })
    .catch(err => {
      console.error(err);
    });
});


//버튼 조작
const registerBtnEl = document.getElementById('register-btn');
const removeBtnEl = document.getElementById('remove-btn');

//'등록' 버튼 누르면 refister.html로 이동
registerBtnEl.addEventListener('click', () => {
  window.location.href = "register.html";
})

//체크박스 선택 후 '삭제' 버튼 누르면 삭제 실행
removeBtnEl.addEventListener('click', () => {

  if ($('input:checkbox[type="checkbox"]:checked').length === 0) {
    //체크박스를 선택하지 않고 삭제 버튼을 누르면 alert 창 띄우기
    alert('삭제할 항목을 선택하세요.');
  } else {
    // 체크박스 확인
    $('input:checkbox[type="checkbox"]:checked').each(function () {
      // 선택한 체크박스의 부모 요소 선택
      const parentRow = $(this).closest('tr');
      //부모 요소에서 해당 체크박스의 phone 클래스(=휴대폰 번호)를 갖는 요소의 텍스트 가져오기
      const phoneNum = parentRow.find('.artist-list-phone-td').text();

      // 선택한 알바생 데이터의 id값 추출하여 배열에 저장
      const selectedIds = [];

      // 데이터베이스에서 해당하는 데이터 가져오기
      db.collection('artistList')
        .where('휴대폰번호', '==', phoneNum)
        .get()
        .then(snapshot => {
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const id = doc.id;
            // const imgURL = doc.data().이미지;
            //위 코드는 왜 안될까...?
            // console.log(doc.data().이미지);
            selectedIds.push(id);

            //id가 같은 데이터 firebase에서 삭제하기
            selectedIds.forEach(item => {
              const docRef = db.collection('artistList').doc(item)

              //firebase에서 이미지 삭제
              if (docRef.이미지) {
                let imageRef = storage.refFromURL(doc.data().이미지);
                imageRef.delete();
              }

              //firebase에서 데이터 삭제
              docRef
                .delete()
                .then(() => {
                  window.location.href = 'index.html';
                })
            })
          }
        })
        .catch(err => {
          console.error(err);
        })
    })
  }
})
