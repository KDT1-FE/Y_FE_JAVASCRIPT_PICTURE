// Firebase SDK에서 필요한 함수들 import 하기
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Creating a Firebase App
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBLqI_ORJ_DuJCQs2fMdiJ8B77-bpkZtsI',
  authDomain: 'staff-managing-project.firebaseapp.com',
  projectId: 'staff-managing-project',
  storageBucket: 'staff-managing-project.appspot.com',
  messagingSenderId: '742894439459',
  appId: '1:742894439459:web:c14e0ab228e38bed07f596',
  measurementId: 'G-B0PRSPPYND',
});
const db = getFirestore(firebaseApp);
