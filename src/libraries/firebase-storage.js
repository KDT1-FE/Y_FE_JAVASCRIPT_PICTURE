import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export async function uploadImage(file) {
  console.log("upload!");
  const storageRef = ref(storage, file.name);
  const uploadRef = await uploadBytes(storageRef, file).then(
    (snapshot) => snapshot.ref,
  );
  const location = await getDownloadURL(uploadRef).then(
    (downloadUrl) => downloadUrl,
  );
  return location;
}
