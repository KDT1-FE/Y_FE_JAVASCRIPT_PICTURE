# KDT0_ParkJisung (작성중)

## DEMO 및 사이트 링크

<img width="1440" alt="image" src="https://github.com/flamozzi/intro/assets/42928784/700df46e-4637-4c5b-8973-fee098dd6236">

[제작한 임직원 관리 서비스](https://magenta-pastelito-695c0d.netlify.app/)

> 본 프로젝트는 야놀자 테크스쿨 JS과제를 위해 제작한 임직원 관리 서비스입니다. <br> 파이어베이스 스토리지 및 리얼타임 데이터베이스를 사용하였으며, 바닐라 html, css, node js를 사용하여 개발하였습니다. <br><br> 본 프로젝트는 데스크탑을 우선적으로 개발하였으며 모바일 기기의 작은 화면에 반응형으로 대응합니다. <br> 브라우저는 크롬 브라우저를 기준으로 제작되었습니다.

## 프로젝트 Info

### 프로젝트 목표

Y_FE ParkJisung(flamozzi) 임직원 관리 서비스 제작

### 과제 필수 요구사항

- [필수] Firbase 스토리지 및 리얼타임 데이터베이스를 사용하여 서버 및 디비 구현
- [필수] 프로필 페이지 (임직원 상세 페이지) 개발
- [필수] 스크롤 가능한 형태의 리스팅 페이지 개발
- [필수] 데스크탑-모바일 반응형 개발
- [필수] 이미지 파일 CRUD 기능 구현
- [필수] 유저 플로우 제작 및 리드미에 추가
- [필수] CSS 애니메이션 및 상대수치 사용
- [필수] JS DOM event 조작

### 과제 필수 요구사항 이외의 추가 구현 사항

- 로딩 애니메이션 구현
- 직원 데이터 CRUD 구현
- 직원 검색 기능 구현
- 스크롤 높이에 따라 나타나는 최상단 이동 플로팅 버튼 및 애니메이션 구현
- 체크박스 기능 구현 (버블링 방지 등 학습하며 배운 내용 적극 사용)
- 이미지 미리보기 기능 구현
- 임직원 등록 및 수정시 모달 애니메이션 구현
- 리스트 아이템 선택 및 새로운 아이템 업데이트에 대한 강조 애니메이션 구현
- 타임스탬프 기능을 통해 최신 업데이트순 리스트 아이템 동적 정렬 구현
- 싱글 유저(관리자) 지향의 서비스이기에 타임스탬프를 ID처럼 사용하여 DB 필드 낭비 최소화
- 리스트 내부 정렬 최적화를 위해 그리드 적극 사용
- BEM 방법론 적용
- 모달 페이지 활성화시 이전 뷰의 스크롤 기능을 억제하여 모달페이지 스크롤만 동작하도록 구현
- 현재 테스트에 사용한 사진은 AI가 가상으로 만들어낸 인물 사진 사용
- 비활성화 버튼에 대한 비활성화 강조 표시 등 UI 디테일 구현
- 임직원 상세 모달 페이지에서 정보 변경이 일어나도 이전 홈 페이지에서도 실시간으로 정보 수정이 반영되도록 실시간 렌더링 구현
- alert 동작을 이용한 사용자 의사결정 로직 구현

## Section별 구현사항

### Header Section

<img width="1440" alt="image" src="https://github.com/flamozzi/intro/assets/42928784/700df46e-4637-4c5b-8973-fee098dd6236">

- Header를 포함하여 COMMON 스타일 지정을 통해 이후 하위에 존재할 모든 섹션에 통일감 형성
- fixed 되어있는 header Nav List
- Nav List와 같은 사이즈로 통일감을 주는 Trade In Banner Section
- Apple 공식사이트의 경우 스크롤바를 default: none으로 가져가기 때문에 본 프로젝트에서도 스크롤바 기능은 유지하면서 눈에는 안보이게 처리함

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/ba8a84d0-46ca-484a-a624-dac63d7656c9)

- header nav-list 드롭 다운 메뉴
- 실제 공식 사이트와 마찬가지로 Apple logo, Search, Bag icon을 제외한 나머지 Navi Item들이 hover될 경우 드롭다운 메뉴 활성화

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/f4457065-9d6e-4499-8d24-54b5c059eac1)

- hover되지 않은 default 상태의 header navi bar의 색상은 rgba(0, 0, 0, 0.8)이기 때문에 투명도를 가질 수 있음. 하지만, 각 nav list item을 통해 드롭 다운 메뉴 뿐만 아니라 header bar의 색상 또한 함께 변경하기 위해서는 css 만으로는 자식 요소가 부모 요소의 컨트롤을 할 수 없기 때문에 javascript를 사용하여 컨트롤
- hover 활성화시 opacity를 컨트롤하여 rgba(0, 0, 0, 1) 색상으로 변경 및 mouseleave를 감지하여 원래 색상인 rgba(0, 0, 0, 0.8)로 변경 및 드롭다운 메뉴 비활성화 가능

### Youtube Video Section

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/328c0613-e93f-4d9d-b5ab-93c8d9ab4088)

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/ac708ca0-215a-4310-b7d4-66a506aabe59)

- Youtube 영상을 Visual Section처럼 사용하기 위하여 javascript로 Youtube Iframe API를 비동기로 로드
- 각종 js 내부의 옵션 및 css 스타일 컨트롤을 통해 자연스럽게 반복재생 되는 Youtube Section 완성

### Hero iPhone & Hero Macbook Section

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/9e70f7e5-5f4a-4627-bd39-daa33864daa4)
![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/3b17d612-0455-4315-8ec7-6202807004ff)

- 각 제품에 대한 Hero Section
- Hero Section 배경 이미지의 어두움의 정도에 따라 미세하게 font color를 조정하여 시인성을 높임
- a 태그의 decoration 및 hover 옵션 조정
- cursor pointer 옵션등을 통해 clickable한 section이라는 것을 명시

### Products Grid Section

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/339b30df-0add-4966-86dc-2e375789f822)

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/0cae6823-1b34-4114-af83-2427413e1d35)

- 작은 Hero Section들을 감각적으로 2\*3의 Grid Section으로 표현
- Grid 내부의 Gap이 커지는 등의 버그를 픽스하기 위해 css 내부에서 calc()를 사용하여 세부 사이즈 조정
- Hero Section과 마찬가지로 배경 이미지의 어두움으 정도에 따라 다른 font color 적용 및 clickable 옵션 적용

### Apple tv + Section

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/bcdeb088-bbae-456c-bad5-c13b36fff496)

- Swiper를 사용하여 Apple tv+의 홍보 Section 완성

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/d7596baf-2391-4c45-88d9-dca19f014cfd)

- 모바일과 같은 작은 화면의 동적 대응은 현재 지원하지 않기 때문에 현재는 위와 같은 옵션을 사용
- pagination bullet 클릭시 loop가 작동 중지되는 버그를 픽스하기 위하여 disableOnInteraction 옵션을 false로 명시

### Footer Section

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/6ec0e805-1fbb-4fb5-a893-b7917690a476)

![image](https://github.com/flamozzi/Upbit-Autotrader/assets/42928784/2a89f478-aaa5-437d-9a37-449c9993dd0f)

- Footer의 Copyright 년도 자동 업데이트를 위해 js 사용
- Logic적으로는 header의 드롭다운 메뉴와 비슷한 방식을 채용
- css 스타일 조정을 통해 드롭다운 메뉴와는 전혀 다른 느낌으로 보일 수 있도록 함
