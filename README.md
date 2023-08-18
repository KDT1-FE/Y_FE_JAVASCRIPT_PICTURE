# ☕카페 직원 관리 서비스
카페 직원들의 정보를 관리하는 서비스입니다.

## [배포 사이트]
키 관리 이슈 때문에 AWS S3를 제외한 (local storage를 이용) 기능 구현 페이지를 배포하였습니다.

## [과제 기간]
2023.08.07 ~ 2023.08.17

## [필수 요구사항]

- [x] “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
- [x] 프로필 페이지를 개발하세요.
- [x] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
- [x] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
- [x] 사진을 등록, 수정, 삭제가 가능해야 합니다.
- [x] 유저 플로우를 제작하여 리드미에 추가하세요.

* CSS
  - [x] 애니메이션 구현
  - [x] 상대수치 사용(rem, em)
* JavaScript
  - [x] DOM event 조작

## [선택 요구사항]
- [ ] 사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.
- [x] 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 직원을 등록, 수정, 삭제가 가능하게 해보세요.
- [ ] 직원 검색 기능을 추가해 보세요.
- [ ] infinity scroll 기능을 추가해 보세요.
- [ ] 사진을 편집할 수 있는 기능을 추가해 보세요.
- [x] LocalStorage 사용


## [사용 스택]
<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">

## [구현 내용]
### 로딩 페이지
![loadingpage](https://github.com/moonyah/employee-management/assets/51106050/515ec51b-37a2-4826-bce3-d0e8c4cc52eb)
![loadingpage-mobile](https://github.com/moonyah/employee-management/assets/51106050/d2f7f463-99da-4947-a6a2-bc360421efb7)
### 메인 페이지
![listpage](https://github.com/moonyah/employee-management/assets/51106050/fa932d55-7e2d-4af1-8b04-b424d8e5e232)
### 직원 등록 폼 & AWS 3S에 이미지 업로드
![직원등록화면](https://github.com/moonyah/employee-management/assets/51106050/7784085a-e16b-4ae7-9ac2-fdb9660b3135)
![image](https://github.com/moonyah/employee-management/assets/51106050/21ce2d36-5905-4d71-b092-32b4d5ae81a1)
![image](https://github.com/moonyah/employee-management/assets/51106050/f23e182a-75de-4006-9810-0d5a91512396)
![image](https://github.com/moonyah/employee-management/assets/51106050/72036034-ae83-495b-a25f-d2d4fca62359)

## 여러 사람 등록, 삭제
![삭제](https://github.com/moonyah/employee-management/assets/51106050/d5aa22bc-9c4c-4cb0-bfe2-f0f47f7c7a49)
### LocalStorage
![image](https://github.com/moonyah/employee-management/assets/51106050/e74d35c0-3876-4e4c-b0b6-9f12c9a11fe6)
### 전체 삭제
![전체삭제](https://github.com/moonyah/employee-management/assets/51106050/e00d7408-f1be-4300-8a2a-105f9f0bfa51)
![image](https://github.com/moonyah/employee-management/assets/51106050/40863b9b-4d00-4e9a-ba00-a1433880ec77)

### 상세 정보 폼
![상세정보](https://github.com/moonyah/employee-management/assets/51106050/7da6690d-8664-4715-b3d3-e8324d7ad886)

### 모바일 반응형
![모바일반응형](https://github.com/moonyah/employee-management/assets/51106050/fdcf5a03-0f81-4fc9-83c4-acc17d4ec8af)


## [User Flow]
![user-flow](https://github.com/moonyah/employee-management/assets/51106050/00912225-ae33-4fe7-9e6f-e6f80d35639c)

## [아쉬운 점]
- 과제 기간 내에 검색 기능을 구현하지 못했다.
- 직원 정보를 편집하는 기능을 넣지 못햇다. 삭제하고 다시 작성하는 식으로 수정을 해야 한다.
- 아직 AWS 3S를 능숙하게 다루지 못했다.
## [느낀 점]
- Firebase는 전에 해 본 경험이 있어서 AWS 3S를 도전해 보았는데 어려웠지만 AWS를 경험해 본 것에 큰 의미를 둔다.
- Javascript에 대해서 많은 공부를 한 것 같다. 전에는 거의 한 줄도 작성하지 못했는데 이번 과제를 통해 많이 공부한 것 같다.
- AWS 3S를 선택함으로 api 키 관리에 대해서도 많이 알아보게 되었다.

