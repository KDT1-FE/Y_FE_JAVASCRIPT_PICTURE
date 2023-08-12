// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, orderBy, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import {showPreview} from "./js/showPreview.js"
import * as addModal from "./js/addModal.js";
//import {fetchProfileIds} from "./js/fetchProfileIds.js";

export {imgFileInput} ;

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

//선택 이미지 preview 띄우기
const imgFileInput = document.querySelector('#avatar');
imgFileInput.addEventListener('change', showPreview);

//저장 버튼 : 텍스트&이미지url -> db 업로드 && 이미지 -> storage 업로드
document.querySelector('.btn__upload').addEventListener('click', async function(){
  let profileContent = {
    name: document.querySelector('.profile__name').value,
    position: document.querySelector('.profile__position').value,
    github: document.querySelector('.profile__github').value,
    email: document.querySelector('.profile__email').value,
    introduce: document.querySelector('.profile__introduce').value,
    date: new Date(),
  };
  if(profileContent.name && profileContent.position && profileContent.github && profileContent.email && imgFileInput && imgFileInput.files.length>0){
    try {
      const imgFile = imgFileInput.files[0];
      const storageRef = ref(storage, 'image/'+imgFile.name);
      const uploadTask = uploadBytes(storageRef, imgFile);
      const snapshot = await uploadTask;
      const url = await getDownloadURL(snapshot.ref);
      const toSave = {
        image: url
      };
      Object.assign(profileContent,toSave);
      await addDoc(collection(db, 'profiles'), profileContent);
      window.location.href = '/index.html';
      console.log('Document successfully written!')
    }catch{(error) => {
      console.error('Error writing document: ', error);
    }};
  }else{
    if(imgFileInput.files.length<=0){
      console.log("이미지를 선택해주세요!");
    }else{
      console.log('텍스트를 입력해주세요!');
    }
  }
})

//profile카드 추가하기 관련 선언
const profileContainer = document.querySelector('.container');
let template = `
    <div>
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
const q = query(collection(db,"profiles"))
let itemNumber = 0;
onSnapshot(q,(querySnapshot) => {
  querySnapshot.forEach((doc) => {
    //console.log('시작:',doc.data())
    const newProfile = document.createElement("a")
    newProfile.classList.add('item');
    //newProfile.setAttribute("href", `https://www.naver.com-${itemNumber}`); //
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