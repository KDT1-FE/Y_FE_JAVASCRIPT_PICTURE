// DOMContentLoaded 이벤트가 발생할 때 실행되는 함수
document.addEventListener("DOMContentLoaded", function () {
  // 삭제 버튼 요소 가져오기
  const deleteButton = document.getElementById("delete_button");

  // 삭제 버튼에 클릭 이벤트 리스너 추가
  deleteButton.addEventListener("click", function () {
    // 체크된 체크박스 요소들 가져오기
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");

    if (checkboxes.length > 0) {
      Swal.fire({
        title: "임직원 삭제 확인",
        text: "선택한 임직원을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          // 선택된 체크박스의 부모 요소인 리스트 아이템을 삭제
          checkboxes.forEach((checkbox) => {
            const listItem = checkbox.closest(".list_item");
            if (listItem) {
              listItem.remove();
            }
          });

          Swal.fire("삭제됨!", "선택한 임직원이 삭제되었습니다.", "success");
        }
      });
    } else {
      Swal.fire(
        "체크박스 미선택",
        "삭제하려는 임직원을 선택하세요.",
        "warning"
      );
    }
  });
});
