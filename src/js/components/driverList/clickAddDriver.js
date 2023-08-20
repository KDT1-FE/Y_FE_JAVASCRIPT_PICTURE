const addDriverAnc = document.querySelector("#addDriverAnc");

addDriverAnc
  ? addDriverAnc.addEventListener("click", () => {
      addDriverAnc.setAttribute("href", "./addDriver.html");
    })
  : console.log("404 페이지로");
