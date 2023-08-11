//profile collection 내에서 문서들 id 가져오기
import * as _ from "../index.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXVgQW2Xq5fE1SvaVVutpTgX_6ZaotQhQ",
  authDomain: "photo-management-service.firebaseapp.com",
  projectId: "photo-management-service",
  storageBucket: "photo-management-service.appspot.com",
  messagingSenderId: "110781159358",
  appId: "1:110781159358:web:e9b8fbdc3e60c979178bef",
  measurementId: "G-E657JQPN7T"
};
const app = initializeApp(firebaseConfig);;
const db = getFirestore(app);

export async function fetchProfileIds() {
  const profilesCollectionRef = collection(db, 'profiles');
  
  try {
    const querySnapshot = await getDocs(profilesCollectionRef);
    const profileIds = [];
    querySnapshot.forEach((doc) => {
    profileIds.push(doc.id);
    });
    return profileIds;
  } catch (error) {
    console.error("Error fetching profile IDs:", error);
    return [];
  }
}