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

export const memberStore = new Store({
  members: [],
  deleteMembers: [],
  search: false,
});

let response = '';
export const getMembersData = async () => {
  memberStore.state.search = false;
  const firstQuery = query(collection(db, 'list'), limit(7));
  response = await getDocs(firstQuery);
  memberStore.state.members = [...convertResponseToArray(response)];
};

export const getNextMembersData = async () => {
  memberStore.state.loading = true;
  const lastVisible = response.docs[response.docs.length - 1];
  if (response.docs.length !== 0) {
    // 가져올 데이터가 있을 때만
    const nextQuery = query(
      collection(db, 'list'),
      startAfter(lastVisible),
      limit(7)
    );
    response = await getDocs(nextQuery);
    memberStore.state.members = [
      ...memberStore.state.members,
      ...convertResponseToArray(response),
    ];
    memberStore.state.loading = false;
  } else {
    const loading = document.querySelector('.the-loader');
    loading.classList.add('hide');
  } // 더 이상 가져올 데이터가 없을 때 , 마지막 데이터일 때 loading 애니메이션을 삭제
};

export const getMemberDetail = async (id) => {
  const docRef = doc(db, 'list', `${id}`);
  const response = await getDoc(docRef);
  if (response.data() === undefined) {
    return null;
  } // 해당 id의 데이터가 존재하지 않을 때
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
  addDoc(collection(db, 'list'), {
    name: data.name,
    email: data.email,
    photoUrl: data.photoUrl,
  });
};

export const setData = (data, id) => {
  setDoc(doc(db, 'list', id), data);
};

export const deleteData = (id, photoUrl) => {
  const desertRef = ref(storage, photoUrl);
  deleteObject(desertRef);
  deleteDoc(doc(db, 'list', id));
};

export const searchData = async (keyword) => {
  memberStore.state.search = true;
  const searchQuery = query(
    collection(db, 'list'),
    where('name', '==', keyword)
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
