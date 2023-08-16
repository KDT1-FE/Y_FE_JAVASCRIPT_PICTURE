import config from './config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js';

// 초기세팅
const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = config;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 읽어오기
const storage = getStorage();
export const querySnapshot = await getDocs(collection(db, 'member'));

// 이미지 업로드
export const uploadImage = (name, file, el) => {
  const storageRef = ref(storage, name);
  uploadBytes(storageRef, file)
    .then(() => {
      return getDownloadURL(storageRef);
    })
    .then((url) => {
      el.setAttribute('src', url);
    })
    .catch((error) => {
      console.error('Error uploading image:', error);
    });
};

// 데이터 추가
export const createData = async (info) => {
  const { name, email, phone, photo, department } = info;
  await setDoc(doc(collection(db, 'member')), {
    name,
    email,
    phone,
    photo,
    department,
  }).catch((error) => {
    console.log(`something was wrong :  ${error}`);
  });
};

// 데이터 수정
export const updateData = async (id, update) => {
  const documentRef = doc(db, 'member', id);

  updateDoc(documentRef, update).catch((error) => {
    console.error(`something was wrong :  ${error}`);
  });
};
