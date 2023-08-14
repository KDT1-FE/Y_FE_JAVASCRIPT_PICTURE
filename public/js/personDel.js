// 직원 삭제 버튼 클릭 시
document
  .querySelector("#deleteEmployeeBtn")
  .addEventListener("click", function () {
    var employeeId = prompt("삭제할 직원의 고유 ID를 입력하세요:");

    // 데이터 삭제
    database
      .ref("employees/" + employeeId)
      .remove()
      .then(function () {
        alert("직원이 삭제되었습니다.");
        // 페이지 새로고침 또는 필요한 작업 수행
      })
      .catch(function (error) {
        console.error("데이터 삭제 실패: ", error);
      });
  });
