// Firebase SDK
import { firebaseConfig } from './firebaseConfig.js';

// Firebase 초기화 및 정의
export function initializeFirebase() {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
  return { db, storage };
}