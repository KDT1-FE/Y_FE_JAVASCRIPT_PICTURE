import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, getDocs, updateDoc, collection, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
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

const queryid = getQueryParam('id');
const queryimage = getQueryParam('image');
const queryname = getQueryParam('name');
const querygroup = getQueryParam('group');

async function updateItemFields(matchingid, newGroup, newName, newImageUrl) {
  const localstorageData = localStorage.getItem('profile');
  const profiledata = JSON.parse(localstorageData);
  const localstorageid = profiledata.map(profile => profile.id);

  if (localstorageid.includes(matchingid)) {
    const querySnapshot = await getDocs(collection(db, 'images'));
    querySnapshot.forEach(async (docs) => {
      const docData = docs.data();
      if (docData.id === matchingid) {
        const docRef = doc(db, 'images', docs.id);
        const updatedData = {
        id: matchingid,
        group: newGroup,
        name: newName,
        imageUrl: newImageUrl
      };

    await updateDoc(docRef, updatedData);
    console.log('Document successfully updated in Firestore:');
  }
});

  }
}
async function deleteMatchingImageFromFirestorage(matchingImage) {
  const storage = getStorage();
  const storageRef = ref(storage, 'images');
  const listResult = await listAll(storageRef);

  for (const item of listResult.items) {
    const downloadURL = await getDownloadURL(item);

    if (downloadURL === matchingImage) {
      const existingFileRef = ref(storage, 'images/' + item.name);
      await deleteObject(existingFileRef);
      console.log('Image successfully deleted from Firestorage:', downloadURL);
      break;
    }
  }
}


async function changeInfo() {
  const image = imageInput.files[0];
  const name = nameInput.value;
  const group = groupInput.value;
  if(image && name && group){
    // Firestorage
  const localstorageData = localStorage.getItem('profile');
  const profiledata = JSON.parse(localstorageData);

  const localstorageid = profiledata.map(profile => profile.id);
  const numericId = parseInt(queryid, 10);

  if (localstorageid.includes(numericId)) {
    const matchingProfile = profiledata.find(profile => profile.id === numericId);

    if (matchingProfile) {
      const storage = getStorage();

      // Firestorage 내의 기존 이미지 삭제
      const matchingImage = matchingProfile.image;
      const matchingId = matchingProfile.id;
      await deleteMatchingImageFromFirestorage(matchingImage);

      // 새로운 이미지 Firestorage에 업로드
      const newStorageRef = ref(storage, 'images/' + image.name);
      const uploadTask = uploadBytes(newStorageRef, image);
      await uploadTask;
      const newDownloadURL = await getDownloadURL(newStorageRef);

      // 로컬 스토리지 데이터 업데이트
      matchingProfile.image = newDownloadURL;
      matchingProfile.name = nameInput.value;
      matchingProfile.group = groupInput.value;
      localStorage.setItem('profile', JSON.stringify(profiledata));

      // Firestore 데이터 업데이트
      await updateItemFields(matchingId, groupInput.value, nameInput.value, newDownloadURL);

      // URL 파라미터 업데이트
      const queryParams = new URLSearchParams({
        id: queryid,
        image: newDownloadURL,
        name: nameInput.value,
        group: groupInput.value
      });
      setTimeout(() => {
        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        window.history.pushState(null, '', newUrl);
        location.reload();
      }, 1500);
    }
  }
  }
  else{
    uploadError();
    modalOff();
  }
}



imagecontainer.src = queryimage;
namecontainer.innerHTML = queryname;
groupcontainer.innerHTML = querygroup;

deletemodal.addEventListener('click',modalOff);

infochange.addEventListener('click',()=>{
  if(queryid==="example"){
    cantchange();
  }
  else{
    modalOn();
  }
})

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
  // 사진 중복 시
  Swal.fire({
    title: '업로드 오류',
    text: "다시 작성해주세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

function cantchange(){
  Swal.fire({
    title: '수정 불가',
    text: "기본 프로필은 수정 불가합니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}