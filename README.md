## 사원 관리 시스템

사원을 등록하고 관리 할 수 있는 서비스 입니다.
간단한 정보를 입력해 사원을 등록하고, 리스트를 확인하고 검색 할 수 있습니다.
등록 후 사원의 정보를 수정하고 삭제도 할 수 있습니다.

## [개발기간]
2023.08.08 ~ 2023.08.12

## [배포링크]
https://port-0-employee-system-eu1k2lllgctbrk.sel3.cloudtype.app/

## [기술스택]

HTML CSS JS를 통해 프론트 엔드를 구현하였고, NodeJS로 백엔드를 구현하였습니다.
사원 정보는 MySQL에 저장되며 이미지 파일은 S3에 저장하는 방식으로 진행했습니다.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## [개발환경]

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## [주요 화면]
![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79828541/9c65cd06-53e6-4916-9402-74b086fb6135)

![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79828541/e2879f60-9f17-4324-bac1-8c1e607c8512)

![image](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79828541/64afc967-eecc-45f7-94e9-4b73c7d9680c)


## [주요 기능]

### 직원 등록

ID와 이름 직급을 입력해 사원을 등록하고 프로필 사진을 업로드 합니다.

ID를 `Primary Key`로 MySQL에 저장하고 이미지 저장 경로에 ID를 두어 AWS S3에 이미지 파일을 저장하였습니다.

### 직원 리스트 

등록한 직원 리스트를 메인 화면에서 확인 할 수 있습니다.

직원 리스트는 `Intersection Observer` 기능을 통해 무한 스크롤을 구현하였고, 디바이스 크기에 따른 요소 크기 조절과

로드하는 데이터의 개수의 조절을 통해 반응형을 구현하였습니다.

### 검색 기능

직원 리스트에서 검색할 키워드를 입력하여 직원을 검색할 수 있습니다.  ID와 이름을 검색이 가능하며, 

검색한 키워드를 유지한 채로 무한 스크롤이 가능하도록 구현하였습니다. 검색은 키 입력 후 조금의 시간 후 자동으로

이루어 지며, 잦은 호출을 방지하기 위해 디바운싱을 적용하였습니다.

### 직원 삭제

직원 리스트와 정보 수정 화면 두 곳에서 직원을 삭제 할 수 있습니다.

직원 리스트에서는 체크박스를 통해 여러명의 직원을 동시에 삭제 할 수 있습니다.

### 정보 수정

직원 리스트에서 행을 클릭하면 해당 직원의 정보 수정 화면으로 이동하며 이 곳에서 ID를 제외한 이름, 직급, 프로필 사진의 수정이 가능합니다.

## [유저플로우]

![USER FLOW](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/79828541/0ade2881-c359-42b1-8c5c-1ae4f9a7ed81)

## [느낀점 및 보완할 점]

NodeJS는 처음인데 목표치에 대해 욕심을 많이 두어 초기 세팅에 시간을 많이 보낸 거 같습니다. 그나마 익숙한 MVC 패턴으로 프로젝트를 진행하였지만 몇번이고 API를 고치기도 하였고 자료도 많이 찾아 본거 같습니다. 여기에 시간을 너무 많이 소비하여 정작 프론트엔드 쪽에는 신경을 많이 못 쓰고 구현하지 못한 기능도 많아 아쉬움이 남습니다. 군데군데 마무리가 아쉬운 부분이 많이 보이는거 같고, 예외처리, 에러 정리 등도 신경써서 하지는 못했습니다.
리팩토링을 통해 부족했던 부분들을 보완하고 얻었던 것들을 정리해 나가는 시간을 가져야겠습니다.
