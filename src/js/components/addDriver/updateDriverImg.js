// db에 보험자 이미지 url 업데이트
import db from "../../firebase/db.js";
import { doc, updateDoc } from "firebase/firestore";

// db에 보험자 이미지 url 업데이트
export default async function updateDriverImg(id, imgUrl) {
  // 사용자가 업데이트한 이미지가 있으면 사진 없데이트 진행 x
  if (imgUrl) {
    try {
      // 받아온 id의 보험자 doc을 업데이트
      await updateDoc(doc(db, "drivers", `${id}`), {
        imgUrl
      });
    } catch (err) {
      // 오류 처리 로직
      // console.log(`Can not add Data: ${err}`);
    }
  } else {
    console.log("업로드된 사진이 없습니다.");
  }
}
