
import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, getDoc, 
    addDoc, doc, getDatabase
} from 'firebase/firestore';
import { 
    getStorage, ref, 
    getDownloadURL, uploadBytes
} from "firebase/storage";
import { v4 } from 'uuid';


const firebaseConfig = {
    apiKey: "AIzaSyCt-sYfvAd7rN2P2c3Hj2gI4tJK5AS_dJs",
    authDomain: "staff-managing-page.firebaseapp.com",
    databaseURL: "https://staff-managing-page-default-rtdb.firebaseio.com",
    projectId: "staff-managing-page",
    storageBucket: "staff-managing-page.appspot.com",
    messagingSenderId: "943185318468",
    appId: "1:943185318468:web:3583a1c18776ee5c56e211"
};

initializeApp(firebaseConfig);

// const db = getDatabase();
const db = getFirestore();
const colRef = collection(db, 'staff');
const storage = getStorage();
const storageRef = ref(storage, `images/${v4()}`); 


const submitBtn = document.getElementById('submit');
const staffListEl = document.querySelector('.list');
const addStaffForm = document.querySelector('.add-page');
const editStaffForm = document.querySelector('.edit-form');


let staff = [];

displayStaffList();



submitBtn.addEventListener('click', addStaff);

async function addStaff(e) {
    e.preventDefault();

    var file = document.querySelector('.image').files[0];

    await uploadBytes(storageRef, file) // random file name generated
    console.log(storageRef.fullPath); 

    const imageURL = await getDownloadURL(ref(storage, `${storageRef.fullPath}`)) // grabbing the file name and getting the URL
    console.log(imageURL);
    
    await addDoc(colRef, {
        Url: imageURL
    })

    const nameInfoEl = document.querySelector('.name');
    const emailInfoEl = document.querySelector('.email');
    const numberInfoEl = document.querySelector('.number');
    const positionInfoEl = document.querySelector('.position');

    const person = {
        id: new Date().getTime(),
        name: nameInfoEl.value,
        email: emailInfoEl.value,
        number: numberInfoEl.value,
        position: positionInfoEl.value,
        imageURL: imageURL
    }

    staff.unshift(person);

    const { listEl } = addStaffEl(person);


    staffListEl.prepend(listEl);
    saveToLocalStorage();
    addStaffForm.reset();


}

function addStaffEl(person) {

    const listEl = document.createElement('div');
    listEl.classList.add('staff');

    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', person.imageURL);

    const nameEl = document.createElement('div');
    nameEl.innerText = person.name;
    const emailEl = document.createElement('div');
    emailEl.innerText = person.email;
    const numberEl = document.createElement('div');
    numberEl.innerText = person.number;
    const positionEl = document.createElement('div');
    positionEl.innerText = person.position;

    const btnElContainer = document.createElement('div');
    btnElContainer.classList.add('list-btn');

    const editBtnEl = document.createElement('a');
    editBtnEl.classList.add('go-edit');
    editBtnEl.setAttribute('href', '#/editpage');
    editBtnEl.innerText = '수정'

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('removebtn');
    removeBtnEl.innerText = '삭제'

    const profileBtnEl = document.createElement('a');
    profileBtnEl.classList.add('go-profile');
    profileBtnEl.setAttribute('href', '#/detailprofile');
    profileBtnEl.innerText = '상세'



    removeBtnEl.addEventListener('click', () => {
   
        staff = staff.filter((s) => s.id !== person.id)
        listEl.remove();


        console.log(staff);
        saveToLocalStorage();
    });



    profileBtnEl.addEventListener('click', createProfile)

    function createProfile() {

        loadFromLocalStorage()
        console.log(staff);
        const targetStaff = staff.filter((s) => s.id === person.id)
        console.log(targetStaff);

        
        const profileImageEl = document.querySelector('.detail-image');
        const profileNameEl = document.querySelector('.profile-name');
        const profileEmailEl = document.querySelector('.profile-email');
        const profileNumberEl = document.querySelector('.profile-number');
        const profilePositionEl = document.querySelector('.profile-position');

        
        profileImageEl.setAttribute('src', targetStaff[0].imageURL);
        profileNameEl.innerHTML = `이름: ${targetStaff[0].name}`;
        profileEmailEl.innerHTML = `이메일: ${targetStaff[0].email}`;
        profileNumberEl.innerHTML = `휴대폰 번호: ${targetStaff[0].number}`
        profilePositionEl.innerHTML = `구분: ${targetStaff[0].position}`

    }



    const editProfileBtn = document.querySelector('#edit-submit');

    editProfileBtn.addEventListener('click', editStaff)
    
    async function editStaff (e) {
        e.preventDefault();


        const editNameEl = document.querySelector('#edit-name');
        const editEmailEl = document.querySelector('#edit-email');
        const editNumberEl = document.querySelector('#edit-number');
        const editPositionEl = document.querySelector('#edit-position');
 
        var file = document.querySelector('#edit-image').files[0];
 
        await uploadBytes(storageRef, file) 

        const imageName = storageRef.fullPath 

        const editImageURL = await getDownloadURL(ref(storage, `${imageName}`));


        const person = {
            name: editNameEl.value,
            email: editEmailEl.value,
            number: editNumberEl.value,
            position: editPositionEl.value,
            url: editImageURL,
        }
    
        saveToLocalStorage();

        const newListEl = document.querySelector('.staff');
    
        newListEl.innerHTML = /* html */ `
        <img src=${editPerson.url} >
        <div>${editPerson.name}</div>
        <div>${editPerson.email}</div>
        <div>${editPerson.number}</div>
        <div>${editPerson.position}</div>
        <div class="list-btn">
            <a href="#/editpage" class="go-edit">수정</a>
            <button class="removebtn">삭제</button>
            <a href="detailprofile" class="go-profile">상세</a>
        </div>
        `
    }

            

    btnElContainer.append(editBtnEl);
    btnElContainer.append(removeBtnEl);
    btnElContainer.append(profileBtnEl);

    listEl.append(imageEl);
    listEl.append(nameEl);
    listEl.append(emailEl);
    listEl.append(numberEl);
    listEl.append(positionEl);
    listEl.append(btnElContainer);

    return { listEl } ;

}


function displayStaffList() {

    loadFromLocalStorage();

    for(let i = 0; i < staff.length; i++) {

        const person = staff[i];

        const { listEl } = addStaffEl(person);

        staffListEl.append(listEl);

    }
        
}


function saveToLocalStorage() {
    const data = JSON.stringify(staff);
    window.localStorage.setItem('staff', data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('staff');

    if(data) {
        staff = JSON.parse(data);
    }
}

