import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, deleteField, Timestamp, FieldValue, query, collection, updateDoc, doc, addDoc, deleteDoc, setDoc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getStorage, ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1T9NbXNdWsWWnGDhJv9gK-dR8RSlT7PQ",
  authDomain: "js-portrait-list.firebaseapp.com",
  projectId: "js-portrait-list",
  storageBucket: "js-portrait-list.appspot.com",
  messagingSenderId: "207109367443",
  appId: "1:207109367443:web:4e6675c67ca83c1f7f4f66",
  measurementId: "G-XPYJPCSN9W"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore();
const storage = getStorage();



//--------------- PROFILE PAGE ---------------//


//새로운 주소창에서 문서id 찾고 선언
let findId = window.location.search;
let nameId = findId.substring(4);

console.log(nameId);

//PROFILE PAGE에 기존 데이터 보여주기
const docRef = doc(db, "product", nameId);
const getProfile  = await getDoc(docRef)
.then((doc) => {
  console.log(doc.data());
    let readRow = `
    <div class="filebox">
    <input class ="profile_image" type="image" placeholder="이미지를 넣어주세요." src="${doc.data().image}">
    <span class="material-icons removeimg_btn">delete</span>
    <label for="file">NEW IMAGE</label> 
    <input type="file" id="file">
    </div>
    <div class="area--txt profile_area--txt">
    <div class="profile-msg-box">
    <h3>Name</h3>
    <input type="text" class="profile-msg" id="profile-name" value="${doc.data().name}" placeholder="${doc.data().name}" readonly>
    </div>
    <div class="profile-msg-box">
    <h3>E-mail</h3>
    <input type="text" class="profile-msg" id="profile-email" value="${doc.data().email}" placeholder="${doc.data().email}">
    </div>
    <div class="profile-msg-box">
    <h3>Phone number</h3>
    <input type="text" class="profile-msg" id="profile-phone_number" value="${doc.data().phone_number}" placeholder="${doc.data().phone_number}">
    </div>
    <div class="profile-msg-box">
    <h3>Rank</h3>
    <input type="text" class="profile-msg" id="profile-rank" value="${doc.data().rank}" placeholder="${doc.data().rank}">
    </div>
    </div>
    `;
    //input에 기존 값 넣어놓기
    let initialName = "${doc.data().name}";
    $('input[id="profile-name"]').attr('value',initialName);
    let initialEmail = "${doc.data().email}";
    $('input[id="profile-email"]').attr('value',initialEmail);
    let initialPhoneNumber = "${doc.data().phone_number}";
    $('input[id="profile-phone_number"]').attr('value',initialPhoneNumber);
    let initialRank = "${doc.data().rank}";
    $('input[id="profile-rank"]').attr('value',initialRank);
  $('.profile_area').append(readRow);
});



//---------------UPDATE---------------//

//update 버튼
$('.update_btn').click(function(){

  console.log('update 버튼 누름');

  //storage에 img 저장
  let imageFile = document.querySelector('#file').files[0];
  let saveWay =  ref(storage, 'image/' + imageFile.name);
  uploadBytes(saveWay, imageFile).catch(failUpdate).then((snapshot) => {
    //URL 따서, txt에 주기
    getDownloadURL(snapshot.ref).then(async (url) => {
    console.log(url);


let updateItem = {
  'name': $('#profile-name').val(),
  'email': $('#profile-email').val(),
  'phone_number': $('#profile-phone_number').val(),
  'rank': $('#profile-rank').val(),
  'image' : url
};
const updateProfile = await updateDoc(docRef, updateItem)
.catch(failUpdate).then(successUpdate);
})
}
)  
});


async function successUpdate() {
  try {
    await alert ('수정에 성공했습니다.');
  } finally {
    console.log('HOMESWEETHOME');
    window.location.href='/index.html';
  }
};

function failUpdate() {
  alert ('수정에 실패했습니다. 새로고침 후 다시 시도해 주세요.')
  console.log(err)
};



//profile 삭제
$('.delete_btn').click(()=>{
  console.log('del버튼 누름');
  deleteDoc(doc(db, "product", nameId))
  .catch(failDelete).then(successDelete);

})

async function successDelete() {
  try {
    await alert ('삭제에 성공했습니다.');
  } finally {
    console.log('HOMESWEETHOME');
    window.location.href='/index.html';
  }
};
function failDelete() {
  alert ('삭제에 실패했습니다. 새로고침 후 다시 시도해 주세요.')
  console.log(err)
};

//이미지 삭제
const removeImagebtn = document.querySelector('.removeimg_btn')
removeImagebtn.addEventListener('click', async ()=> {
  try {
  await updateDoc(docRef, {'image' : deleteField()});
  await alert ('삭제에 성공했습니다.');
  } catch (error) {
    console.log(error)
  } finally {
    window.location.href='/index.html'
    alert ('새로운 이미지를 넣어주세요.');
}
});

//스토리지에서 삭제
// // Create a reference to the file to delete
  // .catch((error)=>(error)).then(
  //   deleteObject(saveWay).then(successDelete).catch(failDelete))

