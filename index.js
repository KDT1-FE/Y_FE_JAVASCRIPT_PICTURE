import { readUserData, deleteUserData } from "./firebase.js";

readUserData();
let deleteArr = [];
document.addEventListener("click", function (e) {
  console.log(e.target);
  console.log(e.currentTarget);
  const clickTarget = e.target;
  console.log(clickTarget.classList);
  if (clickTarget.classList.contains("section__customer--checkbox")) {
    if (deleteArr.indexOf(clickTarget.nextSibling.innerHTML) === -1) {
      deleteArr.push(clickTarget.nextSibling.innerHTML);
      console.log(deleteArr);
    } else {
      deleteArr.pop(clickTarget.nextSibling.innerHTML);
      console.log(deleteArr);
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
