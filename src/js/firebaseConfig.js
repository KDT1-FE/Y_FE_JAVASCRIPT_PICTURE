import { apis } from "./keys.js";

const firebaseConfig = {
  apiKey: apis.API_KEY,
  authDomain: apis.AUTH_DOMAIN,
  projectId: apis.PROJECT_ID,
  storageBucket: apis.STORAGE_BUCKET,
  messagingSenderId: apis.SENDER_ID,
  appId: apis.APP_ID,
  measurementId: apis.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
