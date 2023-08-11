import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { uploadError, modalOff, firebaseError } from "./nav.js";

const imageInput = document.getElementById('imageInput');
const nameInput = document.getElementById('nameInput');
const groupInput = document.getElementById('groupInput');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvKQZE-17ZEDy3yVmi3ZKWtzjYBFLTHJY",
  authDomain: "fastcampusxyanolja-assginment.firebaseapp.com",
  databaseURL: "https://fastcampusxyanolja-assginment-default-rtdb.firebaseio.com",
  projectId: "fastcampusxyanolja-assginment",
  storageBucket: "fastcampusxyanolja-assginment.appspot.com",
  messagingSenderId: "946409350884",
  appId: "1:946409350884:web:050748a6262fce560faef1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function uploadInfo() {
  const image = imageInput.files[0];
  const name = nameInput.value;
  const group = groupInput.value;

  if (image && name && group) {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + image.name);
      const uploadTask = uploadBytes(storageRef, image);
      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      const imagesCollection = collection(db, 'images');
      await addDoc(imagesCollection, {
        name: name,
        group: group,
        imageUrl: downloadURL
      });

      console.log('Image and information upload completed');
      modalOff();

      const imageElement = document.createElement('img');
      imageElement.src = downloadURL;
      imageElement.alt = `${name} (${group})`;

      const imageContainer = document.getElementById('list');
      // imageContainer.innerHTML = '';
      // imageContainer.appendChild(imageElement);

    } catch (error) {
      console.error('Error uploading image and information:', error);
      firebaseError();
    }
  } else {
    uploadError();
  }
}




