# 임직원 관리 사이트 (과제)
 > 임직원들의 인적사항을 간단하게 관리할 수 있도록 만들어본 프로젝트입니다.
<br/>

## 총 개발기간
> 2023.08.07 ~ 2023.08.17
<br/>

## 배포 사이트
<p align="center">
  <a href="https://kdt0-eoseungjun.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/임직원%20관리%20사이트-f5?style=for-the-badge&logo=netlify&logoColor=white" alt="MySite"/>

  </a>
</p>
<br/>

## 사용한 스택들
### Tool
![VSCode](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

### Development

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)

<br/>

## 📺 주요 구현화면 및 기능
|                                                           1.  메인 페이지                                                              |                                                         2.  프로필 페이지                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| ![main](/IMG/main.png) |  ![profile](/IMG/profile.png) |

<br/>

> ### 1. 로딩화면 구현

 ![loading](/IMG/loading.gif)
<br/>

> ### 2. 반응형

|                                                           1.  데스크탑                                                              |                                                         2.  모바일                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| ![main](/IMG/desktop.png) |  ![profile](/IMG/mobile.png) |
<br/>

> ### 3. CRUD
|                                                          데이터 등록                                                              |                                                        데이터 삭제                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|   ![create](/IMG/create.gif)  |    ![delete](/IMG/delete.gif)  |

|                                                          데이터 조회                                                              |                                                        데이터 수정                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|   ![profile](/IMG/profile.gif)  |    ![update](/IMG/update.gif)  |

<br/>

## 🖱 User Flow Diagram
![user_flow](/IMG/user-flow.png)

<br/>

## [구현한 필수 요구사항]
- [x] “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
- [x] 프로필 페이지를 개발하세요.
- [x] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
- [x] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
- [x] 사진을 등록, 수정, 삭제가 가능해야 합니다.
- [x] 유저 플로우를 제작하여 리드미에 추가하세요.
* CSS
  * [x] 애니메이션 구현
  * [x] 상대수치 사용(rem, em)
* JavaScript
  * [x] DOM event 조작

## [구현한 선택 요구사항]
- [x] 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] LocalStorage 사용

***

## 새롭게 얻은 인사이트
- npm init 없이 작업하다가, dotenv를 사용해야 했기에 급하게 중간에 웹팩, 번들링, npm 과정을 거쳤는데, 때문에 정신없이 여러 에러들을 겪으면서 실력이 늘었다.
- 번들링 과정에서 css 변수 중복 방지를 위해 접두사(Prefix)를 사용했다.
- AWS S3, Localstorage, DOM을 동시에 다룸으로서 실력이 늘었다. 
- Netlify의 환경변수에서 .env의 값들을 설정하는 법을 알게 되었다.
- 실수로 AWS ACCESS_KEY를 github에 push하면, S3에서 자동으로 감지하여 권한 정책을 추가하기 때문에, 관련 요청을 막아버린다. 따라서 ACCESS_KEY를 gitignore 및 재발급(선택) 하고, 정책 삭제하면, 정상적으로 작동된다.

## 아쉬운 점
- S3, Localstorage 둘다 써보려고 이미지는 S3로 CRUD, 텍스트는 Localstorage로 CRUD하였다. 하지만 수정기능을 동시에 적용하기가 애매해서 이미지에만 적용하였다. 그리고 이미지 이름을 키값으로 S3에서 가져오는 방식인데, 별로 좋은 방법은 아닌 것 같다. Localstorage를 쓰지말걸 그랬다. 리팩토링 때 기회가 되면, 그냥 S3로만 구현해야겠다.
- React에 익숙했었기에, 바닐라 자바스크립트로만 구현하는데 애로사항(이벤트 실행 후, 새로고침하지 않고도 반영되도록 하는 점)이 살짝 있었다. 