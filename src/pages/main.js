import { firestore } from "../utils/db.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  appReset,
  renderDetailDOM,
  renderDetailDOMById
} from "../utils/function.js";
async function Main() {
  const q = await getDocs(collection(firestore, "employee"));

  const divApp = appReset("app");

  // contentContainer
  const contentContainer = renderDetailDOM("div", "content-container", divApp);

  // utilsContainer [타이틀, 검색, 삭제 등]
  const utilsContainer = renderDetailDOM(
    "div",
    "utils-container",
    contentContainer
  );

  const utilsTitle = renderDetailDOM(
    "h1",
    "utils-title",
    utilsContainer,
    "대한민국 선수 관리 DB"
  );

  const utilsText = renderDetailDOM(
    "div",
    "utils-text",
    utilsContainer,
    "대한민국 선수 관리 DB 입니다."
  );

  // listContainer [리스트]
  const listContainer = renderDetailDOM(
    "ul",
    "list-contianer",
    contentContainer
  );

  // listUtils - 검색창, 리스트 Top;
  const listUtils = renderDetailDOM("div", "list-utils", listContainer);

  // 검색창
  const searchWrapper = renderDetailDOM("li", "search-wrapper", listUtils);

  const searchInput = renderDetailDOMById("input", "search", searchWrapper);
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "이름으로 검색해주세요.");

  const inputAnchorBtn = renderDetailDOM(
    "a",
    "search-wrapper__input-anchor",
    searchWrapper,
    "선수 등록"
  );
  inputAnchorBtn.href = "/post";

  // 리스트 Top
  const listTop = renderDetailDOM("li", "list-top", listUtils);

  const listTopProfile = renderDetailDOM(
    "div",
    "list-top-profile",
    listTop,
    `<span>프로필</span>`
  );

  const listTopDataWrapper = renderDetailDOM(
    "div",
    "list-top-data-wrapper",
    listTop,
    `
  <span>이름</span>
  <span>소속</span>
  <span>포지션</span>

  `
  );

  const listDataWrapper = renderDetailDOM(
    "div",
    "list-data-wrapper",
    listContainer
  );

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
    const listWrapper = renderDetailDOM("li", "list-wrapper", listDataWrapper);

    const listAnchor = renderDetailDOM("a", "list-anchor", listWrapper);
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
  }

  // 검색 기능
  document.getElementById("search").addEventListener("keyup", () => {
    listDataWrapper.innerHTML = "";
    let data = document.getElementById("search").value;

    for (let i = 0; i < listArray.length; i++) {
      if (listArray[i].name.includes(data)) {
        const listWrapper = renderDetailDOM(
          "li",
          "list-wrapper",
          listDataWrapper
        );

        const listAnchor = renderDetailDOM("a", "list-anchor", listWrapper);
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
      }
    }
  });
}
export default Main;
