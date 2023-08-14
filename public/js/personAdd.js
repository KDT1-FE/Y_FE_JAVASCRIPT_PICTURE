// Firebase Database 참조 생성
var database = firebase.database();

// 직원 추가 버튼 클릭 시
document
  .querySelector("#addEmployeeBtn")
  .addEventListener("click", function () {
    var name = prompt("이름을 입력하세요:");
    var email = prompt("이메일을 입력하세요:");
    var phone = prompt("휴대폰 번호를 입력하세요:");
    var position = prompt("직급을 입력하세요:");

    // 데이터 추가
    var newDataKey = database.ref("employees").push().key;
    var newData = {
      name: name,
      email: email,
      phone: phone,
      position: position,
    };

    // 데이터베이스에 데이터 추가
    database
      .ref("employees/" + newDataKey)
      .set(newData)
      .then(function () {
        alert("직원이 추가되었습니다.");
        // 페이지 새로고침 또는 필요한 작업 수행
      })
      .catch(function (error) {
        console.error("데이터 추가 실패: ", error);
      });
  });
