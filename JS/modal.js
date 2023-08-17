// 모달
const showModalDiv = document.getElementById("addEmployeeBtn");
const closeModalButton = document.querySelector(".close-modal-button");
const createModal = document.querySelector(".create-modal");

function showModal() {
    createModal.style.display = "block";
  }
  
  function hideModal() {
    createModal.style.display = "none";   
  }

showModalDiv.addEventListener("click", showModal);
closeModalButton.addEventListener("click", hideModal);

window.addEventListener("click", (event) => {
  if (event.target === createModal) {
    hideModal();
  }
});