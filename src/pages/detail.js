import { app } from "../utils/db.js";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

async function Detail() {
  const path = window.location.pathname.replace("/detail/", "");

  const db = getFirestore(app);
  const storage = getStorage(app);
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
  <button id="detail-delete">삭제하기</button>
`;

  console.log(docSnap.data().image);

  document
    .querySelector("#detail-delete")
    .addEventListener("click", async () => {
      const storageRef = ref(storage, "images/son.jpeg");
      await deleteObject(storageRef);
      await deleteDoc(docRef)
        .then(() => {
          window.location.href = "/";
        })
        .catch(err => {
          console.log(err);
        });
    });
}

export default Detail;
