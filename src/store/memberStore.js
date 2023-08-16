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
  memberStore.state.search = false; // 검색 결과 멤버 렌더링이 아닌 모든 멤버 렌더링
  const firstQuery = query(collection(db, 'list'), limit(7));
  response = await getDocs(firstQuery);
  memberStore.state.members = [...handleData(response)];
};

export const getNextMembersData = async () => {
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
    memberStore.state.members = [
      ...memberStore.state.members,
      ...handleData(response),
    ];
    memberStore.state.loading = false;
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

export const deleteData = (id, photoUrl) => {
  const desertRef = ref(storage, photoUrl);
  deleteObject(desertRef);
  deleteDoc(doc(db, 'list', id));
}; // deleteDoc은 promise를 반환 fulfilled 되기까지 Promise 기다림

export const searchData = async (keyword) => {
  memberStore.state.search = true; // 검색 결과 멤버 렌더링
  const searchQuery = query(
    collection(db, 'list'), // 포스트 컬렉션
    where('name', '==', keyword)
  );
  const response = await getDocs(searchQuery);
  memberStore.state.members = [...handleData(response)];

  const loading = document.querySelector('.the-loader');
  loading.classList.add('hide');
};

const handleData = (response) => {
  let responseArray = [];
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
}; // 응답 결과들을 배열로 처리해주는 함수
