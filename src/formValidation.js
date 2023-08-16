const nameContainer = document.querySelector(".form__input-name");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const editNameInput = document.getElementById("edit-name");
const editEmailInput = document.getElementById("edit-email");

const message = document.createElement("p");
message.className = ["form__validation", "warning"].join(" ");

nameInput.addEventListener("input", (e) => {
  message.textContent =
    e.target.value.length < 5 || e.target.value.length > 15
      ? "Name should be between 5 and 15 characters"
      : "";
});

nameContainer.appendChild(message);
