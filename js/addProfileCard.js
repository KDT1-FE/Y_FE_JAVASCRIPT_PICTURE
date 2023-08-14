import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, orderBy, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXVgQW2Xq5fE1SvaVVutpTgX_6ZaotQhQ",
  authDomain: "photo-management-service.firebaseapp.com",
  projectId: "photo-management-service",
  storageBucket: "photo-management-service.appspot.com",
  messagingSbuttonenderId: "110781159358",
  appId: "1:110781159358:web:e9b8fbdc3e60c979178bef",
  measurementId: "G-E657JQPN7T"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//profile카드 추가하기 관련 선언
const profileContainer = document.querySelector('.container');
let template = `
    <div class="profile-card">
      <img class="profile-image" src="{{__profile_image__}}" alt="profile image">
      <div class="text-container">
        <h1>{{__profile_name__}}</h1>
        <span class="subtitle">🌞 POSITION</span>
        <span>{{__profile_position__}}</span>
        <span class="subtitle">🔥 GITHUB</span>
        <span>{{__profile_github__}}</span>
        <span class="subtitle">📧 EMAIL</span>
        <span>{{__profile_email__}}</span>
      </div>
    </div>
`;
//profile카드 추가하기
const q = query(collection(db,"profiles"),orderBy("date"))
let itemNumber = 0;
onSnapshot(q,(querySnapshot) => {
  querySnapshot.forEach((doc) => {
    //console.log('시작:',doc.data())
    const newProfile = document.createElement("a")
    newProfile.classList.add('item');
    newProfile.setAttribute("href", `../pages/moreInfo/moreInfo.html#item${itemNumber}`); //
    template = template.replace('{{__profile_image__}}',doc.data().image)
                        .replace('{{__profile_name__}}', doc.data().name)
                        .replace('{{__profile_position__}}',doc.data().position)
                        .replace('{{__profile_github__}}',doc.data().github)
                        .replace('{{__profile_email__}}',doc.data().email);
    newProfile.innerHTML=template;
    profileContainer.append(newProfile);
    template = template.replace(doc.data().image,'{{__profile_image__}}')
                        .replace( doc.data().name, '{{__profile_name__}}')
                        .replace(doc.data().position,'{{__profile_position__}}')
                        .replace(doc.data().github,'{{__profile_github__}}')
                        .replace(doc.data().email,'{{__profile_email__}}');
    itemNumber++;
  });
})