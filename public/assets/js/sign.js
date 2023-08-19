const loginBtn = document.getElementById('login-btn');
let NickName = document.getElementById('nickname');
const logoutBtn = document.getElementById('logout-btn');
const regisBtn = document.getElementById('register');
const signBtn = document.getElementById('sign-btn');

// 헤더에 이용자의 닉네임 출력
function updateNickname(user) {
  if (user && user.displayName) {
    NickName.textContent = user.displayName;
  } else {
    NickName.textContent = '로그인 후 이용해주세요'; // 기본 문구
  }
}

// 로그인
loginBtn.addEventListener('click', function () {
  let email = document.getElementById('email').value;
  let password = document.getElementById('pw').value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      updateNickname(result.user);
      login.style.display = 'none';
      logoutBtn.style.display = 'block';
      window.location.href = '/';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found') {
        // 아이디가 없는 경우
        alert('해당 아이디가 존재하지 않습니다.');
      } else if (errorCode === 'auth/wrong-password') {
        // 비밀번호가 틀린 경우
        alert('비밀번호가 올바르지 않습니다.');
      } else {
        // 기타 오류 처리
        console.error('오류 발생:', error);
      }
    });
});

// 회원가입
regisBtn.addEventListener('click', function () {
  let email = document.getElementById('email-new').value;
  let password = document.getElementById('pw-new').value;
  let name = document.getElementById('name-new').value;

  // 로그인기능 소환
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          result.user.updateProfile({ displayName: name });
          alert('회원가입이 완료되었습니다');
          document.querySelector('#sign-area').style.display = 'none';
          document.querySelector('#login-area').style.display = 'block';
        })
        .catch((error) => {
          console.error('로그인 오류:', error);
        });
    })

    .catch((error) => {
      console.error('회원가입 오류:', error);
    });
});

// 회원가입 버튼 클릭 시, 회원가입 영역 숨기기
signBtn.addEventListener('click', function () {
  document.querySelector('#sign-area').style.display = 'block';
  document.querySelector('#login-area').style.display = 'none';
});
