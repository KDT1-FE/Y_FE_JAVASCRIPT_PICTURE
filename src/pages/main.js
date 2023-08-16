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

  const listContainer = document.createElement("ul");
  listContainer.setAttribute("class", "list-container");

  divApp.append(listContainer);

  // 데이터 받아와서 ul(list-container) > li(list-wrapper) > [ul > li]로 담아서 줌
  q.forEach(doc => {
    const listWrapper = document.createElement("li");
    listWrapper.setAttribute("class", "list-wrapper");

    listWrapper.innerHTML = `
      <ul>
        <li>${doc.data().name}</li>
        <li>${doc.data().division}</li>
      </ul>
    `;
    listContainer.append(listWrapper);
  });
}

export default Main;
