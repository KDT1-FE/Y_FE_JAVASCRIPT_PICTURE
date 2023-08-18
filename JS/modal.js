const showModalDiv = document.getElementById("addEmployeeBtn");
const closeModalButton = document.querySelector(".md-close-modal-button");
const createModal = document.querySelector(".md-create-modal");

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