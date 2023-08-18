# 대한민국 선수 관리 DB

대한민국 선수 관리(등록, 수정 삭제) 서비스 <br/> 개발기간: 2023.08.08~ 2023.08.18

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

## 주요 구현화면 및 기능

| 1. 메인 페이지 | 2. 프로필 페이지 |
| :------------: | :--------------: |
|   ![main]()    |   ![profile]()   |

<br/>

> ### 1. 반응형

| 1. 데스크탑 |  2. 모바일   |
| :---------: | :----------: |
|  ![main]()  | ![profile]() |

<br/>

> ### 2. CRUD
>
> | 데이터 등록 | 데이터 삭제 |
> | :---------: | :---------: |
> | ![create]() | ![delete]() |

| 데이터 조회  | 데이터 수정 |
| :----------: | :---------: |
| ![profile]() | ![update]() |

<br/>
## 주요 기능 📦

### ⭐️ 싱글 페이지 어플리케이션(SPA)입니다.

### ⭐️ 메인 페이지 - 이름으로 검색이 가능합니다.

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

<img width="1123" alt="플로우" src="">
