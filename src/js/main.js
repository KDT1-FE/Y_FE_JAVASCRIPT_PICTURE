import "../styles/index.scss";
import router from "../routes";
import App from "../components/App";

const root = document.getElementById("root");
root.append(new App().el);

router();

window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("my-loader");
  loader.remove("hidden");
});
