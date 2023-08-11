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
  where,
  or,
  and,
} from "firebase/firestore";

export async function addMember(member) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Members"), {
    ...member,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
export async function getMemberList(key) {
  let lastKey = "";
  const limits = 4;
  const q =
    key === undefined
      ? query(collection(db, "Members"), orderBy("createdAt"), limit(limits))
      : query(
          collection(db, "Members"),
          orderBy("createdAt"),
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
        gender: doc.data().gender,
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
    if (error instanceof Error) console.error(error.message);
    return {
      memberArr: [
        {
          id: "",
          fullName: "",
          gender: "",
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
}

export async function getSearchedMember(options, key) {
  let lastKey = "";
  const limits = 4;

  const q =
    key === undefined
      ? query(
          collection(db, "Members"),
          and(
            where(options.field, "==", options.keywords),
            and(
              where("category", "in", options.category),
              where("gender", "in", options.gender),
            ),
          ),
          orderBy("createdAt"),
          limit(limits),
        )
      : query(
          collection(db, "Members"),
          and(
            where(options.field, "==", options.keywords),
            and(
              where("category", "in", options.category),
              where("gender", "in", options.gender),
            ),
          ),
          orderBy("createdAt"),
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
        gender: doc.data().gender,
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
    if (error instanceof Error) console.error(error.message);
    return {
      memberArr: [
        {
          id: "",
          fullName: "",
          gender: "",
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
}
