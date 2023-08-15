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
} from 'firebase/firestore';
import { db, storage } from '../api/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const memberStore = new Store({
  members: [],
  deleteMembers: [],
});

let response = '';
export const renderMemberList = async () => {
  const firstQuery = query(collection(db, 'list'), limit(7));
  response = await getDocs(firstQuery);
  let array = [];
  response.forEach((doc) => {
    let memberData = doc.data();
    array.push({
      name: memberData.name,
      photoUrl: memberData.photoUrl,
      email: memberData.email,
      id: doc.id,
    });
  });
  memberStore.state.members = [...array];
};

export const nextMemberList = async () => {
  memberStore.state.loading = true; //lading
  const lastVisible = response.docs[response.docs.length - 1];
  // 앞서 기억해둔 문서값으로 새로운 쿼리 요청
  if (response.docs.length !== 0) {
    // 가져올 데이터가 있을 때만
    const nextQuery = query(
      collection(db, 'list'),
      startAfter(lastVisible),
      limit(7)
    );
    response = await getDocs(nextQuery);
    let array = [];
    response.forEach((doc) => {
      let memberData = doc.data();
      array.push({
        name: memberData.name,
        photoUrl: memberData.photoUrl,
        email: memberData.email,
        id: doc.id,
      });
    });
    memberStore.state.loading = false;
    memberStore.state.members = [...memberStore.state.members, ...array];
  } else {
    const loading = document.querySelector('.the-loader');
    loading.classList.add('hide');
  } // 더 이상 가져올 데이터가 없을 때 , 마지막 데이터일 때 loading 애니메이션을 삭제
};

export const getMemberDetail = async (id) => {
  const docRef = doc(db, 'list', `${id}`);
  const res = await getDoc(docRef);
  return {
    ...res.data(),
    id: res.id,
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

export const deleteData = (id) => {
  deleteDoc(doc(db, 'list', id));
}; // deleteDoc은 promise를 반환 fulfilled 되기까지 Promise 기다림
