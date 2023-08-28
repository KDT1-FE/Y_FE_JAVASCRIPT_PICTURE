// db에 보험자 이미지 url 업데이트
import db from "../../shared/firebase/db.js";
import { doc, updateDoc } from "firebase/firestore";

export async function updateDriverConfirm() {
  try {
    const driverId = document.location.href.split("?")[1];

    await updateDoc(doc(db, "drivers", `${driverId}`), {
      confirm: true
    });

    setTimeout(() => {
      location.href = "./main.html";
    }, 1000);
  } catch (err) {
    // 오류 처리 로직
  }
}
