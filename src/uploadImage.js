import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export function uploadImageToStorage(imageFile) {
  return new Promise((resolve, reject) => {
    const uniqueImageUrl = new Date().getTime() + "-" + imageFile.name;

    const storageRef = ref(storage, "profile_images/" + uniqueImageUrl);
    // 스토리지에 이미지 업로드 및 URL 생성
    uploadBytes(storageRef, imageFile)
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

// 데이터베이스에 데이터 저장
export async function uploadInfoToDatabase(userData) {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("Added successfully");
    return docRef.id;
  } catch (err) {
    console.error(err);
  }
}
