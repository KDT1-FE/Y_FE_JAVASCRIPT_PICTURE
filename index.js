// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

//id통해서 문서 갖고오는 거 테스트
const docId = "AE2lWWrwBypbn5TQyFDe"; // 가져올 문서의 ID
const docRef = doc(db, "profiles", docId); // 'profiles' 컬렉션에서 해당 ID의 문서 참조 생성

getDoc(docRef)
  .then((doc) => {
    if (doc.exists()) {
      console.log("Document data:", doc.data());
      console.log("date", doc.data().date.seconds)
      const img = document.getElementById('myimg');
      img.setAttribute('src', doc.data().image);
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

  //profile collection 내에서 문서들 id 가져오기
  async function fetchProfileIds() {
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
  //불러온 id들 담은 배열 반환
  fetchProfileIds()
    .then((profileIds) => {
      console.log("Profile IDs:", profileIds);
    })
    .catch((error)=>{
      console.error("Error:",error);
    });


  //등록 모달 띄우기
  const addProfileBtn = document.querySelector(".btn__add");
  const addProfileModal = document.querySelector(".modal__add-profile");
  const closeBtn = document.querySelector(".close");
  addProfileBtn.addEventListener("click",()=>{
    addProfileModal.showModal();
  })
  closeBtn.addEventListener("click",()=>{
    addProfileModal.close();
  })


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
