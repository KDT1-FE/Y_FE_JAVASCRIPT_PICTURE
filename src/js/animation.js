const animation = document.querySelector(".animation");
const main = document.querySelector(".main");

main.style.display = "none";

setTimeout(() => {
  animation.remove();
  document.querySelector("body").style.background = "none";
  main.style.display = "block";
}, 1500);
