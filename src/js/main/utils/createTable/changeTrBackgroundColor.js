export function changeTrBackgroundColor(event) {
  try {
    const checkBox = event.target;

    if (checkBox) {
      const driverID = checkBox.className;
      const driverTrow = document.getElementById(`${driverID}`);

      if (checkBox.checked) {
        driverTrow.style.backgroundColor = "rgba(79, 86, 101, 0.671)";
      } else {
        driverTrow.style.removeProperty("background-color");
      }
    } else {
      throw "404 페이지로";
    }
  } catch (err) {
    console.log("404 페이지로");
  }
}
