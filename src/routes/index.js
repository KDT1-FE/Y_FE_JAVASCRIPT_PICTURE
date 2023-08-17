import { createRouter } from "../core/core";
import Detail from "./Detail";
import Edit from "./Edit";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";

export default createRouter([
  { path: "#/login", component: Login },
  { path: "#/home", component: Home },
  { path: "#/registration", component: Registration },
  { path: "#/detail", component: Detail },
  { path: "#/edit", component: Edit },
]);
