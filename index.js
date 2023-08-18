import { readUserData, deleteUserData } from "./firebase.js";

readUserData();
let deleteArr = [];
document.addEventListener("click", function (e) {
  console.log(e.target);
  const clickTarget = e.target;
  if (clickTarget.classList.contains("section__customer--checkbox")) {
    if (deleteArr.indexOf(clickTarget.nextSibling.innerHTML) === -1) {
      deleteArr.push(clickTarget.nextSibling.innerHTML);
    } else {
      deleteArr.pop(clickTarget.nextSibling.innerHTML);
    }
  }
});

const deleteButton = document.getElementById("delete_customer_button");
deleteButton.addEventListener("click", function (e) {
  if (deleteArr.length === 0) {
    alert("삭제할 회원이 없습니다.");
  } else {
    deleteArr.forEach((element) => {
      deleteUserData(element);
    });
    window.location.reload();
  }
});
