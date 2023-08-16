// firebase 기본 설정
import firebaseConfig from '../config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase, ref as dbRef, onValue, update } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';
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


document.addEventListener('DOMContentLoaded', () => {
    // 클릭한 user 정보 가져오기
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userId');
    console.log(userId);

    const usersRef = dbRef(database, 'users');

    onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const user = data[userId];

        if (user) {
            console.log(user);
            const nameSpan = document.getElementById('name');
            const emailSpan = document.getElementById('email');
            const departmentSpan = document.getElementById('department');
            const photoSpan = document.querySelector('.detail-profile-image');

            photoSpan.src =  user.photo;
            nameSpan.textContent = user.name;
            emailSpan.textContent = user.email;
            departmentSpan.textContent = user.department;
        }


        // 사진 수정
        const imageUpdateButton = document.querySelector('.image-update-button');
        const imageUpdateDoneButton = document.querySelector('.image-update-done-button');
        const fileInput = document.getElementById('image-update');
        const profileImage = document.querySelector('.detail-profile-image');
        let imageUrl = '';

        fileInput.addEventListener('change', (event) => {
            const selectedFile = event.target.files[0];
            
            if (selectedFile) {
                imageUpdateButton.style.display = 'none';
                imageUpdateDoneButton.style.display = 'block';
                profileImage.src = URL.createObjectURL(selectedFile);
            } 
             
            imageUrl = profileImage.src;
            console.log(imageUrl);
        });

        // 사진 수정 완료
        imageUpdateDoneButton.addEventListener('click', () => {
            console.log(user.name);
            
            const imageRef = storageRef(storage, `images/${user.name}-profile`);
            const userRef = dbRef(database, `users/${userId}`);
                
            fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                uploadBytes(imageRef, blob).then(() => {
                    getDownloadURL(imageRef).then((photoUrl) => {
                        const userData =  {
                            "photo": photoUrl
                        }

                        update(userRef, userData).then(() => {
                            console.log(`유저 등록 성공 ID ${userRef.key}`);
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

            imageUpdateDoneButton.style.display = 'none';
            imageUpdateButton.style.display = 'block';
        });
    });

});