// script.js
import { auth, googleAuthProvider } from "./firebase.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"; // 추가

const registerButton = document.querySelector(".register-btn");

registerButton.addEventListener("click", () => {
  // 구글 로그인 팝업 띄우기
  signInWithGooglePopup();
});

// 구글 로그인 팝업을 띄우는 함수
async function signInWithGooglePopup() {
  try {
    await signInWithPopup(auth, googleAuthProvider); // signInWithPopup 함수를 사용
    console.log("구글 로그인 성공!");
    // 여기서 강아지 등록 페이지로 이동하는 로직을 추가할 수 있습니다.
  } catch (error) {
  }
}
