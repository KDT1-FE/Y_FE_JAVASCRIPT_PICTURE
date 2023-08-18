
# 🎃챔피언 정보 관리 시스템
## 🐶개요
<<리그 오브 레전드>>를 더욱 재미있게 플레이 하고 싶으신가요? 혹은 <<아케인>>을 더욱 재밌게 보고 싶은가요?

리그 오브 레전드의 챔피언에 대한 정보를 관리할 수 있는 `프레임워크 없이` `JavaScript`로만 만든 `SPA 웹페이지`입니다.

챔피언을 `등록`, `수정`, `삭제`를 할 수 있고, 원한다면 원본으로 `초기화` 할 수 있습니다. 당신의 챔피언들을 만들어 보고, 몰랐던 정보들을 알아가 보세요.

`컴포넌트`별로 나누어 재사용을 하였고, 컴포넌트 별로 통신을 위하여 `중앙집중식 저장소로 상태`를 관리하였으며, 이의 변화를 감지하는 `옵저버`를 사용하였습니다.

<div align=center>
	  <a href="https://kdt0-choiwuhyeok--lolchampionmanagementsystem.netlify.app/" target="_blank">
	    <img src="https://img.shields.io/badge/배포 링크-D32936?style=for-the-badge&logo=RiotGames&logoColor=white" alt="example"/>
	  </a>
  </div>

## 🎁기술 스택
<div align=center  > 
	<div> <b>✨Browser✨</b> </div>
	<div>  
			<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
		  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
		    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  </div>
  <br>
	<div> ✨<b>Library</b>✨ </div>
	<div>  
		    <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
			  <img src="https://img.shields.io/badge/cropper-EF2D5E?style=for-the-badge&logo=cropper&logoColor=white">
  </div>
    <br>
	<div> ✨<b>Deploy / Dev </b>✨</div>
	<div>  
		    <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=firebase&logoColor=white">
			  <img src="https://img.shields.io/badge/parcel-5BA745?style=for-the-badge&logo=cropper&logoColor=white">
  </div>
</div>

## 🙉필수 요구사항

 - [x]   “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
 - [x] 프로필 페이지를 개발하세요.
 - [x] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
 - [x] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
 - [x] 사진을 등록, 수정, 삭제가 가능해야 합니다.
 - [x] 유저 플로우를 제작하여 리드미에 추가하세요.
 - [x] CSS 애니메이션 구현
 - [x] CSS 상대수치 사용(rem, em)
 - [x] JS DOM event 조작

## 🐵선택 요구사항

 - [x]  사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.
 - [x]  페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
 - [x] 직원을 등록, 수정, 삭제가 가능하게 해보세요.
 - [x] 직원 검색 기능을 추가해 보세요.
 - [x] infinity scroll 기능을 추가해 보세요.
 - [x] 사진을 편집할 수 있는 기능을 추가해 보세요.
 - [x] LocalStorage 사용

## 🥏유저플로우
전체화면으로 보시길 권장드립니다.

![드로잉 (1)](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/bdd4c17c-d936-4839-a173-d0fd2ded3487)

  ## 🌞기능설명
  
### 1. 챔피언 검색 
![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/7718d2b7-244b-48e2-a33b-fb329120f97d)
- 정규 표현식을 사용하여 챔피언의 이름을 한 글자만 같더라도, 검색이 되도록 하였습니다. 
- `공백`을 입력하면 전체 챔피언을 확인할 수 있습니다. 
- `검색` 버튼을 누르거나, `Enter` 키를 입력하여 검색할 수 있습니다.
- 검색시 아래 챔피언 리스트만 `부분 렌더링` 되어 불필요한 새로고침을 줄였습니다.

### 2. 챔피언 등록
![화면 캡처 2023-08-18 095658](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/8f97eaaa-f71a-4e78-8c5f-ea238a6aa104)
![화면 캡처 2023-08-18 095721](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/4f8e38aa-ebdc-42e8-a08f-91c14ea3b231)
- 이름, 닉네임, 지역, 포지션, 역할, 썸네일 사진, 배경 사진 등의 정보를 입력받을 수 있습니다.
- 썸네일 사진과 배경 사진은 각각 업로드 후 원하는 크기를 조절 한 후 `확정 버튼`을 눌러야 합니다.
- 등록 후 자동으로 `이름 순으로 정렬`되어 아래 챔피언 리스트만 `부분 랜더링`이 됩니다.

### 3. 챔피언 삭제
![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/1935628f-cd84-4a72-830f-d739e96c05f7)

- localStorage에 존재하는 챔피언을 삭제합니다. 
- `삭제 버튼`을 누를 시에 삭제 모드로 변경됩니다. 원하는 챔피언들을 클릭하고, `삭제 버튼`을 한번 더 누를 시에 챔피언들이 삭제됩니다.
- 체크박스만이 아니라 챔피언을 클릭하면 선택이 되도록, `label 태그`를 추가 이용하였습니다.

