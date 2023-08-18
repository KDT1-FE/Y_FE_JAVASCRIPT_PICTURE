# 👩🏻‍💻 JavaScript 과제

## 📌 개요  
- 직원들의 사진을 관리할 수 있는 사진 관리자 서비스를 만든다.
- Firebase Storage를 통해 이미지를 등록, 수정, 삭제한다.
- DOM event를 조작하며 **JavaScript** 사용을 익힌다.
- 상대 수치와 애니메이션을 활용한다.
- 모바일 반응형 페이지를 개발한다.
<br><br>  


## 📸 사이트 
<img alt="Static Badge" src="https://img.shields.io/badge/-%EC%A7%81%EC%9B%90%20%EA%B4%80%EB%A6%AC%20%EB%8D%B0%EB%AA%A8%20%EC%82%AC%EC%9D%B4%ED%8A%B8-%230E54B6?style=for-the-badge&link=https%3A%2F%2Felegant-dusk-116a43.netlify.app%2F">
<br><br>  


## ✨ 구현 내용
### 직원 등록
![직원 등록](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/63582234/d4779754-4167-415e-b236-6a81acc5b273)  
<br>  

### 사진 수정
![직원 수정](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/63582234/87df1b2f-af22-4c53-b7f5-8634d92d4136)  
<br>  

### 직원 삭제
![직원 삭제](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/63582234/4add262e-fd34-45bd-96e3-1b90e6d6cd26)  
<br>  

### 전체 모습
### 웹
![직원 관리_웹](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/63582234/6b48498f-2ee5-474c-be08-d0796abe5b87)  
<br>  

### 모바일
![직원 관리_모바일](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/63582234/955f4d75-9dde-4957-9178-432adb7d6f89)  
<br><br>  


## 🙋🏻‍♀️ 유저 플로우
![user flow drawio](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/63582234/1624a423-11bf-4d96-b125-7b984c2f64f2)  
<br><br>


## 🚀 트러블 슈팅
### ✅ 직원 삭제 오류 이슈 
![delete 404](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/63582234/1d315dbf-c681-4df9-8e79-31ec3ee45e24)  
- **문제**) 직원 삭제를 연달아 할 경우 404 오류 발생
- **원인**) checkedUser 배열에 이전 삭제한 직원 정보가 담아져 있어 중복 삭제
- **시도**) 삭제 후에 checkedUser 배열 초기화 → 오류 해결 O
<br>  

### ✅ callback hell 발생
<img width="494" alt="callback hell" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/63582234/d8043fe9-6e94-4068-a0bc-50c2070c2c5e">  

- **문제**) firebase storage 사용 시 콜백 지옥으로 가독성 저하
- **원인**) firebase 공식 문서의 callback 방식 그대로 사용
- **시도**) async/await 활용하여 비동기 처리 → 가독성 상승  
<br><br>


## 📝 배운 점
- firebase의 storage 및 realtime database을 처음 사용해봐서 낯설고 어려웠지만 데이터 관리에 대해 고민해보고 공부할 수 있었다.
- UI/UX를 직접 설계하니 결과물이 아쉬웠고, 다음에는 animation을 더 적극적으로 활용하여 interactive한 페이지를 만들어야겠다는 생각을 했다.  
<br><br>


## 🛠️ Stack
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=flat&logo=CSS3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28.svg?style=flat&logo=Firebase&logoColor=white)
