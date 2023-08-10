import { innerHTML } from "./header.js";
const insertbutton=document.getElementById('insert');
const deletebutton=document.getElementById('delete');
const insertmodal = document.getElementById('modalinsert');
const deletemodal = document.getElementById('modaldelete');
const modal = document.querySelector('.modal-window');
const imageInput = document.getElementById('imageInput');
const uploadLabel = document.querySelector('.upload-button');
const nameInput = document.getElementById('nameInput');
const groupInput = document.getElementById('groupInput');

imageInput.addEventListener('change', handleImageSelect);


function handleImageSelect(event) {
  const selectedImage = event.target.files[0];
  if (selectedImage) {
    uploadLabel.textContent = '사진 선택 완료';
    }
}

function uploadInfo() {
  const image = imageInput.files[0];
  const name = nameInput.value;
  const group = groupInput.value;
  if(image && name && group){
    // 파이어베이스에 업로드하기
    modalOff();
  }
  else{
    uploadError();
  }
}

function modalOn(){
  modal.style.display="block";
}

function modalOff(){
  modal.style.display="none";
}

deletemodal.addEventListener('click',modalOff);

insertmodal.addEventListener('click', uploadInfo);

if(innerHTML==="로그아웃"){
  insertbutton.addEventListener('click',()=>{
    // 모달창 띄우기
    modalOn();

  })
  deletebutton.addEventListener('click',()=>{
    deleteBoard();
  })
}
else{
  insertbutton.addEventListener('click',()=>{
    login();
  })
  deletebutton.addEventListener('click',()=>{
    login();
  })
}

function deleteBoard(seq){
  Swal.fire({
    title: '프로필 삭제',
    text: "삭제하시면 다시 복구시킬 수 없습니다.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '삭제',
    cancelButtonText: '취소'
  }).then((result) => {
    if (result.value) {
            // 체크된 프로필만큼 삭제하는 로직
    }
  })
}

function login(){
  Swal.fire({
    title: '로그인 오류',
    text: "로그인 후 사용 가능합니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

function uploadError(){
  Swal.fire({
    title: '업로드 오류',
    text: "요소를 전부 작성해주세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}