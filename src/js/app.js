import { initializeApp } from "firebase/app";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzNDsZIB_wG7T_c7MmyNjIIjs3pXSqH6M",
  authDomain: "zero-car.firebaseapp.com",
  projectId: "zero-car",
  storageBucket: "zero-car.appspot.com",
  messagingSenderId: "283362652912",
  appId: "1:283362652912:web:e5c5304b2ed65aeb958835",
  measurementId: "G-7DNJ8CY84W",
  storageBucket: "gs://zero-car.appspot.com"
};

const app = initializeApp(firebaseConfig);

export default app;
