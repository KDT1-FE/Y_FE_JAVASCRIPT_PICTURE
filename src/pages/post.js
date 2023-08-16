import { app } from "../utils/db.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

async function Post() {
  const divApp = document.getElementById("app");
  const db = getFirestore(app);

  document.querySelector("#app").innerHTML = `
  <div>
    <input type="file" id="image"/>
    <input type="text" name="name" id="name"/>
    <input type="text" name="position" id="position"/>
    <input type="text" name="team" id="team"/>
    <button id="post">전송</button>
  </div>
          `;

  document.querySelector("#post").addEventListener("click", e => {
    const inputValue = {
      name: document.querySelector("#name").value,
      position: document.querySelector("#position").value,
      team: document.querySelector("#team").value,
      date: new Date()
    };

    const add = addDoc(collection(db, "employee"), inputValue)
      .then(() => {
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err);
      });
  });
}

export default Post;
