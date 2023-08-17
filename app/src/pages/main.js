import { app } from "../utils/db.js";
import {
  getFirestore,
  collection,
  getDocs,
  query
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

async function Main() {
  const db = getFirestore(app);
  const q = await getDocs(collection(db, "employee"));

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

  // 데이터 받아와서 ul(list-container) > li(list-wrapper) > [ul > li]로 담아서 줌
  q.forEach(doc => {
    const listWrapper = document.createElement("li");
    listWrapper.setAttribute("class", "list-wrapper");
    listContainer.append(listWrapper);

    const listAnchor = document.createElement("a");
    listAnchor.setAttribute("class", "list-anchor");
    listAnchor.href = `/detail/${doc.id}`;

    listAnchor.innerHTML = `
          <img class="list-anchor__img" src="${doc.data().image}"/>
          <p class="list-anchor__name">${doc.data().name}</p>
          <p class="list-anchor__team">${doc.data().team}</p>
          <p class="list-anchor__position">${doc.data().position}</p>
    `;

    listWrapper.append(listAnchor);
  });
}

export default Main;
