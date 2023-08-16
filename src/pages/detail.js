import { app } from "../utils/db.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

async function Detail() {
  const path = window.location.pathname.replace("/detail/", "");

  const db = getFirestore(app);
  const docRef = await doc(db, "employee", path);
  const docSnap = await getDoc(docRef);

  const divApp = document.getElementById("app");
  divApp.innerHTML = `
  <img src="${docSnap.data().image}"/>
  <input type="text" name="name" id="name" value=${
    docSnap.data().name
  } disabled/>
  <input type="text" name="position" id="team" value=${
    docSnap.data().team
  } disabled/>
  <input type="text" name="team" id="position" value=${
    docSnap.data().position
  } disabled/>
  <a href ="/edit/${path}">수정하기</a>
`;
}

export default Detail;
