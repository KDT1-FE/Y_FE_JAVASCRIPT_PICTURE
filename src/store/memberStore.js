import { Store } from '../core/store';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  startAfter,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { db, storage } from '../api/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import {
  MEMBER_COLLECTION,
  RESPONSE_LENGTH,
  SEARCH_KEYWORD,
} from '../constants/api';

export const memberStore = new Store({
  members: [],
  deleteMembers: [],
  search: false,
});

let response = '';
export const getMembersData = async () => {
  memberStore.state.search = false;
  const firstQuery = query(collection(db, MEMBER_COLLECTION), limit(7));
  response = await getDocs(firstQuery);
  memberStore.state.members = [...convertResponseToArray(response)];
};

export const getNextMembersData = async () => {
  memberStore.state.loading = true;
  const lastVisible = response.docs[response.docs.length - 1];
  const isResponseData = response.docs.length !== 0;
  if (isResponseData) {
    const nextQuery = query(
      collection(db, MEMBER_COLLECTION),
      startAfter(lastVisible),
      limit(RESPONSE_LENGTH)
    );
    response = await getDocs(nextQuery);
    memberStore.state.members = [
      ...memberStore.state.members,
      ...convertResponseToArray(response),
    ];
    memberStore.state.loading = false;
    return;
  }

  const loading = document.querySelector('.the-loader');
  loading.classList.add('hide');
};

export const getMemberDetail = async (id) => {
  const docRef = doc(db, MEMBER_COLLECTION, `${id}`);
  const response = await getDoc(docRef);
  if (response.data() === undefined) {
    return null;
  }
  return {
    ...response.data(),
    id: response.id,
  };
};

export const uploadImage = async (fileData, refId) => {
  const storageRef = ref(storage, refId);
  await uploadBytes(storageRef, fileData);
  const photoUrl = await getDownloadURL(storageRef);
  return photoUrl;
};

export const uploadData = (data) => {
  addDoc(collection(db, MEMBER_COLLECTION), {
    name: data.name,
    email: data.email,
    photoUrl: data.photoUrl,
  });
};

export const setData = (data, id) => {
  setDoc(doc(db, MEMBER_COLLECTION, id), data);
};

export const deleteData = (id, photoUrl) => {
  const desertRef = ref(storage, photoUrl);
  deleteObject(desertRef);
  deleteDoc(doc(db, MEMBER_COLLECTION, id));
};

export const searchData = async (keywordValue) => {
  memberStore.state.search = true;
  const searchQuery = query(
    collection(db, MEMBER_COLLECTION),
    where(SEARCH_KEYWORD, '==', keywordValue)
  );
  const response = await getDocs(searchQuery);
  memberStore.state.members = [...convertResponseToArray(response)];

  const loading = document.querySelector('.the-loader');
  loading.classList.add('hide');
};

const convertResponseToArray = (response) => {
  const responseArray = [];
  response.forEach((doc) => {
    let memberData = doc.data();
    responseArray.push({
      name: memberData.name,
      photoUrl: memberData.photoUrl,
      email: memberData.email,
      id: doc.id,
    });
  });
  return responseArray;
};
