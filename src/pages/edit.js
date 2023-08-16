import { app } from "../utils/db.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

async function Edit() {
  const path = window.location.pathname.replace("/edit/", "");

  const db = getFirestore(app);
  const docRef = await doc(db, "employee", path);
  const docSnap = await getDoc(docRef);

  const divApp = document.getElementById("app");
  divApp.innerHTML = `
  <img src="${docSnap.data().image}"/>
  <input type="text" name="name" id="name" value=${docSnap.data().name} />
  <input type="text" name="position" id="team" value=${docSnap.data().team} />
  <input type="text" name="team" id="position" value=${
    docSnap.data().position
  } />
  <button id="edit">수정완료</button>
`;
  document.getElementById("edit").addEventListener("click", e => {
    setDoc(doc(db, "employee", path), {
      image: docSnap.data().image,
      name: document.querySelector("#name").value.toUpperCase(),
      position: document.querySelector("#position").value.toUpperCase(),
      team: document.querySelector("#team").value.toUpperCase()
    })
      .then(() => {
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err);
      });
  });
}

export default Edit;
