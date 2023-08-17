import db from "../../db.js";
import { doc, updateDoc } from "firebase/firestore";

// db에 보험자 이름 업데이트
export default async function updateDriverName(id, name) {
  if (name) {
    try {
      // 받아온 id의 보험자 doc을 업데이트
      await updateDoc(doc(db, "drivers", `${id}`), {
        name
      });
    } catch (err) {
      // 오류 처리 로직
      // console.log(`Can not add Data: ${err}`);
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("업로드된 사진이 없습니다.");
  }
}
