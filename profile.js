// Firebase 초기화 및 사용자 정보 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    // Firebase 설정 정보
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 로그인 버튼을 클릭하면 구글 로그인 팝업 띄우기
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        // 로그인 성공 시 index.html로 리다이렉션
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error("로그인 실패:", error);
    });
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
