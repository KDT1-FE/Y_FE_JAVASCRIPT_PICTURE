// db에 보험자 이미지 url 업데이트
import db from "../../firebase/db.js";
import { doc, updateDoc } from "firebase/firestore";

// db에 보험자 이미지 url 업데이트
export default async function updateDriverImg(id, imgUrl) {
  try {
    // 사용자가 업데이트한 이미지가 있으면 사진 없데이트 진행 x
    if (id && imgUrl) {
      // 받아온 id의 보험자 doc을 업데이트
      await updateDoc(doc(db, "drivers", `${id}`), {
        imgUrl
      });
    } else throw "404 페이지로";
  } catch (err) {
    console.log(err);
  }
}
