import { Store } from '../core/store';
import { collection, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { db, storage } from '../api/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const memberStore = new Store({
  members: [],
  loading: false,
  member: {},
});
export const renderMemberList = async () => {
  // memberStore.state.loading = true;
  const res = await getDocs(collection(db, 'list'));
  let array = [];
  res.forEach((doc) => {
    let memberData = doc.data();
    array.push({
      name: memberData.name,
      photoUrl: memberData.photoUrl,
      email: memberData.email,
      id: doc.id,
    });
  });
  memberStore.state.members = [...array];
  // memberStore.state.loading = false;
};

export const getMemberDetail = async (id) => {
  const docRef = doc(db, 'list', `${id}`);
  const res = await getDoc(docRef);
  memberStore.state.member = {
    ...res.data(),
    id: res.id,
  };
};

export const uploadImage = async (fileData) => {
  const storageRef = ref(storage, uuidv4());
  await uploadBytes(storageRef, fileData);
  return storageRef;
};

export const uploadData = async (data) => {
  await addDoc(collection(db, 'list'), {
    name: data.name,
    email: data.email,
    photoUrl: data.photoUrl,
  });
};
