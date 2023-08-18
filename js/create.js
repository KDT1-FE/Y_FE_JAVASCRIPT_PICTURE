import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getStorage, ref, uploadString, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';

const firebaseConfig = {
    apiKey: "AIzaSyBO_nQ-frTFItkeS6UlWGnYjxuxsFgxwSU",
    authDomain: "kdt0-js-project.firebaseapp.com",
    projectId: "kdt0-js-project",
    storageBucket: "kdt0-js-project.appspot.com",
    messagingSenderId: "623556572356",
    appId: "1:623556572356:web:284b641a1703fc9e6ec591",
    measurementId: "G-CXEL9J682Z"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const nameInput = document.querySelector(".name_input");
const emailInput = document.querySelector(".email_input");
const phoneNumberInput = document.querySelector(".phoneNum_input");
const submitBtn = document.querySelector(".form_btn");
const input = document.querySelector('#fileInput');
const profileImg = document.querySelector('#profile_img');
const backBtn = document.querySelector(".back_container");
const background = document.querySelector(".background");
const loadingBar = document.querySelector(".loading");


const queryParams = new URLSearchParams(window.location.search);
let infoList = JSON.parse(localStorage.getItem('infoList')) || [];
const itemIndex = queryParams.get("index");
const selectedItem = infoList[itemIndex];

input.addEventListener("change", uploadImg);

if (selectedItem) {
    if (selectedItem.profileImgUrl !== " ") {
        profileImg.style.display = 'block';
        profileImg.style.width = "200px";
        profileImg.style.height = "220px";
        profileImg.src = selectedItem.profileImgUrl;
    }
    
    nameInput.value = selectedItem.name;
    emailInput.value = selectedItem.email;
    phoneNumberInput.value = selectedItem.phoneNumber;
}

function uploadImg() {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImg.src = e.target.result;
            profileImg.style.display = 'block';
            profileImg.style.width = "200px";
            profileImg.style.height = "220px";
        };
        reader.readAsDataURL(file);
    }
}

class Info {
    constructor(isChecked, profileImgUrl, name, email, phoneNumber, isActive) {
        this.isChecked = isChecked;
        this.profileImgUrl = profileImgUrl;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isActive = isActive;
    }
}

function submitBtnClick() {
    let profile = profileImg.src;
    let name = nameInput.value;
    let email = emailInput.value;
    let phoneNumber = phoneNumberInput.value;

    if (name && email && phoneNumber) {
        if (selectedItem) {
            // Case 1: selectedItem가 있고 사진도 변경되지 않은 경우
            if (!input.files[0]) {
                // 기존 사진 URL 유지
                profile = selectedItem.profileImgUrl;
            } else {
                // 기존 사진 대신 새로운 사진 업로드
                const file = input.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageBase64 = e.target.result;
                    const storageRef = ref(storage, 'profile_images');
                    const fileExtension = file.type.split('/').pop();
                    const filename = Date.now().toString() + '.' + fileExtension;
                    const imageRef = ref(storageRef, 'profile_images/' + filename);
        
                    uploadString(imageRef, imageBase64, 'data_url').then(snapshot => {
                        getDownloadURL(imageRef).then(url => {
                            profile = url;
                            updateInfo(profile, name, email, phoneNumber);
                            console.log(infoList);
                            localStorage.setItem('infoList', JSON.stringify(infoList));
                            history.back();
                            console.log("success!");
                        }).catch(error => {
                            console.error('Error getting download URL: ', error);
                        });
                    }).catch(error => {
                        console.error('Error uploading image: ', error);
                    });
                };
                reader.readAsDataURL(file);
            }
        } else {
            // Case 3: selectedItem이 없고 사진이 선택된 경우
            if (input.files[0]) {
                const file = input.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageBase64 = e.target.result;
                    const storageRef = ref(storage, 'profile_images');
                    const fileExtension = file.type.split('/').pop();
                    const filename = Date.now().toString() + '.' + fileExtension;
                    const imageRef = ref(storageRef, 'profile_images/' + filename);

                    uploadString(imageRef, imageBase64, 'data_url').then(snapshot => {
                        getDownloadURL(imageRef).then(url => {
                            profile = url;
                            addNewInfo(profile, name, email, phoneNumber);
                            console.log(infoList);
                            localStorage.setItem('infoList', JSON.stringify(infoList));
                            history.back();
                            console.log("success!");
                        }).catch(error => {
                            console.error('Error getting download URL: ', error);
                        });
                    }).catch(error => {
                        console.error('Error uploading image: ', error);
                    });
                };
                reader.readAsDataURL(file);
            } else {
                // Case 4: selectedItem이 없고 사진도 선택되지 않은 경우
                profile = " "; // " " 값 대체
                addNewInfo(profile, name, email, phoneNumber);
                console.log(infoList);
                localStorage.setItem('infoList', JSON.stringify(infoList));
                history.back();
                console.log("success!");
            }
        }
    } else {
        alert("값을 입력해주세요");
    }
}


function addNewInfo(profile, name, email, phoneNumber) {
    const newInfo = new Info(false, profile, name, email, phoneNumber, true);
    infoList.push(newInfo);
}

function updateInfo(profile, name, email, phoneNumber) {
    const updatedInfo = new Info(false, profile, name, email, phoneNumber, true);
    console.log(updatedInfo);
    infoList.splice(itemIndex, 1, updatedInfo);
}

submitBtn.addEventListener("click", () => {
    
    showLoadingBar();
    setTimeout(() => {
        submitBtnClick();
        
    }, 1500);
});

backBtn.addEventListener("click", () => {
    window.location.href = "main.html";
});

function showLoadingBar() {
    background.style.display = "block";
}

