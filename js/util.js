import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

export const phoneType = (num) => {
  return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`;
};

// Storage에서 사진 삭제
export const deleteData = (photoUrl) => {
  const desertRef = ref(storage, photoUrl);
  deleteObject(desertRef);
};
