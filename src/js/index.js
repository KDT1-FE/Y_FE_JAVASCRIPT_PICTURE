import "../styles/index.scss";
import Modal from "./modal";
import FormData from "./form";

const { init: newUserModalInit, modal: newUserModal } = new Modal(
  "#newUserBtn",
  "#newUserModal",
);
const { init: delUserModalInit, modal: delUserModal } = new Modal(
  "#delUserBtn",
  "#delUserModal",
);
const { init: newUserFormInit } = new FormData(newUserModal);

newUserModalInit();
delUserModalInit();
newUserFormInit();
