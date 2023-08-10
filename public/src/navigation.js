const villagerElements = document.querySelectorAll(".villager");

villagerElements.forEach((villagerElement) => {
  villagerElement.addEventListener("click", () => {
    const villagerId = villagerElement.getAttribute("data-id");
    window.location.href = `profile.html?id=${villagerId}`;
  });
});

//동적으로 만들어지는 villager에 대해 event 만들어주기
document.querySelector(".villagers-list").addEventListener("click", (event) => {
  const villagerElement = event.target.closest(".villager");
  if (villagerElement) {
    const villagerId = villagerElement.getAttribute("data-id");
    window.location.href = `profile.html?id=${villagerId}`;
  }
});
