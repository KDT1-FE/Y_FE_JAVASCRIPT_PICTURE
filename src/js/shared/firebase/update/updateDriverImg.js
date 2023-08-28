import db from "../db.js";
import { doc, updateDoc } from "firebase/firestore";

export async function updateDriverImg(id, imgUrl) {
  try {
    await updateDoc(doc(db, "drivers", `${id}`), {
      imgUrl
    });
  } catch (err) {
    console.log(err);
  }
}
