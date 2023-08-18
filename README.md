![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/542c66c8-fc74-49ca-b498-943efadfb390)

# 알바생 인적사항 관리 서비스, 우리알바
 > 아르바이트생의 인적사항을 간단하게 관리할 수 있도록 만들어본 프로젝트입니다.
<br/>


## 🖱 프로젝트 배포 주소
<p align="center">
  <a href="https://we-alba-b3313.web.app/" target="_blank">
    <img src="https://img.shields.io/badge/우리알바-3da557?style=for-the-badge&logo=firebase&logoColor=white" alt="example"/>
   <p align="center">초기 비밀번호는 1234입니다!!</p>
  </a>
</p>

## 총 개발기간
> 2023.08.07 ~ 2023.08.16
<br/>

## 사용한 스택들
### Tool
![VSCode](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white) ![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=white)

### Development

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white) ![JavaScript](https://img.shields.io/badge/jQuery-007ACC?style=for-the-badge&logo=jQuery&logoColor=white)

<br/>

## 📺 주요 구현화면 및 기능
|                                                           1.  웰컴 페이지                                                              |                                                         2.  관리자인증 페이지                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| ![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/d63797eb-18fd-4824-a87c-4e30053b6a3d) |  ![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/fd873108-d0d9-45fd-b977-fb4a15c4e3b8) |

|                                                             **3.  알바생 등록 페이지**                                                                |                                                         **4. 알바생 조회 페이지**                                                             |                                                         **5. 알바생 수정 페이지**                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  ![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/a4b45733-269b-4fe2-ba23-4a4f8bb3099a)  |  ![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/23802725-0c10-4631-a812-2bc6f5f582b3)  |  ![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/ebec25cb-0070-4d52-9b36-16f058dc3651)  |

<br/>

---

> ### 1. 로딩화면 구현

 ![loading](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/5432bc6c-cc05-4f04-b638-22b465f3f437)
<details>
<summary><h3>[ 로딩화면 ] 관련 JS코드</h3></summary>
<br/>

로딩 화면은 로딩바가 가로로 늘어나는 애니메이션을 무한히 반복하도록 했고,
로딩이 완료되면 `window.onload` 이벤트 핸들러를 통해 해당 화면이 사라지도록 했습니다.

```html
<!-- 로딩 화면 추가 -->
    <div class="loading-screen">
      <div class="loading-bar"></div>
    </div>
```
```css
.loading-screen {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3da557;
  transition: opacity 0.5s ease;
  z-index: 1000;
}

.loading-bar {
  width: 441px;
  height: 5px;
  background-color: #ffffff;
  animation: loadingBar 2.5s infinite; /* 애니메이션은 로딩 완료전까지 무한으로 반복 */
  text-align: center;
}

@keyframes loadingBar {
  0% {
    width: 0; /* 로딩 바 초기 길이 */
  }
  100% {
    width: 100%; /* 로딩 바 최종 길이 */
  }
}
```
```js
window.onload = function () {
    const loadingScreen = document.querySelector(".loading-screen");
    
    // 로딩이 완료되면 로딩 화면을 천천히 사라지게 함
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500); // 로딩 화면이 완전히 사라지도록 딜레이 설정
    }, 1000); // 로딩 화면이 보이는 시간
  };
```
</details>

---

<br/>

> ### 2. 암호 유효성 검사 기능

|                                                           입력된 암호가 없을 시                                                              |                                                        잘못된 암호 입력시                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| ![pwck1](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/a3ff5603-e00e-4450-ba48-66baf218e72e)  |  ![pwck2](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/43aef438-0427-4ea4-bb79-3aa1483bdaa1)  |

<details>
<summary><h3>[ 암호 유효성 검사 ] 관련 JS코드</h3></summary>
<br/>

개인적으로 아쉬움이 많이 남았던 부분이었습니다. 

위의 기능은 기본적으로 `로그인을 한 상태` 라는 가정하에 진행된 페이지입니다.

회원가입 및 로그인 기능을 구현하기에는 Firebase 숙련도와 시간적 한계에 부딪혀 `본인인증`이라는 간단한 형태만 잡아둔 상태입니다. 


```html
<!-- 화면 중간 비밀번호 확인용 섹션 -->
    <section class="password-check">
      <h2>매장 관리자 비밀번호 확인</h2>
      <input type="password" id="passwordInput" placeholder="비밀번호 입력"/>
      <button id="loginButton">로그인 하기</button>
      <!-- 비밀번호 오류시 에러메세지 출력 -->
      <div class="error-message" id="errorMessage"></div>
```
```js
const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");

// 유효성 검사 기능 추가
loginButton.addEventListener("click", () => {
  const password = passwordInput.value;
  if (password === "1234") {
    // 로그인 성공 시 직원 관리페이지로 이동
    window.location.href = "myAlba.html";
  } else if (password === "") {
    // 비밀번호 오류 메세지 1 (입력된 값이 없을때)
    errorMessage.textContent = "비밀번호를 입력해주세요!";
    errorMessage.style.display = "block"; // 기존 css 스타일은 none.
    setTimeout(()=>{
      errorMessage.textContent = "";
    }, 3000)
  } else {
    // 비밀번호 오류 메세지 2 (비밀번호가 틀렸을때)
    errorMessage.textContent = "비밀번호를 다시 확인해주세요!";
    errorMessage.style.display = "block";
    setTimeout(()=>{
      errorMessage.textContent = "";
    }, 3000)
  }
});
```
</details>

---

<br/>

> ### 3. 첨부 이미지 미리보기 기능
![imgShow](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/ebb948a9-5d72-49f7-893d-32b320d91fd5)

<details>
<summary><h3>[ 첨부 이미지 미리보기 ] 관련 JS코드</h3></summary>
<br/>

이미지를 등록할 시 사용자들이 등록한 이미지를 바로 확인할 수 있도록 미리보기 기능을 구현했습니다.
`<img>` 태그를 추가하여 이미지를 첨부하지 않은 상태에서는 기본 이미지가 출력되도록 하였고,
이미지를 첨부한 경우에는 FileReader 객체를 생성하여 미리보기 이미지의 데이터 URL을 변경합니다.

```html
<div class="image-upload">
              <img id="imagePreview" src="../assets/pictures/no-image.png" alt="아르바이트생 사진" />
              <input type="file" name="image" id="photoInput" accept="image/*" onchange="handleImageChange(event)" />
            </div>
```
```js
// 이미지 등록 시 미리보기 기능
function handleImageChange(event) {
  const imagePreview = document.getElementById("imagePreview");
  const selectedImage = event.target.files[0];

  if (selectedImage) {
    // 이미지 등록 시
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.setAttribute("src", e.target.result); // 등록한 파일로 미리보기 이미지 src 변경
    };
    reader.readAsDataURL(selectedImage); // 데이터 URL 활용하여 이미지 미리보기 표시
  } else {
    // 이미지 등록이 안된 상태는 기본 이미지 출력
    imagePreview.setAttribute("src", "../assets/pictures/no-image.png");
  }
}
```

</details>

---

<br/>

> ### 4. 데이터 조회 및 프로필 모달창
|                                                          데스크탑 화면                                                              |                                                        모바일 화면                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  ![profile_desktop](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/3ebb9d51-d435-4d81-a125-c9cf24b42fa7)  |  ![profile_mobile](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/a3cc7aba-0262-4573-980f-075155e0a6a4)  |

<details>
<summary><h3>[ 프로필 모달창 ] 관련 JS코드</h3></summary>
<br/>

모달창 기능을 구현하는 도중, 누르려는 버튼의 행에 있는 데이터를 가져올 때 약간의 귀찮음(?)으로 탄생한 코드입니다.

사실 처음에 별 생각 없이 같은 행의 값들 중 `이름`값을 불러와서 
모달창을 구현하려고 하다보니, 등록된 데이터들 중 동명이인이 발생하게 되면 한사람의 프로필만 표시되는 오류가 발생했었습니다.

원래대로라면 DB에 저장된 데이터의 `ID값`을 불러온 이후, 해당 데이터의 속성값들을 modal창에 띄우는 방식을 사용해야겠지만,
'굳이 추가적으로 ID 값을 불러오지 않고서도 현재 부모 행에 존재하는 `전화번호`를 이용하면 되지 않을까' 라는 생각에
DB에 저장된 값들 중 전화번호가 일치하는 값을 들고와서 modal창에 띄우는 방식을 사용했습니다.
(전화번호는 지구상에 모든 사람들이 각기 다른 번호를 가지고 있으니까요!)

지금 PR을 작성하는 현재로써 돌이켜보면 단순한 편법이었다고 생각합니다..

```js
// '조회하기' 버튼 클릭 이벤트 리스너 등록
$(document).on('click', '.edit-button', function () {
  // 클릭한 버튼의 부모 요소에서 데이터 가져오기
  const $parentRow = $(this).closest('tr');
  const phoneNum = $parentRow.find('.alba-phone p').text(); // <--- 이부분. 사실 DB에 저장된 id 값으로 받아오는게 원래 올바른 방법이긴 하다.. ㅎㅎ 

  // 데이터베이스에서 해당하는 데이터 가져오기
  db.collection('albainfo')
    .where('연락처', '==', phoneNum) // <--- DB 에 일치하는 전화번호가 있으면 들고오도록 함!
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        // 모달창에 데이터 채우기
        $('.modal-left-container img').attr('src', data.이미지);
        $('.modal-right-container p:eq(0)').text(`${data.이름}`);
        $('.modal-right-container p:eq(1)').text(`${data.직급}`);
        $('.modal-right-container p:eq(2)').text(`${data.연락처}`);
        $('.modal-right-container p:eq(3)').text(`${data.근무시간}`);
        // 모달창 띄우기
        $('.modal-container').fadeIn();

        // 모달창 버튼 클릭 이벤트 리스너 등록
        $('.update-button').on('click', function () {
          // 정보수정 이동
          const id = doc.id;
          window.location.href = `albaUpdate.html?idvalue=${id}`; // <-- 그런데 또 수정화면으로 보낼땐 url 파라미터에 id값을 보냈다..
          $('.modal-container').fadeOut();
        });
        $('.close-button').on('click', function () {
          // 모달창 닫기
          $('.modal-container').fadeOut();
        });
      }
    })
    .catch((error) => {
      console.error('Error getting document:', error);
    });
});
```

</details>

---

<br/>

> ### 5. 데이터 수정 기능
![profile_update](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/8eb29d3a-ce65-40ff-8932-0612c9fb692d)

<details>
<summary><h3>[ 데이터 수정 ] 관련 JS코드</h3></summary>
<br/>

'Restful.api에서 사용하는 방식처럼 url 끝에 조회하고자 하는 데이터의 id값을 넣어서 보내면 되겠다' 라는 아이디어로 시작하여
 URL 끝에 id값을 포함하여 수정하고자 하는 데이터를 불러올 수 있도록 했습니다. 

```js
$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idValue = urlParams.get('idvalue');  // url에 같이 전송된 id값을 받아옴

  if (idValue) {
    const docRef = db.collection('albainfo').doc(idValue);  // 해당 id 값의 데이터를 받아옴.

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
  }
});
```

</details>

---

<br/>

> ### 6. 데이터 선택 후 일괄삭제 기능
![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/d8ff29a9-e6a9-48a6-a097-b6452dc22d56)

<details>
<summary><h3>[ 일괄삭제 ] 관련 JS코드</h3></summary>
<br/>

해당 부분은 '선택된 데이터가 없으면 모달창을 띄울까, 버튼을 disabled 상태로 만들까' 라며 고민하다가 코드가 많이 꼬인 상태입니다.. 지난 16일에 멘토님께 질문 후 수정중에 있으며, 추후 적용하여 재 배포할 예정입니다.

PR에 올리기 부끄러운 내용이긴 하지만, '혹시라도 다른 분들께서 좀 더 좋은 아이디어를 공유해주실 수 있지 않을까' 라는 기대감에 부끄러움 무릅쓰고 첨부하도록 하겠습니다..!

```js
// 알바생 데이터 삭제
$(document).ready(function () {
  // 삭제 버튼 누르기
  $(document).on('click', '.alba-delete-button', function () {
    // 선택한 알바생 데이터의 id값 추출하여 배열에 저장
    const selectedIds = [];

    // 체크박스 확인
    $('.alba-list-body input[type="checkbox"]:checked').each(async function () {
      const $parentRow = $(this).closest('tr');
      const phoneNum = $parentRow.find('.alba-phone p').text();
      const collection = db.collection('albainfo');
      const docRef = collection.where('연락처', '==', phoneNum);
      const querySnapshot = await docRef.get();
      const storage = firebase.storage();

      if (querySnapshot.size > 0) {
        const doc = querySnapshot.docs[0];
        const id = doc.id;
        selectedIds.push(id);
      }

      const deleteButton = $('.alba-delete-button');
      if (selectedIds.length > 0) {
        deleteButton.removeClass('disabled-button').prop('disabled', false);
      } else {
        deleteButton.addClass('disabled-button').prop('disabled', true);
      }

      if (selectedIds.length > 0) {
        console.log(123);
        $('.confirm-modal-container').fadeIn();
        // 삭제하기 버튼 클릭 이벤트 리스너 등록
        $('.confirm-button').on('click', async function () {
          // 선택한 알바생 데이터 삭제 처리
          const deletePromises = selectedIds.map(async (id) => {
            // Firestore에서 해당 데이터 가져오기
            const docRef = db.collection('albainfo').doc(id);
            const docRefData = await docRef.get();

            // Firestore 문서에 저장된 이미지 URL주소 가져오기
            const imageData = docRefData.data();
            const imageUrl = imageData.이미지; // 속성값에서 이미지 파일 URL 추출

            // Firestore DB에서 데이터 삭제
            await docRef.delete();
            
            // Storage에서 이미지 삭제
            if (imageUrl) {
              const storageRef = storage.refFromURL(imageUrl);
              await storageRef.delete();
            }
          });

          // 삭제 Promise 모두 완료될 때까지 기다림
          await Promise.all(deletePromises);
          window.location.href = 'albaSelect.html'; // 새로고침 기능
        });
      } else {
        console.log(123);
        $('.no-selection-modal-container').fadeIn();
        return;
      }
    });
  });
});
```

</details>

---

<br/>

> ### 사용한 폰트
  - [눈누 - 강원특별자치도체](https://noonnu.cc/font_page/1199)
  - [눈누 - KBO 다이아고딕체](https://noonnu.cc/font_page/1146)

<br/>

## 🖱 User Flow Diagram
![user_flow](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/122848687/1cc69869-d760-463e-ae1f-384eafda7296)
