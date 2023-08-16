const db = firebase.firestore();
const employeeTable = document.querySelector(".employee-table");
const employeeAddBtn = document.querySelector(".employee-add__button");
const employeeDeleteBtn = document.querySelector(".employee-delete__button");
const modal = document.querySelector(".modal__background");
const closeIcon = document.querySelector(".close-icon");
const employeeForm = document.querySelector("#employee__form");
const checkBox = document.querySelector(".checkbox");
let checkedArr = new Array();

readEmployee();
createEmployee();
deleteEmployee();
checkedAll();

// 직원 등록 모달창 display
employeeAddBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
closeIcon.addEventListener("click", () => {
  modal.style.display = "none";
});

// employee data read
function readEmployee() {
  db.collection("직원")
    .get()
    .then((result) => {
      result.forEach((doc) => {
        // element 생성하고 data innerHTML로 작성
        const tr = document.createElement("tr");
        const inputTd = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.onclick = checked(checkbox);
        inputTd.append(checkbox);
        const imgTd = document.createElement("td");
        const img = document.createElement("img");
        imgTd.append(img);
        const name = document.createElement("td");
        name.innerHTML = doc.data().이름;
        const tel = document.createElement("td");
        tel.innerHTML = doc.data().전화번호;
        const email = document.createElement("td");
        email.innerHTML = doc.data().이메일;
        const dateTime = document.createElement("td");
        dateTime.innerHTML = doc.data().입사날짜;
        // 테이블에 추가
        employeeTable.append(tr);
        tr.append(inputTd, imgTd, name, email, tel, dateTime);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// employee data create
function createEmployee() {
  employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector(".add-data__name");
    const email = document.querySelector(".add-data__email");
    const tel = document.querySelector(".add-data__tel");
    const date = document.querySelector(".add-data__date");

    let employee = {
      이름: name.value,
      이메일: email.value,
      전화번호: tel.value,
      입사날짜: date.value,
    };

    db.collection("직원")
      .add(employee)
      .then((result) => {
        console.log(result);
        alert("직원 등록이 완료되었습니다.");
        window.location.href = "./index.html";
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// 배열 중복 제거
function delDupArr() {
  let uniqueArr = [];
  checkedArr.forEach((element) => {
    if (!uniqueArr.includes(element)) {
      uniqueArr.push(element);
    }
  });
}

// 전체 체크 설정 or 해제
function checkedAll() {
  const checkboxAll = document.querySelector(".checkbox__all");
  checkboxAll.addEventListener("click", () => {
    const isChecked = checkboxAll.checked;
    const checkboxes = document.querySelectorAll(".checkbox");

    if (isChecked) {
      checkedArr = [];
      for (const checkbox of checkboxes) {
        checkbox.checked = true;
        checkedArr.push(checkbox.parentNode.parentNode.children[3].innerHTML);
        delDupArr();
      }
      checkedArr.shift();
    } else {
      for (const checkbox of checkboxes) {
        checkbox.checked = false;
        checkedArr = [];
      }
    }
    console.log(checkedArr);
  });
}

// checked에 따라 배경색 변화, 삭제 위한 직원 이메일 저장
function checked(checkbox) {
  checkbox.addEventListener("change", () => {
    let td = checkbox.parentNode;
    let tr = td.parentNode;

    // checked에 따라 직원 이메일 배열에 추가 or 삭제
    checkbox.checked
      ? checkedArr.push(tr.children[3].innerHTML)
      : (checkedArr = checkedArr.filter(
          (element) => element !== `${tr.children[3].innerHTML}`
        ));

    console.log(checkedArr);

    // checked에 따라 table row 색상 변화
    tr.style.backgroundColor = checkbox.checked ? "#aaa" : "#fff";
    tr.style.color = checkbox.checked ? "white" : "black";
  });
}

// employee data update

// employee data delete
function deleteEmployee() {
  employeeDeleteBtn.addEventListener("click", () => {
    for (let i = 0; i < checkedArr.length; i++) {
      db.collection("직원")
        .where("이메일", "==", `${checkedArr[i]}`)
        .get()
        .then((result) => {
          result.forEach(async (doc) => {
            await db.collection("직원").doc(`${doc.id}`).delete();
            alert("직원 정보가 삭제되었습니다.");
            window.location.href = "./index.html";
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
