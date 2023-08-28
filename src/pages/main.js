import { firestore } from "../utils/db.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

async function Main() {
  const q = await getDocs(collection(firestore, "employee"));

  const divApp = document.getElementById("app");
  divApp.innerHTML = "";

  // contentContainer
  const contentContainer = document.createElement("div");
  contentContainer.setAttribute("class", "content-container");

  divApp.append(contentContainer);

  // utilsContainer [타이틀, 검색, 삭제 등]
  const utilsContainer = document.createElement("div");
  utilsContainer.setAttribute("class", "utils-container");

  const utilsTitle = document.createElement("h1");
  utilsTitle.setAttribute("class", "utils-title");
  utilsTitle.innerHTML = `대한민국 선수 관리 DB`;
  utilsContainer.append(utilsTitle);

  const utilsText = document.createElement("div");
  utilsText.setAttribute("class", "utils-text");
  utilsText.innerHTML = "대한민국 선수 관리 DB 입니다.";
  utilsContainer.append(utilsText);

  contentContainer.append(utilsContainer);

  // listContainer [리스트]
  const listContainer = document.createElement("ul");
  listContainer.setAttribute("class", "list-container");

  contentContainer.append(listContainer);

  // listUtils - 검색창, 리스트 Top;
  const listUtils = document.createElement("div");
  listUtils.setAttribute("class", "list-utils");
  listContainer.append(listUtils);

  // 검색창
  const searchWrapper = document.createElement("li");
  searchWrapper.setAttribute("class", "search-wrapper");
  listUtils.append(searchWrapper);

  const searchInput = document.createElement("input");
  searchInput.setAttribute("id", "search");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "이름으로 검색해주세요.");
  searchWrapper.append(searchInput);

  const inputAnchorBtn = document.createElement("a");
  inputAnchorBtn.setAttribute("class", "search-wrapper__input-anchor");
  inputAnchorBtn.href = "/post";
  inputAnchorBtn.innerHTML = "선수 등록";
  searchWrapper.append(inputAnchorBtn);

  // 리스트 Top
  const listTop = document.createElement("li");
  listTop.setAttribute("class", "list-top");
  listUtils.append(listTop);

  const listTopProfile = document.createElement("div");
  listTopProfile.setAttribute("class", "list-top-profile");
  listTopProfile.innerHTML = `
    <span>프로필</span>
    `;
  listTop.append(listTopProfile);

  const listTopDataWrapper = document.createElement("div");
  listTopDataWrapper.setAttribute("class", "list-top-data-wrapper");
  listTopDataWrapper.innerHTML = `
  <span>이름</span>
  <span>소속</span>
  <span>포지션</span>

  `;
  listTop.append(listTopDataWrapper);

  const listDataWrapper = document.createElement("div");
  listDataWrapper.setAttribute("class", "list-data-wrapper");
  listContainer.append(listDataWrapper);

  // 데이터 받아와서 ul(list-container) > li(list-wrapper) > [ul > li]로 담아서 줌
  // 전체 데이터 배열에 저장
  let listArray = [];
  q.forEach(doc => {
    let dataObj = doc.data();
    dataObj.id = doc.id;
    listArray.push(dataObj);
  });

  // 데이터 정렬 [이름 기준 오름차순]
  listArray = listArray.sort((a, b) => {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  for (let i = 0; i < listArray.length; i++) {
    const listWrapper = document.createElement("li");
    listWrapper.setAttribute("class", "list-wrapper");
    listDataWrapper.append(listWrapper);

    const listAnchor = document.createElement("a");
    listAnchor.setAttribute("class", "list-anchor");
    listAnchor.href = `/detail/${listArray[i].id}`;

    listAnchor.innerHTML = `
          <div class="list-anchor-img-wrapper">
            <img class="list-anchor__img" src="${listArray[i].image}"/>
          </div>
          <div class="list-anchor-p-wrapper">
            <p class="list-anchor__name">${listArray[i].name}</p>
            <p class="list-anchor__team">${listArray[i].team}</p>
            <p class="list-anchor__position">${listArray[i].position}</p>
          </div>
    `;

    listWrapper.append(listAnchor);
  }

  // 검색 기능
  document.getElementById("search").addEventListener("keyup", () => {
    listDataWrapper.innerHTML = "";
    let data = document.getElementById("search").value;

    for (let i = 0; i < listArray.length; i++) {
      if (listArray[i].name.includes(data)) {
        const listWrapper = document.createElement("li");
        listWrapper.setAttribute("class", "list-wrapper");
        listDataWrapper.append(listWrapper);

        const listAnchor = document.createElement("a");
        listAnchor.setAttribute("class", "list-anchor");
        listAnchor.href = `/detail/${listArray[i].id}`;
        listWrapper.append(listAnchor);

        listAnchor.innerHTML = `
          <div class="list-anchor-img-wrapper">
            <img class="list-anchor__img" src="${listArray[i].image}"/>
          </div>
          <div class="list-anchor-p-wrapper">
            <p class="list-anchor__name">${listArray[i].name}</p>
            <p class="list-anchor__team">${listArray[i].team}</p>
            <p class="list-anchor__position">${listArray[i].position}</p>
          </div>
    `;
      }
    }
  });
}
export default Main;
