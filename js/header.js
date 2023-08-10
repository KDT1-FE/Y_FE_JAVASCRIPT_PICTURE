const checklogin=document.querySelector('.checklogin');
const checkuser=document.querySelector('.checkuser');
let nums=sessionStorage.getItem("nums");
var link='login.html';
const loading = document.querySelector('.spin-container');
var nonvisible = getComputedStyle(loading).display;
var visible = "flex";
loading.style.display=nonvisible;
var down = getComputedStyle(loading).zIndex;
var up = 2;
loading.style.zIndex=down;

function hreflink(){
  location.href=link;
}

if(nums!==null) {
  checkuser.innerHTML="매니저";
  checklogin.innerHTML="로그아웃";
}
else{
  checkuser.innerHTML="게스트";
  checklogin.innerHTML="로그인";
}

checklogin.addEventListener('click',()=>{
  if(checklogin.innerHTML==="로그인"){
    loading.style.display = visible;
    loading.style.zIndex = up;
    setTimeout(() => {
      loading.style.display = "none";
      loading.style.zIndex = 0;
    }, 1000);
    setTimeout(() => {
      hreflink();
    }, 2000);
  }
  else{
    loading.style.display = visible;
    loading.style.zIndex = up;
    setTimeout(() => {
      loading.style.display = "none";
      loading.style.zIndex = 0;
      checkuser.innerHTML="게스트";
      checklogin.innerHTML="로그인";
    }, 1000);
    setTimeout(() => {
      loading.style.display = visible;
      loading.style.zIndex = up;
    }, 2000);
    setTimeout(() => {
      hreflink();
    }, 3000);
    sessionStorage.clear();
  }
  })

export const innerHTML = checklogin.innerHTML;