import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export function uploadImageToStorage() {
  return new Promise((resolve, reject) => {
    const imageInput = document.getElementById("chooseFile");
    const imageUrl = imageInput.files[0];
    const uniqueImageUrl = new Date().getTime() + "-" + imageUrl.name;

    const storageRef = ref(storage, "profile_images/" + uniqueImageUrl);
    // 스토리지에 이미지 업로드 및 URL 생성
    uploadBytes(storageRef, imageUrl)
      .then(async (snapshot) => {
        console.log("Uploaded successfully");
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("Download URL:", downloadURL);
          resolve(downloadURL);
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export async function uploadInfoToDatabase(imageUrl) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const rankInput = document.getElementById("rank");

  const name = nameInput.value;
  const email = emailInput.value;
  const rank = rankInput.value;

  // form validation later

  const data = {
    name,
    email,
    rank,
    // how to put imageUrl here
    imageUrl,
  };

  try {
    await addDoc(collection(db, "users"), data);
    console.log("Added successfully");
  } catch (err) {
    console.error(err);
  }
}
