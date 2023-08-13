import Home from "./Home";
import Login from "./Login";
import { createRouter } from "../core/core";

export default createRouter([
  { path: "#/login", component: Login },
  { path: "#/home", component: Home },
]);
