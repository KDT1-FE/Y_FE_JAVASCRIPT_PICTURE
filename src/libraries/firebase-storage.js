import { storage } from "./firebase";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
export async function uploadImage(file) {
  const lastIndex = file.name.lastIndexOf(".");
  const fileName = file.name.substring(0, lastIndex);
  const ext = file.name.substring(lastIndex);
  const fullFileName = fileName + "-" + new Date().getTime() + ext;

  const storageRef = ref(storage, fullFileName);
  const uploadRef = await uploadBytes(storageRef, file).then(
    (snapshot) => snapshot.ref,
  );
  const location = await getDownloadURL(uploadRef).then(
    (downloadUrl) => downloadUrl,
  );
  return [location, fullFileName];
}
export async function deleteImage(fileName) {
  const desertRef = ref(storage, fileName);
  await deleteObject(desertRef);
}
