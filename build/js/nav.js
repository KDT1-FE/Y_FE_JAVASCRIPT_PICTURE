import { innerHTML } from "./header.js";
import { deleteBoard } from "./firebase.js";
const insertbutton=document.getElementById('insert');
const deletebutton=document.getElementById('delete');
const deletemodal = document.getElementById('modaldelete');
const modal = document.querySelector('.modal-window');
const imageInput = document.getElementById('imageInput');
const nameInput = document.getElementById('nameInput');
const groupInput = document.getElementById('groupInput');
const uploadLabel = document.querySelector('.upload-button');


imageInput.addEventListener('change', handleImageSelect);

export function clearInputValues() {
  uploadLabel.textContent = '사진';
  nameInput.value = '';
  groupInput.value = '';
}

function handleImageSelect(event) {
  const selectedImage = event.target.files[0];
  if (selectedImage) {
    uploadLabel.textContent = '사진 선택 완료';
    }
}

function modalOn() {
  modal.style.display = "block";
  document.body.classList.add('modal-open');
}


export function modalOff() {
  modal.style.display = "none";
  clearInputValues();
  document.body.classList.remove('modal-open');
}


deletemodal.addEventListener('click',modalOff);


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


export function login(){
  Swal.fire({
    title: '로그인 오류',
    text: "로그인 후 사용 가능합니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

export function uploadError(){
  Swal.fire({
    title: '업로드 오류',
    text: "요소를 전부 작성해주세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

export function firebaseError(){
  Swal.fire({
    title: '업로드 오류',
    text: "다시 작성해주세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

export function storageError(){
  Swal.fire({
    title: '삭제 오류',
    text: "삭제하는 과정에서 오류가 발생했습니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}