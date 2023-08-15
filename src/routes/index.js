import { createRouter } from "../modules";
import Home from "./Home";
import Reg from "./Reg";
import Detail from "./Detail";
import NotFound from "./NotFound";

export default createRouter([
  { path: "#/", component: Home },
  { path: "#/register", component: Reg },
  { path: "#/detail", component: Detail },
  { path: ".*", component: NotFound },
]);
