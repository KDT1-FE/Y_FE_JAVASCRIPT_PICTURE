# Cookie 임직원 프로필 등록 관리 서비스

> 개발 기간: 2023-08-08 ~ 2023-08-18  
> 개발 인원: 1명

## 🚩 개발 설명

Cookie 임직원 프로필을 등록 수정 확인 삭제가 가능한 웹 페이지입니다.

### 배포 링크

<a href="https://kdt-fe-js-project.vercel.app/">https://kdt-fe-js-project.vercel.app/</a>

### 개발 스택
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/>  

### User flow

<img src="https://postfiles.pstatic.net/MjAyMzA4MThfMjEg/MDAxNjkyMzQ2MDgyMTc2.YBQ2oQFZbX4iLy9eFNAX8dldIYSOUeQMwmRyDTBL83Eg.pAGIJOudgwq3rZllFB6NTvUXT6AWe5MWf1yB5EgBHtsg.PNG.tkyoun0421/userflow.png?type=w966">

### 주요 기능

1.프로필 등록  
<img src="./프로필 등록.gif" width="500"/>   
> 프로필 사진과 정보들을 input 태그에 입력하고 이 데이터들을 사진은 firebase storage에 텍스트 정보들은 firestore에 전송합니다.

2.프로필 수정  
<img src="./프로필 수정.gif" width="500" />  
> 프로필에 수정된 데이터들을 서버와 비교하여 변경된 데이터들을 업데이트합니다.

3.프로필 삭제  
 <img src="./프로필 삭제.gif" width="500" />
 > 해당 프로필과 동일한 아이디를 참조한 후 해당 필드를 서버에서 삭제하고 요소에서도 삭제합니다.

4.프로필 검색  
<img src="./프로필 검색.gif" width="500" />
> input 태그로 쓰여진 문자 데이터와 서버의 데이터를 비교한 후 일치하는 데이터를 반환합니다.

## :cat: 필수요구사항

-   [x] “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
-   [x] 프로필 페이지를 개발하세요.
-   [x] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
-   [x] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
-   [x] 사진을 등록, 수정, 삭제가 가능해야 합니다.
-   [x] 유저 플로우를 제작하여 리드미에 추가하세요.
-   [x] CSS 애니메이션 구현
-   [x] CSS 상대수치 사용(rem, em)
-   [x] JS DOM event 조작

## :clap: 선택요구사항

-   [ ] 사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.
-   [x] 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
-   [x] 직원을 등록, 수정, 삭제가 가능하게 해보세요.
-   [x] 직원 검색 기능을 추가해 보세요.
-   [ ] infinity scroll 기능을 추가해 보세요.
-   [ ] 사진을 편집할 수 있는 기능을 추가해 보세요.
-   [ ] LocalStorage 사용

## 🚀 프로젝트 개발시 개선해야할 점
* 객체지향 방식의 개발 방식
* 로그인 기능 구현 및 권한
* 검색 기능 고도화
* 아키텍쳐에 대한 이해
* 성능 최적화에 대한 이해
* CRUD의 고도화
* Firebase에 대한 이해
* 비동기처리에 대한 이해