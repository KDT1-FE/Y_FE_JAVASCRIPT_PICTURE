const openModal = () => {
  document.querySelector(".open_modal").classList.remove("hidden");
};

const closeModal = () => {
  document.querySelector(".open_modal").classList.add("hidden");
};

document.querySelector(".pregister_btn").addEventListener("click", openModal);
document.querySelector(".close_btn").addEventListener("click", closeModal);
document.querySelector(".bg").addEventListener("click", closeModal);

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview_profile").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById("preview").src = "";
  }
}
