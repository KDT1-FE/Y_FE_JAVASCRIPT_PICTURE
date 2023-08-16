const db = firebase.firestore();
const employeeTable = document.querySelector(".employee-table");
const employeeAddBtn = document.querySelector(".employee-add__button");
const employeeDeleteBtn = document.querySelector(".employee-delete__button");
const modal = document.querySelector(".modal__background");
const closeIcon = document.querySelector(".close-icon");
const employeeForm = document.querySelector("#employee__form");
const submitBtn = document.querySelector(".submit__button");
const delCheckbox = document.querySelector(".checkbox");

readEmployee();
createEmployee();
deleteEmployee();

let checkedArr = new Array();

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

// checked에 따라 배경색 변화, 삭제 위한 직원 이메일 저장
function checked(checkbox) {
  checkbox.addEventListener("change", () => {
    // checked에 따라 table row 색상 변화
    let td = checkbox.parentNode;
    let tr = td.parentNode;
    tr.style.backgroundColor = checkbox.checked ? "#aaa" : "#fff";
    tr.style.color = checkbox.checked ? "white" : "black";

    // checked에 따라 직원 이메일 배열에 추가 or 삭제
    checkbox.checked
      ? checkedArr.push(tr.children[3].innerHTML)
      : checkedArr.pop();
    console.log(checkedArr);
  });
}

// employee data update

// employee data delete
function deleteEmployee() {
  employeeDeleteBtn.addEventListener("click", () => {
    const q = query(collection(db, "직원"), where("이메일", "in", "gmail"));
    getDocs(q).forEach((doc) => {
      console.log(doc.id, " : ", doc.data());
    });
    // 문서 삭제위해 id가져오기
    // db.collection("직원")
    //   .get()
    //   .then((result) => {
    //     result.forEach((doc) => {
    //       console.log(doc.id);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // await db.collection("직원").doc("zP1huHLskkd7mgI1S4qc").delete();
    // window.location.href = "./index.html";
  });
}
