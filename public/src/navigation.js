const villagerElements = document.querySelectorAll(".villager");

villagerElements.forEach((villagerElement) => {
  villagerElement.addEventListener("click", () => {
    const villagerId = villagerElement.getAttribute("data-id");
    window.location.href = `profile.html?id=${villagerId}`;
  });
});
