# 👨‍💼직원 관리 서비스

## 💻사용 기술
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/parcel-000000?style=for-the-badge&logo=parcel&logoColor=white">

## ❗ Notice
해당 README.md 파일의 gif 이미지는 HDR오류로 인해 일정 채도 이하의 색상이 반영되지 않았다.</br>
실제 색상 참고
|![image](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/29c2cf19-7755-4635-b7c6-152d83e58b62)


## 개발 환경
1. ES-Lint & Prettier</br>
formatter와 lint의 사용을 통해 개발 시 전체적인 코드의 일관성을 유지했다.

2. 라이브 컴파일 모니터링 / npm-run-all 라이브러리 사용</br>
tailwind가 src의 문서를 지속 관찰하여 컴파일 해주는 것과 동시에 parcel로 코드들을 번들링 하면서 모니터링하기 위해서는
각 script를 병렬로 처리할 필요성을 느꼈다. 따라서 npm-run-all 라이브러리를 설치하고 script를 수정하여 개발이 진행되면서
지속적으로 각 파일을 모니터링하고 브라우저에 반영할 수 있게 하였다.

## 📃페이지 기능

### 1) 로그인 페이지

#### OVERVIEW

![로그인페이지](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/95e9e94a-cdfe-407e-a1f6-dde9a7edd592)


1. debounce를 활용한 validation 의도지연</br>

![image](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/31717571-139b-4678-8e8a-e5337683cf08)

설정한 정규식의 통과 여부를 판단하는 getter 함수를 지니고 결과를 return하는 schema 객체를 만든다.

![image](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/841d2c71-8d09-4792-bdd6-6d844c6b0dcc)

schema를 통해 validation 할 시 lodash의 debounce 기능을 이용하여 input값의 변화마다 판별하는 것이 아닌 마지막 값의 변화를 기준으로
설정한 값 만큼의 시간이 지난 이후를 기점으로 팔별하여 불필요한 script의 동작을 줄인다.

2. 각 항목의 validation이 통과 되었을 때에만 signin 버튼을 활성화한다.

3. 로그인이 완료되기 전에는 다른 페이지로의 이동이 불가능하다.

페이지 이동 권한은 localstorage의 key값으로 현재 로그인 상태가 on이라는 것을 판단한 이후에 가능하다.

4. 로그인 후 페이지를 이동하게 되면 뒤로가기 불가</br>

로그인 성공 후 페이지 이동 시 history에 등록되지 않고 페이지 자체를 replace시켜 뒤로가기가 불가능하다.

5. 로그인 시 firebase의 Authentication을 이용하여 유효성을 검증한다.

### 2) 리스트 페이지

![메인페이지](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/d03b3aea-f59e-4c7b-9475-075339436d27)

1. 페이지 로드 시 firebase의 firestore와 storage에서 데이트를 받아와 동적으로 렌더링한다.

![image](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/d98bb21c-b2a7-4f21-9526-03b79bbc6844)
![image](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/a938043f-5ebf-42c7-9586-134b7367c6d0)
각 페이지의 모든 정보들은 firebase에서 관리되며 렌더링 뿐만아니라 수정 삭제의 경우도 마찬가지로 firebase를 거쳐 데이터를 먼저 수정하고</br>
수정한 데이터를 다시 받아와 동적 렌더링한다.

이미지 파일은 firebase storage에서 관리되고, 데이터들은 firestore 에서 객체로 관리된다.

3. 임직원 등록 및 삭제가 가능하다</br>

임직원 등록 시 이름 / 이메일 / 휴대폰 번호 / 부서 등을 입력한 input의 값과 file url을 firebase를 거친 뒤 state 객체에 반영하고</br> 
다시 렌더링한다.

### 3) 상세 페이지

![상세페이지](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/246bed6f-349a-4c5d-8062-f16058903c6b)

상세페이지도 리스트페이지와 마찬가지로 기본 컴포넌트의 값들은 비워둔 채 firebase의 데이터를 기반으로 동적으로 렌더링한다.

1. 정보 변경</br>
정보 변경 버튼을 클릭 시 disabled 상태의 input element들이 활성화 되고 변경이 가능하다. 변경 후 수정하기 버튼을 누르면 firebase의 데이터베이스를 수정하고 페이지를 다시 렌더링한다.

### 4) 공통

1. 로그아웃</br>
로그아웃 버튼을 누르게 되면 localstorage 내의 signin 정보의 키값을 비우고 로그인 페이지로 강제 이동된다.
이 때 history에는 추가되지 않으면 뒤로가기가 불가능하다.

## USER FLOW

![image](https://github.com/NamgungJongMin/Yanolja_FE_JavaScript/assets/100336573/bb3b56cd-ceb1-4966-b28c-6458e3eee7c9)
