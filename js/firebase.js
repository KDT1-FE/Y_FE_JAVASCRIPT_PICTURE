import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { uploadError, modalOff, firebaseError } from "./nav.js";

const imageInput = document.getElementById('imageInput');
const nameInput = document.getElementById('nameInput');
const groupInput = document.getElementById('groupInput');
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

export async function uploadInfo() {
  const image = imageInput.files[0];
  const name = nameInput.value;
  const group = groupInput.value;

  if (image && name && group) {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + image.name);
      const uploadTask = uploadBytes(storageRef, image);
      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      const imagesCollection = collection(db, 'images');
      await addDoc(imagesCollection, {
        name: name,
        group: group,
        imageUrl: downloadURL
      });

      console.log('Image and information upload completed');
      modalOff();
      // console.log(downloadURL, name, group);
      const list = document.getElementById('list');
      function newprofiles(){
        const item = {
          id: new Date().getTime(),
          image: downloadURL,
          name: name,
          group: group,
          complete: false
        };
      
        profiles.unshift(item); // 새로운 프로필 아이템을 배열에 추가합니다

        console.log(profiles)
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
        checkboxEl.classList.add('checkbox');
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
        
        innerimage.src = downloadURL;

        nameEl.innerHTML=name;

        groupEl.innerHTML=group;
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

        // list item 요소 생성
          const { itemEl } = createProfileElement(item);


        // list div 안에 추가
          list.append(itemEl)
      }
    }
      newprofiles();
      displayprofile();
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
      // const imageContainer = document.getElementById('list');
      // imageContainer.innerHTML = '';
      // imageContainer.appendChild(imageElement);

    } catch (error) {
      console.error('Error uploading image and information:', error);
      firebaseError();
    }
  } else {
    uploadError();
  }
}




