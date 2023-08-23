// 보험자 리스트 페이지에서
// driverProfile Anchor tr 요소를 creat하는 Component
export default function createDriverProfileAnc(driverID, driverTr) {
  const driverProfileAnc = document.createElement("a");
  driverProfileAnc.classList.add("driverProfileAnc");
  driverProfileAnc.setAttribute("href", `./driverProfile.html?${driverID}`);
  driverProfileAnc.innerText = "프로필 →";

  const td = document.createElement("td");
  td.classList.add("driverData", "largeWidthData");

  td.append(driverProfileAnc);
  driverTr.append(td);
}
