import config from './config.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';

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

export const querySnapshot = await getDocs(collection(db, 'member'));
