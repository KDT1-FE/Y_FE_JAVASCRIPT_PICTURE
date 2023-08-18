import { createRouter } from "../core/Router.js"

import MainPage from "./MainPage.js";
import CreateUpdatePage from "./CreateUpdatePage.js";

export default createRouter([
  { path: '#/', component: MainPage},
  { path: '#/create', component: CreateUpdatePage},
  { path: '#/update', component: CreateUpdatePage}
])