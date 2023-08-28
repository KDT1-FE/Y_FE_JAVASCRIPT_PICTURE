import db from "../../shared/firebase/db.js";
import { collection, getDocs } from "firebase/firestore";

import { createCheckBox } from "../utils/createTable/createCheckBox.js";
import { createTrData } from "../utils/createTable/createTrData.js";
import { createProfileAnc } from "../utils/createTable/createProfileAnc.js";

try {
  const driversCollection = await getDocs(collection(db, "drivers"));

  if (driversCollection) {
    driversCollection.forEach(driverDoc => {
      const driversTbody = document.getElementById("drivers");
      const driverTr = document.createElement("tr");
      driverTr.classList.add("driver");
      const driverID = driverDoc.id;
      driverTr.id = `${driverID}`;

      // create CheckBox, Tabler Row, Profile Anc
      if (driverTr && driverID) {
        createCheckBox(driverTr, driverID);
        createTrData(driverTr, driverDoc);
        createProfileAnc(driverTr, driverID);
      } else throw "404 페이지로";

      driversTbody.append(driverTr);
    });
  } else throw "404 페이지로";
} catch (err) {
  console.log(err);
}
