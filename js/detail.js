// firebase 기본 설정
// import firebaseConfig from '../config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase, ref as dbRef, onValue, update } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';
import { getStorage,  ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-storage.js';

const firebaseConfig = {
    apiKey: "AIzaSyDPF5UusCYbfV2vQUnMXJK6uanZzjqyuuI",
    authDomain: "employee-management-ff85e.firebaseapp.com",
    databaseURL: "https://employee-management-ff85e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "employee-management-ff85e",
    storageBucket: "employee-management-ff85e.appspot.com",
    messagingSenderId: "337700426331",
    appId: "1:337700426331:web:a664094195022a9831257e",
    measurementId: "G-12SDLK0WQY"
  };
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);


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


// 로딩 애니메이션
const loadingAnimation = document.querySelector('.loading-animation');

function showLoadingAnimation() {
    loadingAnimation.style.display = 'block';
}

function hideLoadingAnimation() {
    loadingAnimation.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    showLoadingAnimation();

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
        imageUpdateDoneButton.addEventListener('click', async () => {
            try {
                console.log(user.name);
            
                const imageRef = storageRef(storage, `images/${user.name}-profile`);
                const userRef = dbRef(database, `users/${userId}`);
                    
                showLoadingAnimation();

                const response = await fetch(imageUrl);
                const blob = await response.blob();
                
                await uploadBytes(imageRef, blob);

                const photoUrl = await getDownloadURL(imageRef);
                const userData = {
                    "photo": photoUrl
                };
                
                await update(userRef, userData);

                console.log(`유저 업데이트 성공 ID ${userRef.key}`);
                showToast(`사진이 변경되었습니다!`);
            } catch (error) {
                console.error('[ERROR]:', error);
            } finally {
                hideLoadingAnimation();
                imageUpdateDoneButton.style.display = 'none';
                imageUpdateButton.style.display = 'block';
            }
        });

        hideLoadingAnimation();
    });

});