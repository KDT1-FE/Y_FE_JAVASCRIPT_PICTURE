import updateDriverConfirm from "./updateDriverConfirm.js";

const confirmBtn = document.querySelector(".confirmBtn");

confirmBtn.addEventListener("click", sendMoney);

function sendMoney() {
  const driverId = document.location.href.split("?")[1];
  updateDriverConfirm(driverId);

  setTimeout(() => {
    location.href = "./driverList.html";
  }, 1000);
}
