import App from "../src/App";
import router from "./routes/index";

const root = document.querySelector("#root");
root.append(new App().el);

router();
