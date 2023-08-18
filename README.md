## 🍃 동물의 숲 주민 관리 시스템 🍃
---
🍀 동물의 숲 주민 관리 시스템 url : https://js-service-b5998.web.app/


## 🗓️ 과제 기간
---
2023.08.08 ~ 2023.08.18


## 🌀 과제 요구사항
---
#### 필수 요구사항

[✔️] “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
[✔️] 프로필 페이지를 개발하세요.
[✔️] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
[✔️] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
[✔️] 사진을 등록, 수정, 삭제가 가능해야 합니다.
[✔️] 유저 플로우를 제작하여 리드미에 추가하세요.

**CSS**
[✔️] 애니메이션 구현
[✔️] 상대수치 사용(rem, em)

**JavaScript**
[✔️] DOM event 조작

## 🧩 User Flow

---
![](https://velog.velcdn.com/images/wkdtnqls0506/post/652a5b14-1233-49a9-97c3-85ab2abc9f2d/image.png)

## 🖥️ 화면 구성

---

### [ 주민 리스트 페이지 ]

![](https://velog.velcdn.com/images/wkdtnqls0506/post/8dcb9931-d59b-4b79-9195-e37d2c7252f0/image.png)

- 등록한 주민들을 리스트 형식으로 보여주는 메인 페이지

- 특정 주민 클릭시, 주민 상세 페이지로 이동

- "주민 등록" 버튼 클릭시 주민 등록 페이지로 이동 
</br>

### [ 주민 등록 페이지 ]

![](https://velog.velcdn.com/images/wkdtnqls0506/post/15f9f987-babd-47ae-8966-71a4271fa70f/image.png)

- 등록하고 싶은 주민을 등록할 수 있는 페이지

- 정보와 사진을 모두 작성해야지 주민 등록 가능

![](https://velog.velcdn.com/images/wkdtnqls0506/post/9b73fb33-1cd0-42f1-90a5-c8f19b04f19c/image.png)
- input 창에 정보를 하나라도 기재하지 않으면 뜨는 경고창

![](https://velog.velcdn.com/images/wkdtnqls0506/post/8ccb8d2a-d043-40f5-8838-8b70c728bd47/image.png)
- 사진을 업로드 하지 않았을 때 뜨는 경고창

![](https://velog.velcdn.com/images/wkdtnqls0506/post/edb7b89c-3583-451d-9c50-256fe39a8038/image.png)
- 사진 업로드 시 하단에 미리보기 이미지 출력
</br>

### [ 주민 상세 페이지 ]
![](https://velog.velcdn.com/images/wkdtnqls0506/post/0b2e8062-fc76-46c3-ada6-081c16267692/image.png)
- 리스트 페이지에서 상세 정보를 알고 싶은 주민을 클릭하면 나오는 상세 페이지

- "정보 변경" 버튼 클릭시 해당 주민의 정보를 변경할 수 있음
</br>

### [ 주민 상세 페이지 - 정보 변경 ]
![](https://velog.velcdn.com/images/wkdtnqls0506/post/5e48b65f-77c8-4802-9cf2-6d489e9d3fab/image.png)
- input 정보, 사진 모두 변경 가능

- 사진 변경시, 선택한 사진으로 보여짐

- "정보 수정" 버튼 클릭시 변경된 정보와 함께 리스트 페이지로 이동
</br>

### [ 반응형 웹 페이지 ]

|리스트 페이지|주민 등록 페이지|
|------|---|
|![](https://velog.velcdn.com/images/wkdtnqls0506/post/b67b3e02-9721-4f66-8519-cad9d2e1d09a/image.png)|![](https://velog.velcdn.com/images/wkdtnqls0506/post/27a439b4-af83-4d9f-9a75-66970f1d4aa6/image.png)|
</br>

|상세 페이지|상세 페이지 - 정보 변경|
|------|---|
|![](https://velog.velcdn.com/images/wkdtnqls0506/post/22e72997-440a-4e9b-bc74-12374c27748f/image.png)|![](https://velog.velcdn.com/images/wkdtnqls0506/post/329785bb-c07e-4fe9-bf01-b14abcff3cdc/image.png)
</br>

## 📖 더 보완해야 할 점

---

◻️ 체크박스 선택시 주민 삭제할 수 있는 기능 구현

◻️ 반응형 웹 페이지 보완

◻️ 검색 필터링 기능 구현

