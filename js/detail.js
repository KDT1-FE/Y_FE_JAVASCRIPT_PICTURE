// firebase 기본 설정
import firebaseConfig from '../config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase, ref as dbRef, onValue } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';
import { getStorage,  ref as storageRef } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-storage.js';

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
    });

});