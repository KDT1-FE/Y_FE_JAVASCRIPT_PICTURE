import { app } from "../utils/db.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

async function Post() {
  const divApp = document.getElementById("app");
  const db = getFirestore(app);
  const storage = getStorage(app);
  let imageURL = "";

  document.querySelector("#app").innerHTML = `
  <div>
    <input type="file" id="image" />
    <img id="myimg" src=""/>
    <input type="text" name="name" id="name"/>
    <input type="text" name="position" id="position"/>
    <input type="text" name="team" id="team"/>
    <button id="post">전송</button>
  </div>
          `;

  document.querySelector("#image").addEventListener("change", async () => {
    const file = document.querySelector("#image").files[0];

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);

    await getDownloadURL(storageRef)
      .then(url => {
        document.querySelector("#myimg").src = url;
        imageURL = url;
      })
      .catch(err => {
        console.log(err);
      });
  });

  document.querySelector("#post").addEventListener("click", async () => {
    const inputValue = {
      image: imageURL,
      name: document.querySelector("#name").value.toUpperCase(),
      position: document.querySelector("#position").value.toUpperCase(),
      team: document.querySelector("#team").value.toUpperCase()
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
