const db = firebase.firestore();
var id;

db.collection('product')
    .get()
    .then((결과) => {
        결과.forEach((element) => {
            console.log(element);
            console.log(element.id);
            var buttonid = element.data().이름;
            var 템플릿 = `     <div class="product">
              <div
                  class="thumbnail"
                  style="
                      background-image: url('${element.data().이미지}')"></div>
              <div class="flex-grow-1 p-4">
                  <h3 class="name">${element.data().이름}</h3>
              
                  <p class="species">${element.data().종}</p>
                  <p class="gender">${element.data().성별}</p>

                  <p class="birth">${element.data().생년}</p>
                
                  <p class="date" id="date">   <label for="date">등록일 </label>  ${
                      element.data().등록일
                  }</p>
                  <div><button  class="btn btn-primary correct" onclick="correct('${
                      element.id
                  }')" id="${buttonid}">수정</button><button class="btn btn-primary" onclick="del('${
                element.id
            }')"  >삭제</button></div>
                  </div>
          </div>`;

            $('.container').append(템플릿);
        });
    });
function correct(Id) {
    if (!firebase.auth().currentUser) {
        if (confirm('로그인 후 이용 가능합니다. 로그인 하시겠어요?')) {
            window.location.href = 'login.html';
        }
        return;
    } else {
        window.location.href = `detail.html?id=${Id}`; // 상세 페이지로 이동
    }
}

function del(documentId) {
    if (!firebase.auth().currentUser) {
        if (confirm('로그인 후 이용 가능합니다. 로그인 하시겠어요?')) {
            window.location.href = 'login.html';
        }
        return;
    } else if (confirm('정말로삭제하시겠습니까')) {
        db.collection('product')
            .doc(documentId)
            .delete()
            .then(() => {
                console.log('Document successfully deleted!');
                location.reload();
            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });
    }
}
