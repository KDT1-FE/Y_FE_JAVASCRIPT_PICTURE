<div align="center">
  <img src = "https://github.com/JitHoon/zero-car/assets/101972330/c7c34562-9610-4e30-aa25-d39e83078dd3" alt ="zero car" style="width: 200px; height: 200px"/>
</div>

<br/>

<p align="center">
  <a href="https://jithoon.github.io/zero-car/">
    <img src="https://img.shields.io/badge/Zero Car (영차!)-navy?style=for-the-badge&logoColor=white" alt="zero car"/>
  </a>
  <a href="https://github.com/JitHoon/zero-car">
    <img src="https://img.shields.io/badge/배포 Refository-212125?style=for-the-badge&logoColor=white" alt="배포 레포"/>
  </a>
  <p align="center">임시 아이디 : 최지훈, 임시 비밀번호 : 777</p>
  <p align="end">개발자: 최지훈(Jit Hoon)</p>
</p>

## [ Zero Car (영차!) 개요 ]
Zero Car(영차!)는 운전자 보험 고객 사진 및 정보 관리를 CRUD 할 수 있는 서비스입니다.

## [ Environment ]
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)![Firebase](https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)![npm](https://img.shields.io/badge/npm-%23CB3837?style=for-the-badge&logo=npm)![webpack](https://img.shields.io/badge/webpack-8DD6F9.svg?&style=for-the-badge&logo=WEBPACK&logoColor=white)![bable](https://img.shields.io/badge/babel-F9DC3E.svg?&style=for-the-badge&logo=BABEL&logoColor=white)

> 다양한 서비스 중에 어느 것을 사용할지 결정하는 기준은 "나의 서비스의 요구 사항에 적합한가?" 이다.

<details>
<summary>나는 왜 Firebase를 선택했는가?</summary>

### [ 내 서비스 요구 사항 ]
1. 10일이라는 짧은 개발 시간
2. 간단한 CRUD 기능만 필요
3. 간단한 구조의 DB만 사용 됨
4. DB 구축 경험보다 검색, 정렬, 이미지 미리 보기 등 다양한 기능 구현 경험이 더 중요
    
### [ AWS와 Firebase 비교 ]

<details>
<summary>첫 째, AWS와 Firebase의 공통 기능</summary>

1. Auth (인증 기능)
2.  **_Storage (저장소 기능 : 주요 사용 기능)_**
3. Push notifications (알림 보내기 기능)
5. Hosting (호스팅 기능)
6. Analytics (분석 기능)
</details>
<details>
<summary>둘 째, 앱의 프런트엔드와 통합하는 방법</summary>

**Firebase**
 1. Android , iOS, Web 용 SDK(Software development kit)를 제공
    - 프런트엔드 개발자는 백엔드 기술에 의존하지 않고도 쉽게 웹 개발 가능
2. REST API가 있어서 사용자가 원하는 API를 구축할 수도 있습니다.

**AWS**
1. Android, iOS, React Native에 통합하는 데 사용할 수 있는 AppSync라는 모바일 개발자에게 매우 좋은 솔루션을 제공
</details>
<details>
<summary>셋 째, AWS와 Firebase의 장점</summary>

**Firebase**
1. Cloud Firestore와 Realtime Database라는 두 가지 전용 데이터베이스 서비스를 제공
    - 이 두 데이터베이스는 모두 NoSQL 데이터베이스라서 데이터베이스 설정 및 쿼리를 작성을 걱정할 필요가 없다.
    - 10일 이라는 짧은 개발 기간동안 사용하기에 적합하다.

**AWS**
1. 백엔드에서 사용할 수 있는 다양한 유형의 데이터베이스를 제공
    - Firebase는 오직 NoSQL 데이터베이스만 제공한다.
    - 하지만 나의 서비스에서는 NoSQL DB만으로 충분하다.
2. 개발, 테스트, 앱을 위한 다양한 환경을 제공
    - Firebase에서도 다양한 환경을 제공해 주지만 AWS보다 시간이 좀 더 걸린다.

</details>
<details>
<summary>넷 째. 구축과 유지 보수에 필요한 노력</summary>

**Firebase**
    - Firebase 콘솔의 UI는 정말 심플하고 사용하기 매우 간단하다.
    - 비교적 사용하기 쉬운 SDK를 제공해 줌으로써 많은 시간을 절약할 수 있다.

**AWS**
    - AWS가 제공해 주는 서비스는 Firebase보다 10배 더 많다. Firebase와 비교하면 AWS는 약간의 학습 곡선이 있다.
    - 간단한 실시간 앱을 만들 때도 필요한 API와 데이터베이스를 설정해야 합니다.
</details>

### [ 결론 ]

**Firebase (선택)**
- 쉽게 설정, 사용, 유지 보수할 수 있다.
- 간단한 앱을 개발하기에 적합하다.

**AWS**
- 크고 복잡한 앱 구축에는 많은 도움이 되지만 단순한 앱에는 과도한 활용이 될 수 있다.
- 모든 앱의 요구 사항을 충족시킬 수 있는 많은 서비스를 가지고 있어 단일 클라우드로 서비스를 구축할 수 있지만 비용이 많이 들 수 있습니다.

[참고자료](https://blog.naver.com/PostView.naver?blogId=devks0228&logNo=221835489763&parentCategoryNo=&categoryNo=27&viewDate=&isShowPopularPosts=true&from=search)
</details>


<details>
<summary>나는 왜 Firebase와 모듈 번들러인 webpack을 함께 사용했는가?</summary>

1. 트리 쉐이킹 (최종 빌드 시 사용하지 않는 코드를 삭제) 하여 개발 작업 환경 개선
    - Firebase 자바스크립트 모듈식 API 버전 9 이상에서는 모듈 번들러의 최적화 기능과 연동하여 최종 빌드에 포함되는 Firebase 코드의 양을 줄이도록 최적화해준다.
    - 프로젝트에서는 버전 10 사용
2. 모듈 간 충돌을 방지하여 생산성과 퍼포먼스가 뛰어난 애플리케이션를 만들기 위함.
    - JS 파일이 많이 사용될 프로젝트이므로 모듈 간의 스코프가 구분이 되지 않아 발생하는 모듈 간 충돌 방지
    - 실제로 페이지 별로 js 파일을 구분하여 번들링 (아래 [ 파일 구조 ] 참고)
3. 서브파티 라이브러리 관리나 CSS 전처리, 이미지 에셋 관리 등에 있어서 다른 번들러보다 강점
    - 웹 애플리케이션에서 사용하는 CSS나 이미지 같은 에셋들을 JavaScript 코드로 변환하고, 이를 분석해서 번들하는 방식을 사용
    - 프로젝트에서 SCSS를 사용하며 이미지 CRUD가 메인인 프로젝트이므로 webpack 사용의 필요성을 느낌
4. 오래된 만큼 생태계가 풍부하고 안전성이 뛰어남
</details>

<details>
<summary>나는 왜 Babel을 사용했는가?</summary>

1. 바인딩 기능을 통한 코드 호환성 개선
    - 바벨은 대표적인 네이티브하지 않는 외부 라이브러리나 운영 체제 서비스를 사용할 수 있도록 만들어주는 글루 코드를 제공하는 API 이다.
2. webpack의 ES6에대한 구형 브라우저 호환성 문제 해결
    - 대표적으로 webpack은 require(구문법)을 지원하지만 import(ES6)는 지원하지 않는다.
</details>

## [ Development ]
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![SCSS](https://img.shields.io/badge/SASS-cc6699.svg?&style=for-the-badge&logo=Sass&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)

## [파일 구조]
```shell
public   # 배포용 컴파일 및 번들링 완료 파일
 ├─ css
 └─ js
src
 ├─ imgs
 ├─ js
 │   ├─ components         # 페이지 별 component js 모음
 │   ├─ firebase           # firebase 기본 세팅 js 모음
 │   └─ ...페이지 별 js 파일  # 페이지 별로 필요한 omponents 안 모듈들을 Import
 └─ scss
     ├─ animation      # 애니메이션 모음
     ├─ common         # 공통적으로 사용되는 style 모음
     ├─ screens        # 페이지 별로 scss 파일을 분리
     └─ styles.scss    # style을 한 파일에서 컴파일 하기 위해 앞선 폴더들 Import 
     └─ templates      # 각 페이지 별 html 모음
proubleshooting    # 각 기술 별 트러블 슈팅 기록 모음
     ├─ index.md
     ├─ js 트러블 슈팅
     ├─ scss 트러블 슈팅
     ├─  ... 각 기술 별 트러블 슈팅 기록들
     └─ webpack 트러블 슈팅

README.md
.gitignore
.prettierrc
.prettierignore
package-lock.json
package.json
webpack.config.js
index.html
favicon.ico
```

## [ User Flow ]
<div style="text-align: center;">
  <img src = "https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/101972330/7f5e564e-100e-4710-a815-5e3d6f473532" alt ="user flow" />
</div>

<details>
<summary>야놀자 테크 캠프 JS 과제 설명</summary>
# 직원 사진 관리 서비스

직원들의 사진을 관리할 수 있는 사진 관리자 서비스를 만들어 보세요.

과제 수행 및 리뷰 기간은 별도 공지를 참고하세요!
## [과제 수행 및 제출 방법]
1. 현재 저장소를 로컬에 클론(Clone)합니다.
2. 자신의 본명으로 브랜치를 생성합니다.(구분 가능하도록 본명을 꼭 파스칼케이스로 표시하세요, git branch KDT0_이름)
3. 자신의 본명 브랜치에서 과제를 수행합니다.
4. 과제 수행이 완료되면, 자신의 본명 브랜치를 원격 저장소에 푸시(Push)합니다.(main 브랜치에 푸시하지 않도록 꼭 주의하세요, git push origin KDT0_이름)
5. 저장소에서 main 브랜치를 대상으로 Pull Request 생성하면, 과제 제출이 완료됩니다!(E.g, main <== KDT0_이름)
6. Pull Request 링크를 LMS로도 제출해 주셔야 합니다.
7. main 혹은 다른 사람의 브랜치로 절대 병합하지 않도록 주의하세요!
8. Pull Request에서 보이는 설명을 다른 사람들이 이해하기 쉽도록 꼼꼼하게 작성하세요!
9. Pull Request에서 과제 제출 후 절대 병합(Merge)하지 않도록 주의하세요!
10. 과제 수행 및 제출 과정에서 문제가 발생한 경우, 바로 담당 멘토나 강사에서 얘기하세요!

## [필수 요구사항]
-  “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
- 프로필 페이지를 개발하세요.
- 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
- 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
- 사진을 등록, 수정, 삭제가 가능해야 합니다.
- 유저 플로우를 제작하여 리드미에 추가하세요.
* CSS
  * 애니메이션 구현
  * 상대수치 사용(rem, em)
* JavaScript
  * DOM event 조작

## [선택 요구사항]
- 사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.
- 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- 직원을 등록, 수정, 삭제가 가능하게 해보세요.
- 직원 검색 기능을 추가해 보세요.
- infinity scroll 기능을 추가해 보세요.
- 사진을 편집할 수 있는 기능을 추가해 보세요.
- LocalStorage 사용
</details>

