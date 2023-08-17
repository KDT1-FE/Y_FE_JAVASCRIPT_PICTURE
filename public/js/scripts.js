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
