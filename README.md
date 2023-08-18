![썸네일](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139190686/ddfc0122-17ad-43c0-830a-0fe943ddd5ac)

# 스타쉽 아티스트 사진 관리 서비스

## 📌 프로젝트 개요
### 🔗 사이트 URL
[배포 링크](https://artist-photo.web.app)

### 📆 프로젝트 기간
* 2023.08.07 ~ 2023.08.18

### 🛠️ 기술 스택
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">

### 📂 디렉토리 구조
```
📦public
 ┣ 📂.firebase
 ┃ ┗ 📜hosting.cHVibGlj.cache
 ┣ 📂assets
 ┃ ┣ 📂favicon
 ┃ ┃ ┗ 📜fav1.PNG
 ┃ ┗ 📂image
 ┃ ┃ ┗ 📜No-Image.png
 ┣ 📂css
 ┃ ┗ 📜main.css
 ┣ 📂js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜loader.js
 ┃ ┣ 📜profile.js
 ┃ ┣ 📜register.js
 ┃ ┗ 📜showImg.js
 ┣ 📜404.html
 ┣ 📜index.html
 ┣ 📜profile.html
 ┗ 📜register.html
```

### 👤 유저 플로우
![유저 플로우](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139190686/f17aae6d-1bdf-46d0-871c-16f480cac6c8)
<br>

## 📌 프로젝트 내용

### ✅ 구현 내용
**[필수 요구사항]**

- [x] “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
- [x] 프로필 페이지를 개발하세요.
- [x] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
- [x] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
- [x] 사진을 등록, 수정, 삭제가 가능해야 합니다.
- [x] 유저 플로우를 제작하여 리드미에 추가하세요.
- [x] CSS
  - [x] 애니메이션 구현 (로딩 애니메이션 추가)
  - [x] 상대수치 사용(rem, em)
- [x] JavaScript
  - [x] DOM event 조작

**[선택 요구사항]**
- [x] 사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.
- [x] 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 직원을 등록, 수정, 삭제가 가능하게 해보세요.
- [ ] 직원 검색 기능을 추가해 보세요.
- [ ] infinity scroll 기능을 추가해 보세요.
- [ ] 사진을 편집할 수 있는 기능을 추가해 보세요.
- [ ] LocalStorage 사용
<br>

### ✅ 구현 세부사항

<div align="center">
  <table>
    <tr align="center">
      <th>전체 아티스트 리스트 페이지 (index.html)</th>
      <th>아티스트 삭제 (index.html)</th>
    </tr>
    <tr>
      <td>
        <img width="500" alt="image" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139190686/631d5a7e-f575-4edb-a747-058f6210f41c">
      </td>
      <td>
        <img width="500" alt="image" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139190686/fceda055-7a26-4474-8dc0-7cfae1607eb2">
      </td>
    </tr>
    <tr>
      <td>
        <p>✔️ 전체 아티스트 정보 확인</p>
        <p>✔️ '정보 수정' 버튼을 통해 <b>아티스트 상세 프로필 페이지</b>로 이동</p>
      </td>
      <td>
        <p>✔️ 삭제 원하는 아티스트 선택해서 삭제 가능 (체크박스)</p>
        <p>✔️ 체크박스 선택 후 '아티스트 삭제' 버튼 누르면 즉시 삭제</p>
      </td>
    </tr>
    <tr align="center">
      <th>신규 아티스트 등록 (register.html)</th>
      <th>아티스트 상세 프로필 페이지 (profile.html)</th>
    </tr>
    <tr>
      <td>
       <img width="500" alt="image" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139190686/83f5c055-635d-4774-8098-ff1b6c032a68">
      </td>
      <td>
       <img width="500" alt="image" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139190686/10b4bd4c-ab2a-4a1e-8c26-65c5d6172ae3">
      </td>
    </tr>
    <tr>
      <td>
        <p>✔️ 아티스트 정보 기입 및 사진 추가 가능</p>
        <p>✔️ 정보 미기입 시 alert 창 띄우기</p>
        <p>✔️ '등록' 버튼 누르면 기입한 내용 및 사진을 DB에 반영 후 <b>전체 리스트 페이지</b>로 이동 </p>
      </td>
      <td>
        <p>✔️ 아티스트 정보 수정 가능</p>
        <p>✔️ 사진을 클릭하면 다른 사진으로 변경 가능</p>
        <p>✔️ '사진 삭제' 버튼을 눌러 사진 삭제 가능</p>
        <p>✔️ 아티스트 모든 정보 수정 후 '수정' 버튼을 누르면 수정된 정보 DB에 반영 후 <b>전체 리스트 페이지</b>로 이동</p>
        <p>✔️ 'Home' 버튼을 눌러 정보를 수정하지 않고 <b>전체 리스트 페이지</b>로 이동</p>
      </td>
    </tr>
   <tr align="center">
      <th>로딩 애니메이션</th>
      <th>모바일 반응형</th>
    </tr>
    <tr align="center">
      <td>
       <img width="500" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139190686/d395a91c-6b4d-4964-ba42-c08f9910291b")
      </td>
      <td>
        <img width="200" alt="image" src="https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139190686/ab9a6ca2-46ae-4f07-ac48-8bdd667a09fa">
      </td>
    </tr>
    <tr>
      <td>
        <p>✔️ 정보를 받아오는 과정이 필요한 페이지에 진입하면 로딩 애니메이션 작동</p>
        <p>✔️ <b>전체 리스트 페이지</b></p>
        <p>✔️ <b>아티스트 상세 프로필 페이지</b></p>
      </td>
      <td>
        <p>✔️ 모바일과 태블릿 환경에 진입 시(최대 768px) 반응형 작동</p>
      </td>
    </tr>
  </table>
</div>