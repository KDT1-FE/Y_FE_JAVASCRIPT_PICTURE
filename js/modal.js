// firebase 기본 설정
import firebaseConfig from '../config.js';
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


// toast message
const toast = document.querySelector('.toast-wrap');

function showToast(message) {
    const toastMessage = document.querySelector('.toast-message');
    toastMessage.textContent = message;

    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000); 
}

// 등록 후 input 초기화 및 모달 닫기
function resetInputsAndCloseModal() {
    document.getElementById('name').value = ''; 
    document.getElementById('email').value = ''; 
    document.getElementById('department').value = '';
    document.querySelector('.profile-image').src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    fileUploadButton.style.display = 'flex';
    profileImage.style.border = 'none';
    modalWrap.style.display = 'none';
    window.parent.postMessage('modalClosed', '*');
}


// 로딩 애니메이션
const loadingAnimation = document.querySelector('.loading-animation');

function showLoadingAnimation() {
    loadingAnimation.style.display = 'block';
}

function hideLoadingAnimation() {
    loadingAnimation.style.display = 'none';
}


//  입력한 값 등록
const registerButton = document.querySelector('.register-button');

registerButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;

    // 이미지 storage 업로드
    const imageRef = storageRef(storage, `images/${name}-profile`);

    showLoadingAnimation();

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
                        hideLoadingAnimation();
                        showToast(`등록되었습니다!`);
                        setTimeout(() => {
                            resetInputsAndCloseModal();
                        }, 2000);
                    }).catch((error) => {
                        console.error('유저 등록 오류: ', error);
                        hideLoadingAnimation();
                    });
                }).catch((error) => {
                    console.error('이미지 url 오류', error);
                    hideLoadingAnimation();
                });
            }).catch((error) => {
                console.error('이미지 업로드 오류:', error);
                hideLoadingAnimation();
            });
        })
        .catch((error) => {
            console.error('이미지 다운로드 오류:', error);
            hideLoadingAnimation();
        });
});


// 모달 닫기
const modalWrap = document.querySelector('.modal-wrap');
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', () => {
    // input 초기화
    document.getElementById('name').value = ''; 
    document.getElementById('email').value = ''; 
    document.getElementById('department').value = '';
    document.querySelector('.profile-image').src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='; // 투명 이미지로 에러 이미지 감추기
    fileUploadButton.style.display = 'flex';
    profileImage.style.border = 'none';

    modalWrap.style.display = 'none';
    window.parent.postMessage('modalClosed', '*');
});

// 모달 열기
window.addEventListener('message', (event) => {
    if (event.data === 'openModal') {
        modalWrap.style.display = 'flex';
    }
});
