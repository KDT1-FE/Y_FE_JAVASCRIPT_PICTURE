
//FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

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
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const storage = firebase.storage();



//---------------UPLOAD PAGE---------------//



//IMAGE INPUT
$("#file").on('change',function(){
  var fileName = $("#file").val();
  $(".upload-name").val(fileName);
});


//save 버튼 누를 때 동장
$('.save_btn').click(function(){

console.log('버튼 누름');

  //storage에 img 저장
  let imageFile = document.querySelector('#file').files[0];
  let storageRef = storage.ref();
  let saveWay = storageRef.child('image/'+ file.name);
  let uploadImage = saveWay.put(imageFile);

  uploadImage.on('state_changed',
  null,
  
  (error) => {
    console.error('실패 사유는', error);
  },

  console.log('사진 저장 완료 ~ txt 저장중'),
  () => {
    uploadImage.snapshot.ref.getDownloadURL().then((url) => {
      console.log(url);

        //db에 txt 저장
  let saveItem = {
    'name': $('#name').val(),
    'email': $('#email').val(),
    'phone_number': $('#phone_number').val(),
    'rank': $('#rank').val(),
    '이미지' : url
  }
  console.log('진자진자저장중');
  db.collection('product').add(saveItem).then(successSave).catch(failSave);
})
      });
    }
  );




async function successSave() {
  try {
    await alert ('저장에 성공했습니다.')
  } finally {
    home
    console.log('HOMESWEETHOME')
  }
};

function home() {
  window.location.href('./')
}

function failSave() {
  alert ('저장에 실패했습니다. 새로고침 후 다시 시도해 주세요.')
  console.log(err)
};

console.log('정상 작동 중~~~~');


//db에서 가져온 뒤 row 추가
db.collection('product').get().then((rowdata)=>{
  rowdata.forEach((doc) => {
  
    let makeRow = `
<div class="row">
<div class="cell"><input type="checkbox" class="check-cell"></div>
<div class="cell id_picture"> <input class ="cell_input_image" type="image" src=""></div>
<div class="cell name">${doc.data().name}</div>
<div class="cell email">${doc.data().email}</div>
<div class="cell phone_number">${doc.data().phone_number}</div>
<div class="cell rank">${doc.data().rank}</div>
</div>
`
$('.staff_list').append(makeRow);
console.log(doc.data())
  })
});



