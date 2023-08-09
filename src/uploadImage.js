import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export function uploadImageToStorage() {
  const imageUrl = document.getElementById("chooseFile").files[0];

  const uniqueImageUrl = new Date().getTime() + "-" + imageUrl.name;

  const storageRef = ref(storage, "profile_images/" + uniqueImageUrl);

  uploadBytes(storageRef, imageUrl)
    .then((snapshot) => {
      console.log("Uploaded successfully");
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("Download URL:", downloadURL);
        // You can now use the downloadURL to display the image or save it to your database
      });
    })
    .catch((err) => console.log(err));
}

export async function uploadInfoToDatabase() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const rankInput = document.getElementById("rank");

  const name = nameInput.value;
  const email = emailInput.value;
  const rank = rankInput.value;

  // form validation

  const data = {
    name,
    email,
    rank,
  };

  try {
    await addDoc(collection(db, "users"), data);
    console.log("Added successfully");
  } catch (err) {
    console.error(err);
  }
}
