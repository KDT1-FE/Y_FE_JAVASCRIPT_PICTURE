# KDT0_NohWookJIn

<div align="center">
   <img width="1680" alt="MainPage" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/d9102325-f121-4367-ac6b-4774f5e8ed27">
</div>
<br /><br />

# Employee DB

> **직원 정보(사진) 관리 서비스** <br/> **개발기간: 2023.08.08~ 2023.08.18**

<br />

## 배포 주소

배포 주소 :

<br />

## 프로젝트 소개

직원 정보(사진) 관리 서비스입니다. <br />
파이어베이스를 이용해 실시간으로 DB 정보를 반영합니다. <br />
직원의 개인 정보를 등록 후 정보 변경과 삭제가 가능합니다.

<br />

## Stacks

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Github](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

### Development

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)

<br />

## 화면 구성 📺

|                                                              메인페이지 - 1                                                              |                                                           메인페이지 - 2                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| <img width=“500” alt="Header-Main" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/d9102325-f121-4367-ac6b-4774f5e8ed27"> |  <img width=“500” alt="News" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/0cc0a8e6-f602-40ce-a655-8e88bd7f7562">  |
|                                                               등록 페이지                                                                |                                                             상세 페이지                                                             |
|   <img width=“500” alt="Service" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/3081a470-ebcd-495d-8115-77088c9fcba3">   | <img width=“500” alt="Footer" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/b4789096-4d52-438b-b514-61ad0fd2b115"> |

---

## 주요 기능 📦

### ⭐️ 싱글 페이지 어플리케이션(SPA)입니다.

### ⭐️ 메인 페이지 - 검색이 가능합니다.

<img width="500" alt="Search" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/7fa5d886-d7bc-42df-845d-815626ba2a27">

<br />

### ⭐️ 불러오기 버튼을 통해 전체 직원 리스트를 확인할 수 있습니다.

<img width="500" alt="SyncMode" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/5586724d-1305-493b-9791-17948651bb92">

<br />

### ⭐️ 직원 등록 버튼 / 헤더의 직원 등록 링크를 통해 신규 직원의 정보를 입력할 수 있습니다.

<img width="500" alt="UploadPage" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/b9d903cc-d579-40e3-b906-605c3ed6169e">
<br />

### ⭐️ 직원 리스트의 개별 아이템(상세 직원)을 클릭하면 상세 직원의 정보를 확인할 수 있습니다.

<img width="500" alt="DetailPage" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/00a0b5fa-5f58-4e83-91f1-b9e6e227d2d4">

<br />

### ⭐️ 정보 변경 버튼을 클릭해 정보를 변경할 수 있습니다. 변경시 기존 입력했던 데이터를 유지합니다.

<img width="500" alt="UpdateMode" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/823340dd-c4e5-44a4-a8aa-178a126c7ea0">

<br />

### ⭐️ 정보 삭제 버튼을 클릭해 정보를 삭제할 수 있습니다.

<img width="500" alt="Delete" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/5c33bae8-717f-421f-9fba-ed033f7ccb9b">

<br />

### ⭐️ 잘못된 경로로 접근할 경우 404 NOT FOUND 페이지로 이동합니다.

<img width="500" alt="NOTFOUND" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/0f81f4a8-c67d-4649-8c42-ad7f69520e84">
<br />
<br />

## 아키텍쳐

### 디렉토리 구조

```bash
├── README.md
├── public
├── src
    └── components
          └── Common : 헤더와 같은 공통적으로 App에 들어가는 컴포넌트입니다.
          └── Detail : 상세 페이지에 들어가는 컴포넌트입니다.
          └── Home : 메인 페이지에 들어가는 컴포넌트입니다.
          └── Reg : 등록 페이지에 들어가는 컴포넌트입니다.
    └── routes : index와 각 라우트 컴포넌트입니다.
    └── store : 상태 관리를 위한 state와 firebase DB 함수들로 구성되어 있습니다.
    └── App.js
    └── firebase.js
    └── main.css
    └── main.js
    └── modules.js : Class형 컴포넌트, 라우터(해시 등), Store등 공통적으로 쓰이는 유틸입니다.

```

<br />

## 흐름

### 유저 플로우

<img width="1123" alt="플로우" src="https://github.com/KDT1-FE/Y_FE_HTML_CSS/assets/101846817/feac9083-5189-4a04-93d9-bd6823f9e817">
