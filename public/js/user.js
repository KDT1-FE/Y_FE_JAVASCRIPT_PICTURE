const storedKeys = Object.keys(localStorage).filter((key) =>
  key.startsWith("user-info")
);

console.log(storedKeys.length);

//리스트
function init() {
  const userListItem = document.querySelector(".user-list-item");

  for (var i = 1; i <= storedKeys.length; i++) {
    const storageData = JSON.parse(localStorage.getItem(`user-info${i}`));
    console.log(storageData);

    const listItem = document.createElement("div");
    listItem.className = "user-list-item";
    listItem.innerHTML = `
    <hr />
    <a href="./detail_profile.html?clientIndex=${i - 1}">
      <div class="list-item">
        <input type="checkbox" />
        <img src="${storageData.url}" class="user-image">
        <div class="user-name">${storageData.m_name}</div>
        <div class="user-name">${storageData.w_name}</div>
        <div class="user-name">${storageData.data}</div>
        <div class="user-age">${storageData.place}</div>
        <div class="user-number">${storageData.number}</div>
        <div class="user-number">${storageData.region}</div>
        
      <div>
    </a> 
      `;

    userListItem.appendChild(listItem);
  }
}

init();
