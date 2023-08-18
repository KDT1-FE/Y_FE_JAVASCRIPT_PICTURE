import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, Timestamp, FieldValue, query, collection, doc, addDoc, deleteDoc, setDoc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
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

//$('#name').val()로 ID 지정
let nameVal = $('#name').val();


//---------------UPLOAD PAGE---------------//


//IMAGE INPUT
$("#file").on('change',function(){
  var fileName = $("#file").val();
  $(".upload_image").val(fileName);
});


//save 버튼 누를 때 동작
$('.save_btn').click(function(){

  console.log('save 버튼 누름');

  //storage에 img 저장
  let imageFile = document.querySelector('#file').files[0];
  let saveWay =  ref(storage, 'image/' + imageFile.name);
  
  uploadBytes(saveWay, imageFile).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
    console.log(url);

  //db에 txt 저장
      let saveItem = {
      'name': $('#name').val(),
      'email': $('#email').val(),
      'phone_number': $('#phone_number').val(),
      'rank': $('#rank').val(),
      'image' : url
      };
    let nameVal = $('#name').val();
                                              //$('#name').val()로 ID 지정
    const res = setDoc(doc(db, "product", nameVal),saveItem).catch(failSave).then(successSave);

      });
    });  
});


async function successSave() {
  try {
    await alert ('저장에 성공했습니다.');
  } finally {
    console.log('HOMESWEETHOME');
    window.location.href='/index.html';
  }
};

function failSave() {
  alert ('저장에 실패했습니다. 새로고침 후 다시 시도해 주세요.')
  console.log(err)
};

console.log('정상 작동 중~~~~');


//HTML에서 row 추가
const addRow = await getDocs(collection(db, 'product'))
.then((rowdata)=>{
  rowdata.forEach((doc) => {
    let makeRow = `
    <a class="row" href="/profile.html?id=${doc.data().name}">
    <div class="cell"><input type="checkbox" class="check-cell"></div>
    <div class="cell id_picture"> <input class ="cell_input_image" type="image" src="${doc.data().image}"></div>
    <div class="cell name">${doc.data().name}</div>
    <div class="cell email">${doc.data().email}</div>
    <div class="cell phone_number">${doc.data().phone_number}</div>
    <div class="cell rank">${doc.data().rank}</div>
    </a>
    `;
$('.staff_list').append(makeRow);

  })
});
