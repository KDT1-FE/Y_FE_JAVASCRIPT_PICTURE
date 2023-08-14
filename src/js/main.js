import "../styles/index.scss";
import router from "../routes";
import App from "./App";
// import Modal from "./modal";
// import { SearchForm } from "./search";
// import FormData from "./form";

const root = document.getElementById("root");
root.append(new App().el);

router();
