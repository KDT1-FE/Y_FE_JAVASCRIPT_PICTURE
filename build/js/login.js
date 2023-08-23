const loginform = document.getElementById('login-form');
const loginbutton = document.getElementById('idbutton');
const loading = document.querySelector('.spin-container');
var nonvisible = getComputedStyle(loading).display;
var visible = "flex";
loading.style.display=nonvisible;
var down = getComputedStyle(loading).zIndex;
var up = 2;
loading.style.zIndex=down;
loginbutton.addEventListener('click', function (e) {
  e.preventDefault();
  const id = loginform.id.value;
  const password = loginform.password.value;
  if (id === "user" && password === "1234") {
    sessionStorage.setItem("nums",1);
    loading.style.display = visible;
    loading.style.zIndex = up;
    setTimeout(() => {
      loading.style.display = "none";
      loading.style.zIndex = 0;
      window.location.href = "index.html";
    }, 1000);
  } else {
    e.preventDefault();
    login();
  }
});

function login(){
  Swal.fire({
    title: '로그인 오류',
    text: "아이디 혹은 비밀번호를 다시 입력하세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}