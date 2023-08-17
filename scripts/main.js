import {
  headerLinkHandle,
  headerInputHandle,
  headerHamburgerHandle,
  clickMainLogoHandle,
} from "./controllers/header.controller.js";

import { createUser, viewUserPage } from "./controllers/addUser.controller.js";

import { searchByUser } from "./controllers/search.controller.js";

import { listUsers } from "./view/view-user-page.js";

// Header Events
headerLinkHandle();
headerInputHandle();
headerHamburgerHandle();
clickMainLogoHandle();

// Search Events
searchByUser();

// create User Events
createUser();
listUsers();

// view user page
viewUserPage();
