## 캐릭터 사진을 관리할 수 있는 서비스

- 배포 : https://member-65170.web.app/

## User-flow

<img width="1259" alt="flow" src="./userflow.png">

## [구현 화면 미리보기]

### 첫 화면(이미지를 클릭하면 리스트로 이동)

<img width="1259" alt="1" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/f07fdddb-ba55-4bfa-b9d2-97b887bcc566">

### 리스트 페이지(데이터가 없을 경우)

<img width="1267" alt="2" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/2a288fcf-d622-41be-a84f-6124c4fcc3df">

### 생성 페이지(사진등록과 모든 데이터가 입력되어야 함)

<img width="1255" alt="스크린샷 2023-08-18 182648" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/a19a5eeb-999c-4a8f-b792-c022cc4e5610">

### 생성 페이지 - 로딩스피너추가

<img width="1246" alt="스크린샷 2023-08-18 182711" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/c40ff1bb-6846-453f-af38-792c72109a17">

### 리스트 페이지(데이터가 있는 경우)

<img width="1225" alt="4" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/8d8c529d-808e-4701-839b-ce53fc510481">

### 상세 페이지(리스트에서 해당 캐릭터 사진을 누르면 이동)

<img width="1269" alt="5" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/8fbe274c-902b-415a-8302-7ff01a6d1864">

### 정보 수정 페이지

<img width="1257" alt="6" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/7b8d127d-2455-4fa4-aa0b-79033f1ec89d">

### 삭제 기능

<img width="1247" alt="7" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/0b85c2f8-6c22-4dc6-bf05-605992fdce33">

### 검색 기능

<img width="1266" alt="8" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/f71173f2-7a81-4e7c-ae01-8afb7b416c92">

### 반응형 페이지

<img width="1082" alt="스크린샷 2023-08-18 224025" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/9d711e6b-e5df-483c-af6d-4d93c51512bd">

<img width="1081" alt="스크린샷 2023-08-18 224007" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/55376275/33e47752-5110-495e-9801-d2c5e03fd420">

## [필수 요구사항]

- “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요. (o)
- 프로필 페이지를 개발하세요.(o)
- 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요. (o)
- 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.(o)
- 사진을 등록, 수정, 삭제가 가능해야 합니다.(o)
- 유저 플로우를 제작하여 리드미에 추가하세요.(o)

* CSS - 애니메이션 구현, 상대수치 사용 (o)
* JavaScript - DOM event 조작(o)

## [선택 요구사항]

- 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.(o)
- 직원을 등록, 수정, 삭제가 가능하게 해보세요.(o)
- 직원 검색 기능을 추가해 보세요.(o)

## [구현한 내용]

- html, js, css를 이용한 사진 관리 페이지
- 필수 요구사항들과, 위에 언급한 선택 요구사항
- firestore을 이용한 데이터, 사진 저장과 배포
