const load = document.querySelector("#load");

window.addEventListener("load", fadeOut);

function fadeOut() {
  try {
    setTimeout(() => {
      if (!load.getAttribute("class", "fadeOut")) {
        load.style.animation = "fadeOut .6s ease-in-out forwards";
      }
    }, 2000);
  } catch (error) {
    // 재접속 요청 화면
  }
}
