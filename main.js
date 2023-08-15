import App from "./src/app.js";
import { app } from "./src/utils/db.js";

// id = "app" 인 div에 SPA 구현
window.addEventListener("DOMContentLoaded", e => {
  new App("#app");
});

console.log(app);
