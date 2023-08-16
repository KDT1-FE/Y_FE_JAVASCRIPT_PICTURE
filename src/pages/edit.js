import { app } from "../utils/db.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

async function Edit() {
  const path = window.location.pathname.replace("/edit/", "");

  const db = getFirestore(app);
  const storage = getStorage(app);
  const docRef = await doc(db, "employee", path);
  const docSnap = await getDoc(docRef);
  var imageURL;

  const divApp = document.getElementById("app");
  divApp.innerHTML = `
  <div>
    <input type="file" id="image" />
    <img id="myimg" src="${docSnap.data().image}"/>
    <input type="text" name="name" id="name" value=${docSnap.data().name} />
    <input type="text" name="position" id="team" value=${docSnap.data().team} />
    <input type="text" name="team" id="position" value=${
      docSnap.data().position
    } />
    <button id="edit">수정완료</button>
  </div>
`;

  // 프리뷰 구현
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

  // 데이터 수정
  document.getElementById("edit").addEventListener("click", e => {
    // 이미지 수정 시 imageURL 변경
    if (!imageURL) imageURL = docSnap.data().image;

    setDoc(doc(db, "employee", path), {
      image: imageURL,
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
