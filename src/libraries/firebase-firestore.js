import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

export async function addMember(member) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Members"), {
    ...member,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
export async function getMemberList() {
  let lastKey = "";
  const limits = 4;
  const q = query(
    collection(db, "Members"),
    orderBy("createdAt", "desc"),
    limit(limits),
  );
  const querySn = await getDocs(q);
  const data = querySn.docs;
  const memberArr = [];
  data.forEach((doc) => {
    memberArr.push({
      id: doc.id,
      fullName: doc.data().fullName,
      email: doc.data().email,
      phone: doc.data().phone,
      category: doc.data().category,
      fileUrl: doc.data().fileUrl,
      fileName: doc.data().fileName,
    });
    lastKey = doc.data().createdAt;
  });

  return { memberArr, lastKey };
}
export async function getMemberListMore(key) {
  let lastKey = "";
  const limits = 4;
  const q = query(
    collection(db, "Members"),
    orderBy("createdAt", "desc"),
    startAfter(key),
    limit(limits),
  );
  try {
    const querySn = await getDocs(q);
    const data = querySn.docs;
    const memberArr = [];
    data.forEach((doc) => {
      memberArr.push({
        id: doc.id,
        fullName: doc.data().fullName,
        email: doc.data().email,
        phone: doc.data().phone,
        category: doc.data().category,
        fileUrl: doc.data().fileUrl,
        fileName: doc.data().fileName,
      });
      lastKey = doc.data().createdAt;
    });
    return { memberArr, lastKey };
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    return {
      memberArr: [
        {
          id: "",
          fullName: "",
          email: "",
          phone: "",
          category: "",
          fileUrl: "",
          fileName: "",
        },
      ],
      lastKey: "",
    };
  }

  return { memberArr, lastKey };
}
