
document.addEventListener('DOMContentLoaded', function() {


  const login = document.getElementById('login');
  const logoutBtn = document.getElementById('logout-btn');
  let NickName = document.getElementById('nickname');
  
  logoutBtn.style.display = 'none';
  
  // 로그아웃 함수
  logoutBtn.addEventListener('click', function () {
    firebase.auth().signOut();
    localStorage.removeItem('user');
    updateNickname();
    // alert가 뜨지 않음
    // alert('로그아웃 되었습니다');
    login.style.display = 'block';
    logoutBtn.style.display = 'none';
    
  });
  
  // 닉네임 업데이트 함수
  function updateNickname(user) {
    if (user && user.displayName) {
      NickName.textContent = user.displayName;
    } else {
      NickName.textContent = '로그인 후 이용해주세요'; // 기본 문구
    }
  }
  
  // 유저정보 확인
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'));
    NickName.textContent = user.displayName;
  }
  
  // 사용자의 인증 상태가 변화가 생기면 동작함
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      updateNickname(user); // 인증 상태 변화 시 닉네임 업데이트
      login.style.display = 'none';
      logoutBtn.style.display = 'block';
    } else {
      login.style.display = 'block';
      logoutBtn.style.display = 'none';
    }
  });
  
});