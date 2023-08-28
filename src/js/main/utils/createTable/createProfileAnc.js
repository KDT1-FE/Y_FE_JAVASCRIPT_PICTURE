export function createProfileAnc(driverTr, driverID) {
  const driverProfileAnc = document.createElement("a");
  driverProfileAnc.classList.add("driverProfileAnc");
  driverProfileAnc.setAttribute("href", `./profile.html?${driverID}`);
  driverProfileAnc.innerText = "프로필 →";

  const td = document.createElement("td");
  td.classList.add("driverData", "largeWidthData");

  td.append(driverProfileAnc);
  driverTr.append(td);
}
