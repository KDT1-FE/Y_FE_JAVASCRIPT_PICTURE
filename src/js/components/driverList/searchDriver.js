// HTML document를 전부 읽고 DOM트리를 완성하는 즉시 이벤트가 호출
document.addEventListener("DOMContentLoaded", searchDriver);

function searchDriver() {
  // 검색창 element를 id값으로 가져오기
  const searchDriverInput = document.querySelector("#searchDriver");
  // 테이블의 tbody element를 id값으로 가져오기
  const driversTbody = document.querySelector("#drivers");

  //검색창 element에 keyup 이벤트 세팅. 글자 입력 시 마다 발생.
  searchDriverInput.addEventListener("keyup", () => {
    // 사용자가 입력한 검색어의 value값을 가져와 소문자로 변경하여 searchInputValue에 저장
    const searchInputValue = searchDriverInput.value.toLowerCase();
    // 현재 tbody안에 있는 모든 tr element를 가져와 drivers에 저장
    const drivers = driversTbody.querySelectorAll("tr");

    //tr들 for문으로 순회
    for (var i = 0; i < drivers.length; i++) {
      // 현재 순회중인 tr의 textContent를 소문자로 변경하여 driverName에 저장
      var driverName = drivers[i].children[2].textContent.toLowerCase();
      // driverName가 searchInputValue를 포함하면, 해당 tr은 보여지게 하고, 그렇지 않으면 숨긴다.
      if (driverName.includes(searchInputValue)) {
        drivers[i].style.display = "";
      } else {
        drivers[i].style.display = "none";
      }
    }
  });
}
