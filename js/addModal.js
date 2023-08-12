//등록 모달 띄우기
const addProfileBtn = document.querySelector(".btn__add");
const addProfileModal = document.querySelector(".modal__add-profile");
const closeBtn = document.querySelector(".btn__close");
addProfileBtn.addEventListener("click",()=>{
  addProfileModal.showModal();
})
closeBtn.addEventListener("click",()=>{
  document.querySelector(".preview").src = "./assets/images/human_icon.png";
  document.querySelector('.profile__name').value="";
  document.querySelector('.profile__position').value="";
  document.querySelector('.profile__github').value="";
  document.querySelector('.profile__email').value="";
  document.querySelector('.profile__introduce').value="";
  addProfileModal.close();
})