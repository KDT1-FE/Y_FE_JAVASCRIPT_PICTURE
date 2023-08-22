# 대한민국 선수 관리 DB

대한민국 선수 관리(등록, 수정 삭제) 서비스 <br/>
개발기간: 2023.08.08~ 2023.08.18

<img width="1470" alt="스크린샷 2023-08-18 19 26 27" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/56801bf5-29e4-4ca5-a383-b3dcd382ce6c">

<br />

## 배포 주소

배포 주소 : https://sweet-jelly-6687d6.netlify.app

<br />

## 프로젝트 소개

대한민국 선수 관리를 위한 DB 서비스입니다. <br />
Vanilla JavaScript로 SPA를 구현하고 파이어베이스를 연결해 DB를 관리합니다. <br />
선수를 직접 등록 삭제할 수 있고, 실시간 검색 기능으로 선수들의 이름을 통해 원하는 선수를 검색해 볼 수 있습니다.

<br />

## Stacks

### Development

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Github](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

<br />

## :ballot_box_with_check: 필수 요구사항

- [x] “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
- [x] 프로필 페이지를 개발하세요.
- [x] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
- [x] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
- [x] 사진을 등록, 수정, 삭제가 가능해야 합니다.
- [x] 유저 플로우를 제작하여 리드미에 추가하세요.
- [x] 애니메이션 구현
- [x] 상대수치 사용(rem, em)
- [x] DOM event 조작
      <br/>
      <br/>

## :ballot_box_with_check: 선택 요구사항

- [ ] 사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.
- [ ] 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 직원을 등록, 수정, 삭제가 가능하게 해보세요.
- [x] 직원 검색 기능을 추가해 보세요.
- [ ] infinity scroll 기능을 추가해 보세요.
- [x] 사진을 편집할 수 있는 기능을 추가해 보세요.
- [ ] LocalStorage 사용

## 주요 화면

|                                                  1. 메인 페이지                                                  |                                                  2. 프로필 페이지                                                   |
| :--------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| ![main](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/56801bf5-29e4-4ca5-a383-b3dcd382ce6c) | ![profile](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/4571f0e9-bfb9-41be-b349-d04ae8b91bac) |

<br/>

<br/>
## 주요 구현 기능

### 1. 싱글 페이지 어플리리케이션(SPA)

![Aug-18-2023 20-00-21](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/36b0c1b7-eabe-47fd-8140-763ac6df9c4c)

### 2. 실시간 검색 기능

![Aug-18-2023 20-02-07](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/4a535593-0a7e-409e-8b4c-e10fe725184d)

### 3. 반응형 페이지

|                                                   1. 데스크탑                                                    |                                                     2. 모바일                                                      |
| :--------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
| ![main](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/56801bf5-29e4-4ca5-a383-b3dcd382ce6c) | ![mobile](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/ef5eea8b-b2cd-4d1a-b3cb-77aa35d3667a) |

### 4. CRUD

|                                                    데이터 등록                                                     |                                                    데이터 삭제                                                     |
| :----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
| ![create](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/2dfdaec3-3223-437e-928d-fb1a927d7ecb) | ![delete](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/03cb28cc-bca8-46ed-abea-0d6ff8992b6e) |

|                                                     데이터 조회                                                     |                                                    데이터 수정                                                     |
| :-----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
| ![profile](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/45a5f32f-f347-412a-8f7a-9883ff04ec9f) | ![update](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/c5fae23c-121d-42d6-9890-921fab56ed55) |

<br />
<br />

## 아키텍쳐

### 디렉토리 구조

```bash
├── README.md
├── index.html
├── src
    └── constants
          └── routeInfo.js : 라우트 element를 저장합니다
    └── pages :
          └── detail.js : 상세 페이지 입니다.
          └── edit.js : 수정 페이지 입니다.
          └── main.js : 메인(리스트) 페이지 입니다.
          └── post.js : 등록 페이지 입니다.
    └── utils
          └── db.js : firebase 와 연결해줍니다.
          └── navigate.js : 사용자의 History 이벤트를 관리합니다.
    └── app.js
    └── main.js
    └── router.js : 주소에 맞는 페이지 랜더링
├── styles
    └── common.css
    └── detail.css
    └── edit.css
    └── list.css
    └── navigation.css
    └── post.css
```

<br />

### 유저 플로우

![제목을 입력해주세요_-001 (2)](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/57976371/66b270b3-9ef2-44a5-a9a6-f93e65f32f56)

## 느낀점 및 아쉬웠던 점

처음 프로젝트를 받았을 때 너무 막막해 일단 완성만 해보자 생각했고, 처음엔 상세 페이지를 어떻게 Vanilla JavaScript로 구현하지 ? 데이터를 받아오고 다시 조회하고 어떻게 띄울까부터 많은 고민을 했다. 그래서 해결 방안으로 SPA로 구현하면 되겠다고 생각하여 SPA 구현 방법만 하루 넘게 공부했다. 하지만 SPA 구현 중 메인 페이지가 아닌 다른 페이지에서 새로고침을 하면 404 에러가 발생하는 connect-history-api-fallback 현상을 발견하였다. 그래서 마지막에 이를 고치고자 express로 아주 간단한 서버를 구축해 해결하였었는데 더 큰 문제는 배포 방식에서 생겼다. 넷리파이에서의 배포 방식은 내가 만든 코드에 맞지 않았던 것이었고.. 이를 해결하기 위해 노력했지만 끝내 해결하지 못했다. 그래서 이번 과제가 끝나고 리팩토링 기간에 다시 서버를 구현하여 SPA 에러 현상을 수정해보려고 한다.

### 리팩토링 예정

- [ ] SPA connect-history-api-fallback 현상 해결하기 ( 서버를 이용한 배포로)
- [ ] 로딩 애니메이션 만들기 ( 마지막에 만들려고 했는데 시간이 부족했다. )
- [ ] 무할 스크롤 구현해보기 ( 구현 방식을 고민해봤지만 해결하지 못했다.)
