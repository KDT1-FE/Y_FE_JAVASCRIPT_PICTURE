const checklogin=document.querySelector('.checklogin');
const checkuser=document.querySelector('.checkuser');
const headertitle = document.querySelector('.headertitle');
let nums=sessionStorage.getItem("nums");
const link='login.html';
const loading = document.querySelector('.spin-container');
const nonvisible = getComputedStyle(document.querySelector('.spin-container')).display;
const down = getComputedStyle(document.querySelector('.spin-container')).zIndex;
const visible = "flex";
loading.style.display=nonvisible;
const up = 2;
loading.style.zIndex=down;

function hreflink(){
  location.href=link;
}

function indexlink(){
  location.href = 'index.html'
}

if(nums!==null) {
  checkuser.innerHTML="매니저";
  checklogin.innerHTML="로그아웃";
}
else{
  checkuser.innerHTML="게스트";
  checklogin.innerHTML="로그인";
}

class changeLoading{
  constructor(loadingEl) {
    this.loadingEl = loadingEl
  }

  changeDisplay(display, zIndex) {
    this.loadingEl.style.display = display;
    this.loadingEl.style.zIndex = zIndex;
  }

}

checklogin.addEventListener('click',()=>{
  let change = new changeLoading(loading)
  if(checklogin.innerHTML==="로그인"){
    change.changeDisplay(visible, up)
    setTimeout(() => {
      change.changeDisplay("none",0)
    }, 1000);
    setTimeout(() => {
      hreflink();
    }, 2000);
  }
  else{
    change.changeDisplay(visible, up)
    setTimeout(() => {
      change.changeDisplay("none",0)
      checkuser.innerHTML="게스트";
      checklogin.innerHTML="로그인";
    }, 1000);
    setTimeout(() => {
      change.changeDisplay(visible, up)
    }, 2000);
    setTimeout(() => {
      hreflink();
    }, 3000);
    sessionStorage.clear();
  }
  })


headertitle.addEventListener('click',()=>{
  indexlink()
})
export const innerHTML = checklogin.innerHTML;