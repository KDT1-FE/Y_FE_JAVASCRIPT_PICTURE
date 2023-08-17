const modal = document.querySelector(".modal__background");
const employeeAddBtn = document.querySelector(".employee-add__button");
const closeIcon = document.querySelector(".close-icon");

export let checkedArr = new Array();

checkedAll();

// 직원 등록 모달창 display
employeeAddBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
closeIcon.addEventListener("click", () => {
  modal.style.display = "none";
});

// checkedArr 배열 중복 제거
function delDupArr() {
  let uniqueArr = [];
  checkedArr.forEach((element) => {
    if (!uniqueArr.includes(element)) {
      uniqueArr.push(element);
    }
  });
}

// 전체 체크 or 해제
function checkedAll() {
  const checkboxAll = document.querySelector(".checkbox__all");

  checkboxAll.addEventListener("click", () => {
    const isChecked = checkboxAll.checked;
    const checkboxes = document.querySelectorAll(".checkbox");

    if (isChecked) {
      checkedArr = []; // 배열 초기화

      for (const checkbox of checkboxes) {
        // 전체 체크박스 선택
        let td = checkbox.parentNode;
        let tr = td.parentNode;
        checkbox.checked = true;

        // 선택된 모든 직원의 이메일 배열에 삽입
        let email = tr.children[3].innerHTML;
        checkedArr.push(email);
        delDupArr();

        tr.style.backgroundColor = "#aaa";
        tr.style.color = "white";
      }
      checkedArr.shift(); // 배열의 첫 번째 요소는 title
    } else {
      for (const checkbox of checkboxes) {
        // 전체 체크박스 해제
        let td = checkbox.parentNode;
        let tr = td.parentNode;
        checkbox.checked = false;

        checkedArr = []; // 배열 초기화

        tr.style.backgroundColor = "#fff";
        tr.style.color = "black";
      }
    }
    console.log(checkedArr);
  });
}

export function checked(checkbox) {
  checkbox.addEventListener("change", () => {
    let td = checkbox.parentNode;
    let tr = td.parentNode;
    let email = tr.children[3].innerHTML;

    // checked에 따라 직원 이메일 배열에 추가 or 삭제
    checkbox.checked
      ? checkedArr.push(email)
      : (checkedArr = checkedArr.filter((element) => element !== email));

    console.log(checkedArr);

    // checked에 따라 table row 색상 변화
    tr.style.backgroundColor = checkbox.checked ? "#aaa" : "#fff";
    tr.style.color = checkbox.checked ? "#fff" : "#000";
  });
}
