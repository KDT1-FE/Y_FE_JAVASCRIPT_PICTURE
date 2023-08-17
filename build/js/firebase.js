import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { uploadError, modalOff, firebaseError } from "./nav.js";
import { storageError, clearInputValues } from "./nav.js";
import { innerHTML } from "./header.js";

const imageInput = document.getElementById('imageInput');
const nameInput = document.getElementById('nameInput');
const groupInput = document.getElementById('groupInput');
const insertmodal = document.getElementById('modalinsert');
const allcheckbox = document.getElementById('allcheckbox');

let profiles=[];

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvKQZE-17ZEDy3yVmi3ZKWtzjYBFLTHJY",
  authDomain: "fastcampusxyanolja-assginment.firebaseapp.com",
  databaseURL: "https://fastcampusxyanolja-assginment-default-rtdb.firebaseio.com",
  projectId: "fastcampusxyanolja-assginment",
  storageBucket: "fastcampusxyanolja-assginment.appspot.com",
  messagingSenderId: "946409350884",
  appId: "1:946409350884:web:050748a6262fce560faef1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

insertmodal.addEventListener('click', uploadInfo);

async function uploadInfo() {
  const image = imageInput.files[0];
  const name = nameInput.value;
  const group = groupInput.value;
  const id = new Date().getTime();

  if (image && name && group) {
    const storage = getStorage();
    const storageRef = ref(storage, 'images');

    const listResult = await listAll(storageRef);
    for (const item of listResult.items) {
      const fileName = item.name;
      if (fileName === image.name) {
        cantupload();
        clearInputValues();
        setTimeout(() => {
          location.reload();
        }, 1000);
        return;
      }
    }

    
      try {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + image.name);
        const uploadTask = uploadBytes(storageRef, image);
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        const imagesCollection = collection(db, 'images');
        await addDoc(imagesCollection, {
          id: id,
          name: name,
          group: group,
          imageUrl: downloadURL
        });
  
        console.log('Image and information upload completed');
        modalOff();
        //
        newprofiles(id, downloadURL, name, group);
        location.reload();
  
        // console.log(downloadURL, name, group);
        // const imageContainer = document.getElementById('list');
        // imageContainer.innerHTML = '';
        // imageContainer.appendChild(imageElement);
  
      } catch (error) {
        console.error('Error uploading image and information:', error);
        firebaseError();
      }
  } else {
    uploadError();
    modalOff();
  }
}

const list = document.getElementById('list');

function newprofiles(id, downloadURL, name, group) {
  const item = {
    id: id,
    image: downloadURL,
    name: name,
    group: group,
    complete: false
  };

  profiles.unshift(item); // 새로운 프로필 아이템을 배열에 추가합니다

  console.log(profiles);
  const { itemEl } = createProfileElement(item);

  list.prepend(itemEl);
  saveToLocalStorage();
}

// div -> checkbox / div -> image() / div(name) / div(group)
function createProfileElement(item) {

  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  const outcheckboxEl = document.createElement('div');
  outcheckboxEl.classList.add('checkbox');

  const checkboxEl = document.createElement('input');
  checkboxEl.type = 'checkbox';
  checkboxEl.classList.add('che');
  checkboxEl.checked = item.complete;

  outcheckboxEl.append(checkboxEl);

  const imageEl = document.createElement('div');
  imageEl.classList.add('image');

  const innerimage = document.createElement('img');
  imageEl.append(innerimage);

  const nameEl = document.createElement('div');
  nameEl.classList.add('name');

  const groupEl = document.createElement('div');
  groupEl.classList.add('group');


  if (item.complete) {
      itemEl.classList.add('complete');
  }


  //Events
  checkboxEl.addEventListener('change',()=>{
      item.complete = checkboxEl.checked
      if(item.complete){
          itemEl.classList.add('complete')
      }else{
          itemEl.classList.remove('complete')
      }
      saveToLocalStorage();
  })


  
  innerimage.src = item.image;
  nameEl.innerHTML = item.name;
  groupEl.innerHTML = item.group;
  // deletebutton.addEventListener('click',()=>{
  //     profiles=profiles.filter(t => t.id !== item.id)
  //     itemEl.remove()
  // })

  outcheckboxEl.append(checkboxEl);
  imageEl.append(innerimage);
  itemEl.append(outcheckboxEl);
  itemEl.append(imageEl);
  itemEl.append(nameEl);
  itemEl.append(groupEl);

  return { itemEl, checkboxEl, innerimage, nameEl, groupEl };
}

