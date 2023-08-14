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
  getDoc,
  doc,
} from "firebase/firestore";
import Member from "../js/member";
import store from "../store/memberlist";

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
    store.state.members = [...store.state.members, ...memberArr];
    store.state.lastScrollKey = lastKey;
    // return { memberArr, lastKey };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    store.state.members = [
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
    ];
    store.state.lastScrollKey = "";
    // return {
    //   memberArr: [
    //     {
    //       id: "",
    //       fullName: "",
    //       gender: "",
    //       email: "",
    //       phone: "",
    //       category: "",
    //       fileUrl: "",
    //       fileName: "",
    //     },
    //   ],
    //   lastKey: "",
    // };
  }
}

export async function getSearchedMember(options, key, init = false) {
  let lastKey = "";
  const limits = 4;

  if (init) {
    store.state.members = [];
    store.state.lastScrollKey = null;
  }

  const q =
    key === undefined
      ? query(
          collection(db, "Members"),
          or(
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
          or(
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
    store.state.members = [...store.state.members, ...memberArr];
    store.state.lastScrollKey = lastKey;
    // return { memberArr, lastKey };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);

    store.state.members = [
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
    ];
    store.state.lastScrollKey = "";
  }
}

export async function getMember(id) {
  let data = {};
  try {
    const docSn = await getDoc(doc(db, "Members", id));
    if (docSn.exists()) {
      let newData = docSn.data();
      data = new Member(
        newData.fullName,
        newData.gender,
        newData.email,
        newData.phone,
        newData.category,
        newData.fileUrl,
        newData.fileName,
      );
      data.id = docSn.id;
    }
    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return {
      id: "",
      fullName: "",
      gender: "",
      email: "",
      phone: "",
      category: "",
      fileUrl: "",
      fileName: "",
    };
  }
}
