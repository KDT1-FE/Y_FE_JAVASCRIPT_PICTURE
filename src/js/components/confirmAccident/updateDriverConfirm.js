// db에 보험자 이미지 url 업데이트
import db from "../../firebase/db.js";
import { doc, updateDoc } from "firebase/firestore";

// db에 보험금 지급 여부 업데이트
export default async function updateDriverConfirm(id) {
  try {
    // 받아온 id의 보험자 doc을 업데이트
    await updateDoc(doc(db, "drivers", `${id}`), {
      confirm: true
    });
  } catch (err) {
    // 오류 처리 로직
    // console.log(`Can not add Data: ${err}`);
  }
}
