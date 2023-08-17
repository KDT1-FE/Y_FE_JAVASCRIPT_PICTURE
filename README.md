# 고객 사진 관리 서비스 📷

고객의 사진을 관리할 수 있는 사진 관리자 서비스 만들기

<details>
<summary>과제 요구사항</summary>

### [필수 요구사항]

- “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
- 프로필 페이지를 개발하세요.
- 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
- 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
- 사진을 등록, 수정, 삭제가 가능해야 합니다.
- 유저 플로우를 제작하여 리드미에 추가하세요.
- CSS
  - 애니메이션 구현
  - 상대수치 사용(rem, em)
- JavaScript
  - DOM event 조작

### [선택 요구사항]

- 사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.
- 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- 직원을 등록, 수정, 삭제가 가능하게 해보세요.
- 직원 검색 기능을 추가해 보세요.
- infinity scroll 기능을 추가해 보세요.
- 사진을 편집할 수 있는 기능을 추가해 보세요.
- LocalStorage 사용
</details>

## 프로젝트 기간 📆

2023.08.08 ~ 2023.08.17

## 기술 스택 ⛏️

### 개발 환경

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)


### 사용 언어

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)

## 사이트 주소 🔗

배포 URL: https://taupe-dusk-008178.netlify.app/

## 화면 구성 🖥️

| 헤더 + 메인 페이지 | 고객 등록 페이지 |
| :------------: | :----------: |
| <img width=“500” src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/122ad653-e8b3-44f3-9c0b-a272bcb4ea86"> | <img width=“500” src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/dec94d96-09ff-43fd-85ae-0e253ad97bff"> |
| 고객 상세 정보 페이지 | 고객 정보 수정 페이지 |
| <img width=“500” src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/6efa0c0b-f796-41b9-8f66-6a2f439bc453"> | <img width=“500” src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/18439e31-ff47-44e3-bcdc-0e3adc3793c9"> |

## 주요 기능 🔧

1. 반응형  
   ![1](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/be2c3937-90b4-47bb-b45f-263b0c58fce4)  
   CSS Media Query를 이용해서 모바일, 태블릿, 데스크탑에 맞는 반응형 레이아웃을 구현했습니다.
1. 헤더 그림자  
   ![2](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/d4dabb59-0cb5-4077-8f64-3bc80fa87bd5)  
   스크롤을 내리면 헤더에 그림자가 생겼다가 최상단으로 올라가면 다시 없어지도록 구현했습니다.
   ```js
   window.addEventListener("scroll", function () {
     const headerContainer = document.querySelector(".header-container");
     if (window.scrollY !== 0) {
       headerContainer.classList.add("shadow");
     } else {
       headerContainer.classList.remove("shadow");
     }
   });
   ```
1. 로딩 애니메이션  
   ![3](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/fbd72fb6-0e34-4899-9314-9b282b7d1dd1)  
   데이터가 로드되기 전 css 클래스 선택자와 애니매이션 효과를 이용하여 스켈레톤 레이아웃이 나온 뒤 로드된 데이터가 나오도록 했습니다.

1. 고객 검색  
   ![4](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/ee94ab8c-b1d4-4e84-ac51-7369780830f2)  
   Firestore의 `getDocs`를 이용해서 고객 이름, 이메일, 전화번호, 등급으로 검색 가능하고 정확히 일치하면 결과가 나오도록 구현했습니다.
1. 고객 삭제 (복수 삭제 가능)  
   ![5](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/f31fe458-dd7f-4ca7-a193-0372380ba0b9)  
   배열에 체크한 고객의 ID를 담아 Firestore의 `deleteDoc()` 메서드로 요청을 보내 고객 목록에서 체크하여 한명 또는 여러명의 고객을 삭제할 수 있습니다.
1. 고객 사진 등록  
   ![123](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/8c8765ce-a569-4851-91f9-890242763002)
   Firebase Storage의 `uploadBytes()`를 이용하여 사진을 등록하고 `getDownloadURL()` 메소드로 업로드된 사진의 URL을 받아 표시할 수 있도록 했습니다.

1. 고객 정보 등록  
   ![456](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/b4e88ae7-d33a-4766-9253-d9aee9a60881)
   Firebase Firestore의 `addDoc()`를 이용하여 고객의 사진 URL, 이름, 이메일, 전화번호, 구분(일반, VIP, VVIP)를 저장했습니다.

1. 고객 상세 조회  
   ![8](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/b3349387-2ed5-45b3-81ca-73a2e3f975d4)  
   Firestore에서 `getDoc()` 메소드로 고객의 ID를 찾아 고객의 정보를 조회했습니다.

1. 고객 사진 삭제, 수정  
   ![123456](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/264016ce-6b42-4449-a696-b2c6900f905a)

   img 태그의 src를 없애서 보여지는 사진을 삭제하거나 Firebase Storage에 새로운 이미지를 업로드하고 URL을 받아서 표시하는 방식으로 구현했습니다.

1. 고객 정보 수정  
   ![10](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/439f271a-4175-4597-bcc0-a95e1dc7041a)  
   Firestore의 `setDoc()`메소드를 이용해서 고객 정보 수정 기능을 구현했습니다.

## 유저 플로우

![유저 플로우](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79249376/50b0756f-6940-4708-83f5-1c15baa50343)

## 아쉬운 점 😥

- 검색  
  입력받은 값을 여러개로 나눠서 Cloud Firestore에 추가로 저장하면 가능할 것 같은데 이름만 검색하거나 휴대폰 번호의 가운데만 입력하여 검색하는 등의 변수가 너무 많다고 생각되어 검색어를 정확히 입력해야만 결과가 나오도록 구현한 것이 아쉽다.
- SPA  
  자바스크립트만으로 SPA를 구현하려고 하니 까다로워서 구현하지 못한 것이 아쉽다.

## 느낀점 🧐

리액트로 서비스를 구축할 때는 쉽게 SPA를 구현하고 중복되는 코드를 컴포넌트로 만들어 효율적으로 코드를 짤 수 있었는데 HTML에 직접 입력하고 자바스크립트로 요소를 만들어서 삽입하려니 불편했다.  
또한 네트워크가 느릴 때는 자바스크립트를 로드하는데 시간이 걸려서 스켈레톤이 늦게 보이는 것을 HTML에 직접 자바스크립트를 적어주어 해결하면서 네트워크가 느릴 때는 자바스크립트 로드에도 시간이 오래 걸리고 HTML에 인라인으로 적어주면 빠르게 로드할 수 있다는 점을 알 수 있었다.
