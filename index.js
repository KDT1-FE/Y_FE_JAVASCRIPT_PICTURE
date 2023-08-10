// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);


//선택 이미지 화면에 띄우기
const imgFileInput = document.querySelector('#avatar');
imgFileInput.addEventListener('change', showImage);

//저장 버튼 : 텍스트&이미지url -> db 업로드 && 이미지 -> storage 업로드
document.querySelector('.btn__upload').addEventListener('click', async function(){
  let profileContent = {
    name: document.querySelector('.profile__name').value,
    content: document.querySelector('.profile__introduce').value,
    position: document.querySelector('.profile__position').value,
  };
  if(profileContent.name && profileContent.content && profileContent.position && imgFileInput && imgFileInput.files.length>0){
    try {
      const imgFile = imgFileInput.files[0];
      const storageRef = ref(storage, 'image/'+imgFile.name);
      const uploadTask = uploadBytes(storageRef, imgFile);
      const snapshot = await uploadTask;
      const url = await getDownloadURL(snapshot.ref);
      const toSave = {
        date: new Date(),
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

function showImage(){
  const selectedFile = imgFileInput.files[0];
  console.log(selectedFile)
  const file = URL.createObjectURL(selectedFile);
  document.querySelector(".preview").src = file;
}


//사진 불러오기
// getDownloadURL(ref(storage, 'image/싸인.png'))
//   .then((url) => {
//     //This can be downloaded directly:
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'blob';
//     xhr.onload = (event) => {
//       const blob = xhr.response;
//     };
//     xhr.open('GET', url);
//     xhr.send();

//     // Or inserted into an <img> element
  //   const img = document.getElementById('myimg');
  //   img.setAttribute('src', url);
  // })
  // .catch((error) => {
  //   // Handle any errors
  // });


//db 추가/불러오기
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
