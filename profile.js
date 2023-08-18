// Firebase 초기화 및 사용자 정보 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    // Firebase 설정 정보
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 사용자 정보를 표시할 영역 선택
const profileInfoContainer = document.getElementById("profile-info");

// 사용자 정보 가져와서 표시
onAuthStateChanged(auth, (user) => {
    if (user) {
        const profileHTML = `
            <p>이름: ${user.displayName}</p>
            <p>이메일: ${user.email}</p>
            <img src="${user.photoURL}" alt="프로필 사진">
        `;
        profileInfoContainer.innerHTML = profileHTML;
    } else {
        console.log("사용자가 로그인하지 않음");
    }
});


