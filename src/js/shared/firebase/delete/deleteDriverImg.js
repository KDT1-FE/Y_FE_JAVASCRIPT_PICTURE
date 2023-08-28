// storage에 있는 보험자 이미지를 삭제하는 Component
import storage from "../storage.js";
import { ref, deleteObject } from "firebase/storage";

export default function deleteDriverImg(imgUrl) {
  const basicImg =
    "https://firebasestorage.googleapis.com/v0/b/zero-car.appspot.com/o/basicImgs%2Fbasic%20user.png?alt=media&token=aaa54234-fadc-401e-875d-d7a892fd27b7";

  // 기본 사용자 이미지는 삭제하지 않음
  if (imgUrl !== basicImg) {
    const desertRef = ref(storage, imgUrl);
    // storage안 파일 삭제
    deleteObject(desertRef).catch(err => console.log(err));
  }
}
