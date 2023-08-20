// addDriver, confirmAccident, driverProfile 페이지에서
// driverList 로 돌아가는 버튼 클릭 이벤트 component
const backBtn = document.querySelector("#back button");

backBtn
  ? backBtn.addEventListener("click", goToDriverListPage)
  : console.log("404 페이지로");

function goToDriverListPage() {
  location.href = "./driverList.html";
}
