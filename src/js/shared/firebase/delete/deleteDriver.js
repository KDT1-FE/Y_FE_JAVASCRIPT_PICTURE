// db에 있는 보험자 데이터를 삭제하는 Component
import db from "../db.js";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteDriver(driverId) {
  await deleteDoc(doc(db, "drivers", driverId));
}
