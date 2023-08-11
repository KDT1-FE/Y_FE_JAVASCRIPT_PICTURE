import "../styles/index.scss";
import Modal from "./modal";
import FormData from "./form";
import { SearchForm } from "./search";

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
const { init: newUserFormInit } = new FormData(newUserModal, "create");
const { init: delUserFormInit } = new FormData(delUserModal, "delete");
// 검색기능 이벤트 만들기
const { init: searchFormInit, searchForm } = new SearchForm(
  "#searchForm",
  userDetailModal,
);

newUserModalInit();
delUserModalInit();
userDetailModalInit();
newUserFormInit();
delUserFormInit();
searchFormInit();
// 첫 페이지에서 들어오자마자 한 번은 모든 직원을 검색 합니다.
// searchForm.dispatchEvent(new Event("submit"));
