import { initializeApp } from 'firebase/app';
import dotenv from 'dotenv';
import { getFirestore } from 'firebase/firestore'; // 파이어 스토어 사용시
import { getStorage } from 'firebase/storage'; // 스토리지 사용시

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
