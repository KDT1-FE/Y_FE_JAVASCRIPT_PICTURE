const env = require("dotenv");
env.config();

const firebaseConfig = {
  apiKey: "AIzaSyCk0hRXmOkzYjRBrpCk4hBNvmAh2EtNxxI",

  authDomain: "employee-database-f5521.firebaseapp.com",

  projectId: "employee-database-f5521",

  storageBucket: "employee-database-f5521.appspot.com",

  messagingSenderId: "592520537805",

  appId: "1:592520537805:web:48c61cebc45ede68ba6b84",
};

firebase.initializeApp(firebaseConfig);

export const dbService = firebase.firestore();
export const storage = firebase.storage();
