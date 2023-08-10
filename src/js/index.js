import "../styles/index.scss";
import Modal from "./modal";
import FormData from "./form";
import {
  getMemberList,
  getMemberListMore,
} from "../libraries/firebase-firestore";
import { memberListHTML } from "./memberList";

let members = [];
let lastScrollKey = null;
// 직원 추가 모달 만들기
const { init: newUserModalInit, modal: newUserModal } = new Modal(
  "#newUserBtn",
  "#newUserModal",
);
// 직원 삭제 모달 만들기
const { init: delUserModalInit, modal: delUserModal } = new Modal(
  "#delUserBtn",
  "#delUserModal",
);
// 직원 상세보기 모달 만들기
const { init: userDetailModalInit, modal: userDetailModal } = new Modal(
  "#memberList",
  "#userDetailModal",
);
// 직원 등록 폼 만들기(이벤트 리스너 등록..)
const { init: newUserFormInit } = new FormData(newUserModal);
const { init: delUserFormInit } = new FormData(delUserModal);

newUserModalInit();
delUserModalInit();
userDetailModalInit();
newUserFormInit();
delUserFormInit();

// firestore로 부터 데이터 받아오고 리스트로 표현하기 (비동기로 즉시 실행)
(async () => {
  const { memberArr, lastKey } = await getMemberList();
  memberListHTML(memberArr);
  members = [...memberArr];
  lastScrollKey = lastKey;
  const io = new IntersectionObserver((entries) => {
    // intersectionRatio가 0일 때는 아무것도 하지 않는다.
    if (entries[0].intersectionRatio <= 0) return;
    if (lastScrollKey === "") return;
    getMemberListMore(lastScrollKey).then((data) => {
      // console.log(data);
      memberListHTML(data.memberArr);
      lastScrollKey = data.lastKey;
    });
  });

  // 맨 마지막 요소를 주시하고 있는다.
  io.observe(document.querySelector(".footer"));
})();
// 직원 상세보기 모달 클릭했을때 내용 넣기
userDetailModal.addEventListener("clickDetailModal", (event) => {
  const detail = members.find((member) => member.id === event.detail);
  const profile = userDetailModal.querySelector("#detail-profile");
  const name = userDetailModal.querySelector("#detail-name");
  const email = userDetailModal.querySelector("#detail-email");
  const phone = userDetailModal.querySelector("#detail-phone");
  const category = userDetailModal.querySelector("#detail-category");
  profile.src = detail.fileUrl;
  profile.alt = detail.fileName;
  name.innerText = detail.fullName;
  email.innerText = detail.email;
  phone.innerText = detail.phone;
  category.innerText = detail.category;
});
