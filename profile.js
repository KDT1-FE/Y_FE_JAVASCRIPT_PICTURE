// Firebase 초기화 및 사용자 정보 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    // Firebase 설정 정보
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", () => {
    const redirectURL = encodeURIComponent(window.location.href);
    const loginURL = `login.html?redirect=${redirectURL}`;
    window.open(loginURL, "_blank");
});

const urlParams = new URLSearchParams(window.location.search);
const redirectURL = urlParams.get("redirect");

// 리다이렉션 버튼을 클릭하면 로그인을 처리하고 원래 페이지로 돌아갑니다.
const redirectButton = document.getElementById("redirect-button");

redirectButton.addEventListener("click", () => {
    // 로그인 처리 코드 (signInWithPopup 등)

    // 로그인이 성공하면 원래 페이지로 리다이렉션
    window.location.href = redirectURL;
});

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
