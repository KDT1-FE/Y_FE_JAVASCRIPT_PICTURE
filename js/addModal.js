//등록 모달 띄우기
const addProfileBtn = document.querySelector(".btn__add");
const addProfileModal = document.querySelector(".modal__add-profile");
const closeBtn = document.querySelector(".close");
addProfileBtn.addEventListener("click",()=>{
  addProfileModal.showModal();
})
closeBtn.addEventListener("click",()=>{
  addProfileModal.close();
})