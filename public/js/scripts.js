window.addEventListener("DOMContentLoaded", (event) => {
  const dateBox = document.querySelector(".date-box");
  if (dateBox) {
    const currentDate = new Date();
    // 날짜 YYYY-MM-DD
    const formattedDate = currentDate.toISOString().slice(0, 10);
    dateBox.querySelector(".date").textContent = formattedDate;
    // 시간 HH:MM
    const formattedTime = currentDate.toTimeString().slice(0, 5);
    dateBox.querySelector(".time").textContent = formattedTime;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navMainItems = document.querySelectorAll(".nav__main > li > .nav__main__text");
  const navSubItems = document.querySelectorAll(".nav__sub > li");

  navMainItems.forEach((item) => {
    item.addEventListener("click", function () {
      navMainItems.forEach((li) => li.parentElement.classList.remove("nav__main--active"));
      navSubItems.forEach((li) => li.classList.remove("nav__sub--active"));

      const parentLi = this.parentElement;
      parentLi.classList.add("nav__main--active");

      // nav__sub가 있을 경우 첫 번째 항목에 active 클래스 추가
      const firstSubItem = parentLi.querySelector(".nav__sub > li");
      if (firstSubItem) {
        firstSubItem.classList.add("nav__sub--active");
      }
    });
  });

  navSubItems.forEach((item) => {
    item.addEventListener("click", function () {
      navSubItems.forEach((li) => li.classList.remove("nav__sub--active"));
      navMainItems.forEach((li) => li.parentElement.classList.remove("nav__main--active"));
      this.classList.add("nav__sub--active");
      this.closest(".nav__main > li").classList.add("nav__main--active");
    });
  });
});

document.querySelector(".logo").addEventListener("click", function () {
  window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const aside = document.querySelector("aside");
  const asideOpner = document.querySelector(".icon__menu");
  const asideCloser = document.querySelector(".aside-closer");

  asideOpner.addEventListener("click", function () {
    console.log("click");
    aside.style.left = "0%";
  });

  asideCloser.addEventListener("click", function () {
    aside.style.left = "-100%";
  });

  document.body.addEventListener("click", function (event) {
    if (!aside.contains(event.target) && event.target !== asideOpner) {
      aside.style.left = "-100%";
    }
  });
});
