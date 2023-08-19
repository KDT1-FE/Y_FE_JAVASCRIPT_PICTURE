export default function changeTrBackgroundColor(event) {
  const checkBox = event.target;

  if (checkBox) {
    const driverID = checkBox.className;
    const tr = document.getElementById(`${driverID}`);

    if (checkBox.checked) {
      tr.style.backgroundColor = "rgba(79, 86, 101, 0.671)";
    } else {
      tr.style.backgroundColor = "transparent";
    }
  }
}
