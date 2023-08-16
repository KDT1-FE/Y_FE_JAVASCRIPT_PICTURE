import { initializeApp } from "firebase/app";
import { getStorage,  ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEuPQHR2PXwpDaZ9i6oMxmP7jWKh3H19U",
  authDomain: "employee-management-c0a21.firebaseapp.com",
  databaseURL: "https://employee-management-c0a21-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "employee-management-c0a21",
  storageBucket: "employee-management-c0a21.appspot.com",
  messagingSenderId: "706262391082",
  appId: "1:706262391082:web:3f0fc0a027699037e8a653"
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const storageRef = ref(storage)
export { uploadBytes, ref, uploadString, getDownloadURL } from "firebase/storage"