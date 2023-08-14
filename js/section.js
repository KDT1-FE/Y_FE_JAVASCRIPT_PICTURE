import { innerHTML } from "./header.js";
const defaultcheckbox = document.querySelectorAll('.defaultcheckbox');
var link = 'profile.html';


function hreflink(){
  location.href=link;
}

defaultcheckbox.forEach(element => {
  element.addEventListener('click',()=>{
    notcheck();
    element.checked = false;
  })
});

function notcheck(){
  Swal.fire({
    title: '조작 금지',
    text: "기본 프로필은 조작 못합니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

function cantprofile(){
  Swal.fire({
    title: '권한 오류',
    text: "로그인 하십시오.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

const list = document.getElementById('list');

list.addEventListener('click', event => {
  if(innerHTML==="로그아웃"){
    const clickedItem = event.target.closest('.item');
    
    if (clickedItem) {
      // 프로필 페이지로 이동
      hreflink();
    }
  }
  else{
    cantprofile();
  }
  });