import db from "../../db.js";
import { doc, deleteDoc } from "firebase/firestore";

export default async function deleteDriver(driverId) {
  await deleteDoc(doc(db, "drivers", driverId));
}
