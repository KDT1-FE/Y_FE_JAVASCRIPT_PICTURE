// 보험자 리스트 페이지에서
//table tbody의 tr 데이터 중 driverName을 검섹하는 Component

// HTML document를 전부 읽고 DOM 트리를 완성하는 즉시 searchDriver 콜백함수 호출
document.addEventListener("DOMContentLoaded", searchDriver);

function searchDriver() {
  try {
    const searchDriverInput = document.getElementById("searchDriver");
    const driversTbody = document.getElementById("drivers");

    if (searchDriverInput && driversTbody) {
      //검색창 element에 keyup 이벤트 추가가
      searchDriverInput.addEventListener("keyup", () => {
        // 사용자가 입력한 검색어의 value값을 가져와 소문자로 변경 후 searchInputValue에 할당
        const searchInputValue = searchDriverInput.value
          .toLowerCase()
          .split(" ")
          .join("");
        // 현재 tbody안에 있는 모든 tr element를 가져와 drivers에 할당
        const drivers = driversTbody.querySelectorAll("tr");

        //tr들 for문으로 순회
        drivers.forEach(driver => {
          // 현재 순회중인 tr의 driverName 부분을 textContent를 소문자로 변경 후 driverName에 할당
          const driverName = driver.children[2].textContent
            .toLowerCase()
            .split(" ")
            .join("");
          // driverName아 searchInputValue를 포함하면, 해당 tr은 보여지게 하고, 그렇지 않으면 숨긴다.
          if (driverName.includes(searchInputValue)) {
            driver.style.display = "";
          } else {
            driver.style.display = "none";
          }
        });
      });
    } else throw "404 페이지로";
  } catch {
    err => {
      console.log(err);
    };
  }
}