### 4. 챔피언 리스트 초기화
- 챔피언의 등록, 수정, 삭제시 LocalStorage의 정보를 수정을 하며, 이는 홈페이지를 재시작해도 정보가 남아있습니다.
- JSON파일은 Read-Only 파일이며, 챔피언의 기본 정보를 가지고 있고, 초기 설정시 LocalStorage로 정보를 불러옵니다.
- 초기화 버튼을 누르면 JSON 파일로부터 챔피언의 정보를 받아와 LocalStorage를 초기화 시켜줍니다.

### 5. 챔피언 수정
- 챔피언의 이름, 닉네임, 지역, 포지션, 역할, 썸네일 사진, 배경 사진 등의 정보를 수정할 수 있습니다.
- 기본 정보를 불러와 사용자의 편의성을 높였습니다.
- 썸네일 사진과 배경 사진은 각각 `확정 버튼` 클릭해야 합니다.

### 6. 무한 스크롤
![ezgif com-video-to-gif](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/77570a23-f278-497a-bac7-b4d1a855415e)
- `Observer Intersection`을 이용하여 사진의 `lazy loading`을 적용하여 초기에 빠르게 화면을 로딩할 수 있습니다.
- 챔피언을 10개 단위로 불러옵니다. 챔피언을 다 불러왔을 경우 성능 개선을 위해 Observer의 관측을 제거합니다.

### 7. 프로필 페이지
![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/685b3cc9-817a-4749-8faf-44f6b1632b46)
- 챔피언의 정보를 시각적으로 알아보기 쉽게 아이콘을 연동 시켰습니다.
- 헤더나 네비게이션바 없이 직관적으로 버튼과 클릭으로 페이지를 이동할 수 있게 하였습니다.
- 메인 버튼을 눌러 이전 화면으로 이동할 수 있고, 수정 버튼을 눌러 챔피언의 사진편집을 포함한 정보를 수정할 수 있습니다.

### 8. 반응형
Flex와 max-width 속성을 적극 활용하여 미디어 쿼리 속성을 최소한으로 사용하였습니다.
#### 테스크탑 환경(1024px~) - 아래 예시는 1430*900

| 메인화면 | 챔피언 상세 |  모달 |
|--|--|--|
| ![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/0293b40c-e5f0-40ea-bfbe-08da25fd10c6) |  ![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/177d5d7e-4b0c-4141-9768-c403b589af54)|![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/90a1518e-38e0-4dea-b0ae-2633dbcfd4dc)|
#### 태블릿 환경(768px~1023px) - 아래 예시는 IPad Air 820*1180

| 메인화면 | 챔피언 상세 |  모달 |
|--|--|--|
|![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/070367c4-a33e-4994-a468-a5a1f34e3849)  |  ![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/4db92b79-6d48-4535-b780-9df175c032d4)|![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/cc44beb1-62d5-42df-9357-7e44c0bdbeca)  |

#### 모바일 환경(~767px) - 아래 예시는 Iphone 12 Pro 390*844

| 메인화면 | 챔피언 상세 |  모달 |
|--|--|--|
|![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/ca9ff825-e652-484a-8dee-23fb4d8a9d1e)  | ![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/8c5da619-3dd9-437a-bb3e-2192120108bd) |![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/e1b667b1-b349-4d3c-82fc-49cb754f3b59)  |
### 9. 로딩 애니메이션
#### 홈화면 렌더링 시 로딩 애니메이션
![ezgif com-video-to-gif (1)](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/dcba7ebc-2c74-4ef5-a317-62024a1cdc03)

#### 챔피언 수정, 등록 시 로딩 애니메이션
![ezgif com-video-to-gif (2)](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/f9a4ca61-691a-4867-8865-0ee538539d59)


- 요소를 다 불러오기 전에 화면을 가리고, 클릭을 막습니다.
- Home 화면 로드할 때, 챔피언을 수정하고 등록 할 때 로딩 화면이 나타납니다.

### 10. 사진 편집
![image](https://github.com/TaePoong719/AlgorithmStudy/assets/98576512/34d09cbf-ebcf-4f4d-9175-71f049918ae6)
- `Cropper` 라이브러리를 사용하여 사진의 크기를 조절할 수 있게 하였습니다.
- 챔피언 등록, 챔피언 수정 시에 사진 편집이 가능합니다.
- 썸네일 크기와 배경 이미지 크기에 맞게 기본 비율 설정은 자동으로 맞췄으며, 위치와 크기만 지정하면 됩니다.
- **사진 편집의 유무와 관계없이 `확정 버튼`은 꼭 눌러줘야 합니다.**

