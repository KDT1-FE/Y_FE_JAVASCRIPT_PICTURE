import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const headertitle = document.querySelector('.headertitle');
const infochange = document.querySelector('.infochange');
const deletemodal = document.getElementById('modaldelete');
const modal = document.querySelector('.modal-window');
const imageInput = document.getElementById('imageInput');
const nameInput = document.getElementById('nameInput');
const groupInput = document.getElementById('groupInput');
const uploadLabel = document.querySelector('.upload-button');
const insertmodal = document.getElementById('modalinsert');

const namecontainer = document.querySelector('.name');
const groupcontainer = document.querySelector('.group');
const imagecontainer = document.querySelector('img');
var link = 'index.html';

const firebaseConfig = {
  apiKey: "AIzaSyBvKQZE-17ZEDy3yVmi3ZKWtzjYBFLTHJY",
  authDomain: "fastcampusxyanolja-assginment.firebaseapp.com",
  databaseURL: "https://fastcampusxyanolja-assginment-default-rtdb.firebaseio.com",
  projectId: "fastcampusxyanolja-assginment",
  storageBucket: "fastcampusxyanolja-assginment.appspot.com",
  messagingSenderId: "946409350884",
  appId: "1:946409350884:web:050748a6262fce560faef1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function hreflink(){
  location.href=link;
}

headertitle.addEventListener('click',()=>{
  hreflink();
})


imageInput.addEventListener('change', handleImageSelect);

function clearInputValues() {
  uploadLabel.textContent = '사진';
  nameInput.value = '';
  groupInput.value = '';
}

function handleImageSelect(event) {
  const selectedImage = event.target.files[0];
  if (selectedImage) {
    uploadLabel.textContent = '사진 선택 완료';
    }
}

function modalOn() {
  modal.style.display = "block";
  document.body.classList.add('modal-open');
}


function modalOff() {
  modal.style.display = "none";
  clearInputValues();
  document.body.classList.remove('modal-open');
}

function getQueryParam(name) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(name);
}

const id = getQueryParam('id');
const image = getQueryParam('image');
const name = getQueryParam('name');
const group = getQueryParam('group');

async function changeInfo() {
  // firestorage
  const newimage = imageInput.files[0];
  const newimagesrc = imageInput.files[0].name;
  const newname = nameInput.value;
  const newgroup = groupInput.value;

  // localstorage
  const storedProfiles = localStorage.getItem('profile');
  if (storedProfiles) {
    let profiles = JSON.parse(storedProfiles);

    profiles.forEach(profile => {
      if (profile.id === id) {
        profile.name = newname;
        profile.group = newgroup;
        profile.image = newimage;
      }
    });
        
    imagecontainer.src = newimagesrc;
    namecontainer.innerHTML = newname;
    groupcontainer.innerHTML = newgroup;

    localStorage.setItem('profile', JSON.stringify(profiles));
  } else {
    console.log('저장된 프로필이 없습니다.');
  }

  modalOff(); 
}


imagecontainer.src = image;
namecontainer.innerHTML = name;
groupcontainer.innerHTML = group;

deletemodal.addEventListener('click',modalOff);

infochange.addEventListener('click',modalOn);

insertmodal.addEventListener('click', changeInfo);

function uploadError(){
  Swal.fire({
    title: '업로드 오류',
    text: "요소를 전부 작성해주세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

function firebaseError(){
  Swal.fire({
    title: '업로드 오류',
    text: "다시 작성해주세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

function storageError(){
  Swal.fire({
    title: '삭제 오류',
    text: "삭제하는 과정에서 오류가 발생했습니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}