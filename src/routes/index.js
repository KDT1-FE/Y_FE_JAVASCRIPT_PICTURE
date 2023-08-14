import { createRouter } from "../core";
import Home from "./Home";
import Create from "./Create";
import Detail from "./Detail";
import Update from "./Update";

export default createRouter([
  { path: "#/", component: Home },
  { path: "#/create", component: Create },
  { path: "#/detail", component: Detail },
  { path: "#/update", component: Update },
]);
