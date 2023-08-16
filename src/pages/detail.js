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
  <ul>
      <li><img src="${docSnap.data().image}"/></li>
      <li>${docSnap.data().name}</li>
      <li>${docSnap.data().team}</li>
      <li>${docSnap.data().position}</li>
  </ul>
`;
}

export default Detail;
