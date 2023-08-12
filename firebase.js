import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./key";
import { getStorage,  ref } from "firebase/storage";

const app = initializeApp(firebaseConfig)



export const storage = getStorage(app)
export const storageRef = ref(storage)
export { uploadBytes, ref, uploadString, getDownloadURL } from "firebase/storage"