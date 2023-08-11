// firebase 기본 설정
import firebaseConfig from './config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase,  ref as dbRef, set, push } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';
import { getStorage,  ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-storage.js';

const apiKey = firebaseConfig.apiKey;
const authDomain = firebaseConfig.authDomain;
const projectId = firebaseConfig.projectId;
const storageBucket = firebaseConfig.storageBucket;
const messagingSenderId = firebaseConfig.messagingSenderId;
const appId = firebaseConfig.appId;
const measurementId = firebaseConfig.measurementId;
const databaseURL = firebaseConfig.databaseURL;
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);


// 파일 이미지 추가
const fileInput = document.getElementById('file-upload');
const profileImage = document.querySelector('.profile-image');
const fileUploadButton = document.querySelector('.file-upload-button');
let imageUrl = '';

fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
        fileUploadButton.style.display = 'none';
        profileImage.style.border = '1px solid #ccc';
        profileImage.src = URL.createObjectURL(selectedFile);
    }
    imageUrl = profileImage.src;
    console.log(imageUrl);
});


//  입력한 값 등록
const registerButton = document.querySelector('.register-button');

registerButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;

    // 이미지 storage 업로드
    const imageRef = storageRef(storage, `images/${name}-profile`);
   
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            uploadBytes(imageRef, blob).then(() => {
                getDownloadURL(imageRef).then((photoUrl) => {
                    const userData = {
                        "name": name,
                        "email": email,
                        "department": department,
                        "photo": photoUrl 
                    };

                    const usersRef = dbRef(database, 'users');
                    const newUserRef = push(usersRef);
                
                    set(newUserRef, userData).then(() => {
                        console.log(`유저 등록 성공 ID ${newUserRef.key}`);
                    }).catch((error) => {
                        console.error('유저 등록 오류: ', error);
                    });

                }).catch((error) => {
                    console.error('이미지 url 오류', error);
                });
            }).catch((error) => {
                console.error('이미지 업로드 오류:', error);
            });
        })
        .catch((error) => {
            console.error('이미지 다운로드 오류:', error);
        });

    // 등록 후 모달 닫기
    modalWrap.style.display = 'none';
});


// 모달 닫기
const modalWrap = document.querySelector('.modal-wrap');
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', () => {
    modalWrap.style.display = 'none';
});
