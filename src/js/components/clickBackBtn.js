const backBtn = document.querySelector("#back button");

backBtn.addEventListener("click", goToDriverListPage);

function goToDriverListPage() {
  location.href = "./driverList.html";
}
