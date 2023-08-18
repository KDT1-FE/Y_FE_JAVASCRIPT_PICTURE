## TK Company 직원 관리 서비스

- 가상회사 TK company의 직원 DB 개발
- 개발 기간 : 2023.08.08 ~ 2023.08.18
- [배포주소](https://deploy--peaceful-heliotrope-44df2b.netlify.app/)

### 주요 기능

- 직원 정보 등록 (사진 & 인적사항)
- 직원 정보 상세 보기
- 직원 정보 수정 / 삭제

### 주요 기능 상세

|       기능        |                                           이미지                                            | 설명                                                                                        |
| :---------------: | :-----------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------ |
|   1. 직원 조회    |  <img src="https://turkey-mm-bucket.s3.ap-northeast-2.amazonaws.com/home.png" width="500">  | - S3의 직원목록 로드                                                                        |
|   2. 직원 등록    | <img src="https://turkey-mm-bucket.s3.ap-northeast-2.amazonaws.com/enroll.png" width="500"> | - 모달창 구현 <br> - 업로드 사진 미리보기 <br> - 사진 미등록 시, <br>기본프로필 이미지 설정 |
|   3. 정보 수정    |  <img src="https://turkey-mm-bucket.s3.ap-northeast-2.amazonaws.com/edit.gif" width="500">  | - 모달창 구현 <br> - 사진/인적사항 변경                                                     |
| 4. 직원 정보 삭제 | <img src="https://turkey-mm-bucket.s3.ap-northeast-2.amazonaws.com/delete.gif" width="500"> |
|   5. 반응형 웹    | <img src="https://turkey-mm-bucket.s3.ap-northeast-2.amazonaws.com/mobile.gif" width="500"> |

### 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/js-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/AMAZON S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">

<br>

### USER-FLOW

<img src="https://turkey-mm-bucket.s3.ap-northeast-2.amazonaws.com/userFlow.png" width="700">

### 요구사항

1. 필수

- [x] “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
- [x] 프로필 페이지를 개발하세요.
- [x] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
- [x] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
- [x] 사진을 등록, 수정, 삭제가 가능해야 합니다.
- [x] 유저 플로우를 제작하여 리드미에 추가하세요.
- [x] 애니메이션 구현
- [x] DOM 조작

2. 선택

- [x] 직원을 등록, 수정, 삭제가 가능하게 해보세요.
- [x] LocalStorage 사용