function displayprofile(){
  loadFromLocalStorage()
  for(let i=0;i<profiles.length;i++){
    const item = profiles[i]

    const existingItem = document.querySelector(`[data-id="${item.id}"]`);
    
    // 만약 화면에 해당 프로필이 없다면 새로 추가
    if (!existingItem) {
      const { itemEl } = createProfileElement(item);
      list.append(itemEl);
  }
} 
}

function saveToLocalStorage(){
  const data = JSON.stringify(profiles)
  localStorage.setItem('profile', data)
}

function loadFromLocalStorage(){
  const data = localStorage.getItem('profile')

  if(data){
      profiles = JSON.parse(data)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  displayprofile();
});

allcheckbox.addEventListener('click', () => {
  const isChecked = allcheckbox.checked;

  const checkboxes = document.querySelectorAll('.che');
  checkboxes.forEach(checkbox => {
    checkbox.checked = isChecked;

    const itemElement = checkbox.closest('.item');
    itemElement.classList.toggle('complete', isChecked);

    const profileItem = profiles.find(item => item.image === itemElement.querySelector('.image img').src);
    if (profileItem) {
      profileItem.complete = isChecked;
    }
  });
});

export async function deleteBoard() {
  Swal.fire({
    title: '프로필 삭제',
    text: "선택된 프로필들이 삭제됩니다.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '삭제',
    cancelButtonText: '취소'
  }).then(async (result) => {
    if (result.value) {
      const itemcompleted = document.querySelectorAll('.item.complete');
      itemcompleted.forEach(async completeditems => {
        const imageUrl = completeditems.querySelector('.image img').src;
        const profileItem = profiles.find(profile => profile.image === imageUrl);
        const decodedImageUrl = decodeURIComponent(imageUrl);
        if (profileItem) {
          profiles = profiles.filter(p => p.id !== profileItem.id);
          completeditems.remove();
          

          const storage = getStorage();
          const storageRef = ref(storage, decodedImageUrl);
          
          try {
            await deleteObject(storageRef);
          } catch (error) {
            storageError();
          }

          await deleteFirestoreDocument(imageUrl);
          allcheckbox.checked = false;
        }
      });

      saveToLocalStorage();
    }
  });
}

async function deleteFirestoreDocument(imageUrl) {
  const imagesCollection = collection(db, 'images');
  const querySnapshot = await getDocs(imagesCollection);
  querySnapshot.forEach(async (doc) => {
    const docData = doc.data();
    if (docData.imageUrl === imageUrl) {
      await deleteDoc(doc.ref);
    }
  });
}

function getClickedImageInfo(clickedImage) {
  const imageSrc = clickedImage.src;
  const item = profiles.find(profile => profile.image === imageSrc);
  
  if (item) {
    const { id, image, name, group } = item;
    return { id, image, name, group };
  } else {
    return null;
  }
}

list.addEventListener('click', event => {
  if (innerHTML === "로그아웃") {
    const clickedItem = event.target.closest('.item');

    if ((clickedItem && !event.target.classList.contains('defaultcheckbox')) && (clickedItem && !event.target.classList.contains('che'))) {
      const clickedImage = clickedItem.querySelector('.image img');
      const clickedName = clickedItem.querySelector('.name');
      const clickedGroup = clickedItem.querySelector('.group');
      const clickedImageInfo = getClickedImageInfo(clickedImage);
      if (clickedImageInfo) {
        const { id, image, name, group } = clickedImageInfo;

        // 정보를 포함한 쿼리 문자열 생성
        const queryParams = new URLSearchParams({
          id: id,
          image: image,
          name: name,
          group: group
        });

        // 쿼리 매개변수를 다음 페이지 URL에 추가
        const nextPageUrl = `profile.html?${queryParams}`;
        window.location.href = nextPageUrl;
      } 
      else {
        const queryParams = new URLSearchParams({
          id: 'example',
          image: clickedImage.src,
          name: clickedName.textContent,
          group: clickedGroup.textContent,
        });

        const nextPageUrl = `profile.html?${queryParams}`;
        window.location.href = nextPageUrl;
      }
    }
  } else {
    cantprofile();
    allcheckbox.checked=false;
    const checkboxes = document.querySelectorAll('.che');
    checkboxes.forEach(cheElement => {
      cheElement.checked = false;
  });
  }
});

function cantprofile(){
  Swal.fire({
    title: '접근 제한',
    text: "로그인 후 이용 가능합니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

function cantupload(){
  Swal.fire({
    title: '업로드 제한',
    text: "동일한 사진은 업로드 불가합니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}