const headertitle = document.querySelector('.headertitle');
const infochange = document.querySelector('.infochange');
const deletemodal = document.getElementById('modaldelete');
const modal = document.querySelector('.modal-window');
const imageInput = document.getElementById('imageInput');
const nameInput = document.getElementById('nameInput');
const groupInput = document.getElementById('groupInput');
const uploadLabel = document.querySelector('.upload-button');
const insertmodal = document.getElementById('modalinsert');
var link = 'index.html';

function hreflink(){
  location.href=link;
}

headertitle.addEventListener('click',()=>{
  hreflink();
})


imageInput.addEventListener('change', handleImageSelect);

function clearInputValues() {
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


function modalOff() {
  modal.style.display = "none";
  clearInputValues();
  document.body.classList.remove('modal-open');
}


deletemodal.addEventListener('click',modalOff);

infochange.addEventListener('click',modalOn);

insertmodal.addEventListener('click',uploadInfo);

function uploadError(){
  Swal.fire({
    title: '업로드 오류',
    text: "요소를 전부 작성해주세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

function firebaseError(){
  Swal.fire({
    title: '업로드 오류',
    text: "다시 작성해주세요.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}

function storageError(){
  Swal.fire({
    title: '삭제 오류',
    text: "삭제하는 과정에서 오류가 발생했습니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}