export const viewLoading = (loading) => {
  const loadingSection = document.getElementById("loading");
  const mainSection = document.querySelector("main");

  const loadingWrap = document.createElement("div");
  const loadingEl = document.createElement("div");

  loadingWrap.classList.add("lds-circle");

  loadingWrap.append(loadingEl);
  if (loading) {
    mainSection.style.display = "none";
    loadingSection.append(loadingWrap);
  } else {
    mainSection.style.display = "block";
    loadingSection.innerHTML = "";
  }
};
