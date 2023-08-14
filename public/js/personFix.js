// 직원 수정 버튼 클릭 시
document
  .querySelector("#updateEmployeeBtn")
  .addEventListener("click", function () {
    var employeeId = prompt("수정할 직원의 고유 ID를 입력하세요:");
    var newName = prompt("새 이름을 입력하세요:");
    var newEmail = prompt("새 이메일을 입력하세요:");
    var newPhone = prompt("새 휴대폰 번호를 입력하세요:");
    var newPosition = prompt("새 직급을 입력하세요:");

    // 데이터 수정
    var updateData = {
      name: newName,
      email: newEmail,
      phone: newPhone,
      position: newPosition,
    };

    // 데이터베이스에 데이터 수정
    database
      .ref("employees/" + employeeId)
      .update(updateData)
      .then(function () {
        alert("직원 정보가 수정되었습니다.");
        // 페이지 새로고침 또는 필요한 작업 수행
      })
      .catch(function (error) {
        console.error("데이터 수정 실패: ", error);
      });
  });
