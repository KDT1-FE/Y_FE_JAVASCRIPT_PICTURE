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
const storage = getStorage(app); // storage 객체 가져오기

const nameInput = document.querySelector(".name_input");
const emailInput = document.querySelector(".email_input");
const phoneNumberInput = document.querySelector(".phoneNum_input");
const submitBtn = document.querySelector(".submit_btn");
const label = document.querySelector('label[for="fileInput"]');
const input = document.querySelector('#fileInput');
const profileImg = document.querySelector('#profile_img');

let infoList = JSON.parse(localStorage.getItem('infoList')) || [];

input.addEventListener("change", uploadImg);

function uploadImg() {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImg.src = e.target.result;
            profileImg.style.display = 'block';
            profileImg.style.width = "200px";
            profileImg.style.height = "210px";
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
        // Create an instance of Info class
        if (!profile) {
            const infoInstance = new Info(false, " ", name, email, phoneNumber, true);
            console.log(infoInstance);
            infoList.push(infoInstance);
            localStorage.setItem('infoList', JSON.stringify(infoList));
            history.back();
        } else {
            const file = input.files[0]; // 업로드할 파일

            // Create a new FileReader
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageBase64 = e.target.result; // 이미지 데이터를 base64로 저장

                const storageRef = ref(storage, 'profile_images'); // Firebase Storage 참조 생성

                const fileExtension = file.type.split('/').pop(); // 파일 확장자 추출
                const filename = Date.now().toString() + '.' + fileExtension;
                const imageRef = ref(storageRef, 'profile_images/' + filename);

                uploadString(imageRef, imageBase64, 'data_url').then(snapshot => {
                    console.log('Image uploaded successfully');

                    getDownloadURL(imageRef).then(url => {
                        const infoInstance = new Info(false, url, name, email, phoneNumber, true);
                        infoList.push(infoInstance);
                        localStorage.setItem('infoList', JSON.stringify(infoList));
                        history.back();
                    }).catch(error => {
                        console.error('Error getting download URL: ', error);
                    });
                }).catch(error => {
                    console.error('Error uploading image: ', error);
                });
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    } else {
        alert("값을 입력해주세요");
    }
}

// ... (나머지 스크립트 내용 유지)


submitBtn.addEventListener("click", submitBtnClick);
