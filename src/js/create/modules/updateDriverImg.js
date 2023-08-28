import db from "../../shared/firebase/db.js";
import { doc, updateDoc } from "firebase/firestore";

export async function updateDriverImg(id, imgUrl) {
  try {
    // 사용자가 업데이트한 이미지가 있으면 사진 없데이트 진행 x
    if (id && imgUrl) {
      await updateDoc(doc(db, "drivers", `${id}`), {
        imgUrl
      });
    } else throw "404 페이지로";
  } catch (err) {
    console.log(err);
  }
}
