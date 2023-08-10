import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function deleteUser(userId) {
  await deleteDoc(doc(db, "users", userId));
}
