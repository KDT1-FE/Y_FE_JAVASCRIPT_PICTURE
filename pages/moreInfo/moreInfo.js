import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, orderBy, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXVgQW2Xq5fE1SvaVVutpTgX_6ZaotQhQ",
  authDomain: "photo-management-service.firebaseapp.com",
  projectId: "photo-management-service",
  storageBucket: "photo-management-service.appspot.com",
  messagingSbuttonenderId: "110781159358",
  appId: "1:110781159358:web:e9b8fbdc3e60c979178bef",
  measurementId: "G-E657JQPN7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//상세profile카드 관련 선언
const profileContainer = document.querySelector('.detail-container');
let template = `
    <div class="detail-profile-card">
      <img class="detail-profile-image" src="{{__profile_image__}}" alt="profile image">
      <div class="detail-text-container">
        <h1>{{__profile_name__}}</h1>
        <span class="subtitle">🌞 POSITION</span>
        <span>{{__profile_position__}}</span>
        <span class="subtitle">🔥 GITHUB</span>
        <span>{{__profile_github__}}</span>
        <span class="subtitle">📧 EMAIL</span>
        <span>{{__profile_email__}}</span>
        <span class="subtitle">😎 INTRODUCE</span>
        <span>{{__profile_introduce__}}</span>
      </div>
    </div>
`;
//상세profile카드 추가하기
const q = query(collection(db,"profiles"))
let itemNumber = 0;
onSnapshot(q,(querySnapshot) => {
  querySnapshot.forEach((doc) => {
    //console.log('시작:',doc.data())
    const newProfile = document.createElement("div");
    const newProfileIndex = document.createElement("div");
    newProfile.classList.add(`detail-item`);
    newProfileIndex.setAttribute("id",`item${itemNumber}`);
    newProfileIndex.classList.add('detail-index');
    newProfileIndex.innerHTML=`#${itemNumber+1}`;
    template = template.replace('{{__profile_image__}}',doc.data().image)
                        .replace('{{__profile_name__}}', doc.data().name)
                        .replace('{{__profile_position__}}',doc.data().position)
                        .replace('{{__profile_github__}}',doc.data().github)
                        .replace('{{__profile_email__}}',doc.data().email)
                        .replace('{{__profile_introduce__}}',doc.data().introduce);
    newProfile.innerHTML=template;
    profileContainer.append(newProfileIndex);
    profileContainer.append(newProfile);
    template = template.replace(doc.data().image,'{{__profile_image__}}')
                        .replace( doc.data().name, '{{__profile_name__}}')
                        .replace(doc.data().position,'{{__profile_position__}}')
                        .replace(doc.data().github,'{{__profile_github__}}')
                        .replace(doc.data().email,'{{__profile_email__}}')
                        .replace(doc.data().introduce,'{{__profile_introduce__}}');
    itemNumber++;

    // 해시값 변화 감지
    window.addEventListener("hashchange", handleHashChange);

    // 초기 로딩 시 해시값에 따른 초기 상태 설정
    handleHashChange();
  });
})

function handleHashChange() {
  const hash = location.hash;
  const itemId = hash.substring(1);
  const targetItem = document.getElementById(itemId);
  console.log(targetItem)
  if (targetItem) {
    targetItem.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}