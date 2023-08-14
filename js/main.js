// 검색 
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    const rows = document.querySelectorAll('.body-tr');

    rows.forEach((row) => {
        const name = row.querySelector('.td-name').textContent;
        const email = row.querySelector('.td-email').textContent;
        
        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
});


// modal 열기
const registerButton = document.getElementById('register-button');
const modalContainer = document.querySelector('.modal-container');
const modalIframe = document.querySelector('.modal-iframe');
const userTableBody = document.querySelector('.user-table-body');

registerButton.addEventListener('click', () => {
    modalContainer.style.display = 'flex';
    modalIframe.contentWindow.postMessage('openModal', '*');
});


// modal 닫기
window.addEventListener('message', (event) => {
    if (event.data === 'modalClosed') {
        modalContainer.style.display = 'none';
    }
});


// firebase 기본 설정
import firebaseConfig from '../config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase, ref as dbRef, onValue } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';

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


// user Data 가져오기
document.addEventListener('DOMContentLoaded', () => {
    const usersRef = dbRef(database, 'users');

    onValue(usersRef, (snapshot) => {
        const data = snapshot.val();

        userTableBody.innerHTML = '';

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                data[key].key = key;

                // 테이블에 유저 정보 추가
                const row = document.createElement('tr');
                row.className = 'body-tr';
    
                const checkboxCell = document.createElement('td');
                const checkboxInput = document.createElement('input');
                checkboxInput.type = 'checkbox';
                checkboxCell.className = 'td-checkbox';
                checkboxCell.appendChild(checkboxInput);
    
                const imageCell = document.createElement('td');
                const imageContainer = document.createElement('div');
                const profileImage = document.createElement('img');
                imageContainer.className = 'image-container';
                profileImage.className = 'profile-image';
                profileImage.src = data[key].photo; 
                imageContainer.appendChild(profileImage);
                imageCell.appendChild(imageContainer);
    
                const nameCell = document.createElement('td');
                nameCell.className = 'td-name';
                nameCell.textContent = data[key].name;
    
                const emailCell = document.createElement('td');
                emailCell.className = 'td-email';
                emailCell.textContent = data[key].email;
    
                const departmentCell = document.createElement('td');
                departmentCell.className = 'td-department';
                departmentCell.textContent = data[key].department;
    
                row.appendChild(checkboxCell);
                row.appendChild(imageCell);
                row.appendChild(nameCell);
                row.appendChild(emailCell);
                row.appendChild(departmentCell);
    
                userTableBody.appendChild(row);
            }
        }
    });
});


