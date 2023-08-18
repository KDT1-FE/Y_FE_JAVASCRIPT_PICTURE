# **직원 관리 서비스**

<img width="1437" src="https://github.com/ewinkite/dev_EMS/assets/139189610/c500a43e-1bd9-48e9-9414-6584313343a8"> <br>

- 프로젝트 기간 : 2023.08.07 ~ 2023.08.18
- 프로젝트 소개: JavaScript 과제의 일환으로서 진행된 프로젝트입니다. Firebase를 활용하여 직원 정보 등록/수정/삭제/조회가 가능합니다.
- 배포 링크: 🔗 [클릭시 이동합니다.](https://emsproject-68867.web.app/listPage.html)

<br/>

## 🖥 기술 스택

### Front-end

`HTML5` `CSS3` `JavaScript` `jquery`

### Back-end

`firebase`

### Deploy

`firebase`

### etc

`figma`

<br/>
<br/>

## 🗂 디렉토리 구조

```
📦 public                            배포 대상이 되는 폴더입니다.
 ┣📦 assets                          아이콘이 모여있는 폴더입니다.
 ┣📦 css                             공통 css와 페이지별 css가 포함된 폴더입니다.
 ┣📦 js                              공통 js와 페이지별 js가 포함된 폴더입니다.
 ┃ ┣ 📜 addPage.js
 ┃ ┣ 📜 editPage.js
 ┃ ┣ 📜 listPage.js
 ┃ ┣ 📜 profilePage.js
 ┃ ┣ 📜 main.js
 ┃ ┣ 📜 addPage.js
 ┣📜 addPage.html
 ┣📜 editPage.html
 ┣📜 listPage.html
 ┣📜 profilePage.html
```

<br/>
<br/>

## 💡 유저 플로우
![직원리스트_대표](https://github.com/ewinkite/dev_EMS/assets/139189610/8916366f-7e8b-4c54-9db8-3d65030deb18)

<br/>
<br/>

## 💡 화면 설계
단계적인 개발을 위하여 유저 플로우와 요구사항을 바탕으로 간단한 화면 설계를 진행하였습니다.<br/>
기능별 진입점 및 구동 방식에 대한 설명은 아래의 기획서를 참고해주세요!

<img src="https://github.com/ewinkite/dev_EMS/assets/139189610/e7cdcb01-2cd6-4d44-bcd8-92ae0ae8cc09" width="300">
<img src="https://github.com/ewinkite/dev_EMS/assets/139189610/92a8efe5-1479-466f-a009-3654f7004d62" width="300">
<img src="https://github.com/ewinkite/dev_EMS/assets/139189610/67be2446-c53a-45de-a477-d3202a4219bb" width="300">

<br/>
<br/>


### 요구사항 반영여부

<div align="center">
  <table>
    <tr align="left">
      <th width="500">필수 요구사항</th>
      <th width="500">선택 요구사항</th>
    </tr>
      <td>
✅ “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요. </br>
✅ 프로필 페이지를 개발하세요.</br>
✅ 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.</br>
✅ 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.</br>
✅ 사진을 등록, 수정, 삭제가 가능해야 합니다.</br>
✅ 유저 플로우를 제작하여 리드미에 추가하세요.</br>
✅ 애니메이션 구현</br>
✅ 상대수치 사용(em)</br>
✅ JavaScript </br>
✅ DOM event 조작 </br>
      </td>
      <td>
✅ 사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.</br>
✅ 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.</br>
✅ 직원을 등록, 수정, 삭제가 가능하게 해보세요.</br>
👩🏽‍💻 직원 검색 기능을 추가해 보세요.</br>
👩🏽‍💻 infinity scroll 기능을 추가해 보세요.</br>
👩🏽‍💻 사진을 편집할 수 있는 기능을 추가해 보세요.</br>
❌ LocalStorage 사용</br>
      </td>
  </table>
</div>
<br>

## 💡 구현 기능
<div align="center">
  <table>
    <tr align="center">
      <th>테이블 조회 (listPage)</th>
      <th>등록 (addPage)</th>
    </tr>
    <tr>
      <td><img src="https://github.com/ewinkite/dev_EMS/assets/139189610/c500a43e-1bd9-48e9-9414-6584313343a8" width="500"> </br>
       * 업데이트 최신순으로 테이블 노출 </br>
       * 등록된 전체 인원 count 노출</br>
       * 테이블 항목 마우스 오버시 효과</br>
      </td>
      <td>
       <img src="https://github.com/ewinkite/dev_EMS/assets/139189610/cbfbe35c-3cb5-4287-8ae5-2d02e16533ea" width="500"> </br>
       * 파일첨부기능 커스텀 (editPage에서 활용시 기존 파일명을 불러오기 위함)</br>
       * 삭제 버튼 클릭시 첨부 사진 삭제</br>
       * 첨부한 사진 미리보기 </br>
       * empty set 설정 </br>
       * 등록시 로딩 애니메이션 노출 </br>
      </td>
    </tr>
    <tr align="center">
      <th>상세 조회 (profilePage)</th>
      <th>삭제 (profilePage)</th>
    </tr>
    <tr>
      <td>
       <img src="https://github.com/ewinkite/dev_EMS/assets/139189610/59783b29-5867-445c-9218-fd74373b071e" width="500"> </br>
       * 직원 정보 업데이트시 최신업데이트일자 갱신되어 노출 </br>
       * 수정/ 삭제 기능 제공 </br>
      </td>
      <td>
       <img src="https://github.com/ewinkite/dev_EMS/assets/139189610/36cd5856-5255-410c-b8c3-8a99b8ec367d" width="500"> </br>
       * 삭제 완료 얼럿 노출 </br>
       * 리스트 페이지로 이동 </br>
      </td>
    </tr>
   <tr align="center">
      <th>수정 (editPage)</th>
      <th>모바일 반응형</th>
    </tr>
    <tr>
      <td>
       <img src="https://github.com/ewinkite/dev_EMS/assets/139189610/ab6de56d-641b-487e-b047-acece65164e6" width="500"> </br>
       * addPage와 동일하나, 최초 진입시 기존 데이터 노출
      </td>
      <td>
       <img src="https://github.com/ewinkite/dev_EMS/assets/139189610/b7c1a807-9f00-48d4-af11-1d5135c644f6" width="220">
          <img src="https://github.com/ewinkite/dev_EMS/assets/139189610/eb69fb57-5438-4c5a-a5b4-75315b923dbe" width="220"> </br>
       * Desktop~mobile까지 전 해상도 반응형 지원 </br>
      </td>
  </table>
</div>
<br>


<br/>
<br/>

## 🔥 추후 고도화시 추가 기능
- 테이블 선택 항목 삭제 기능/ 검색 필터 기능 구현 <br>
- 사진 편집 기능 구현 <br>
- 무한 스크롤 기능 구현 <br>
<br>
