document.addEventListener("DOMContentLoaded", function () {
  // 현재 페이지의 URL 쿼리 문자열을 가져옵니다.
  const urlParams = new URLSearchParams(window.location.search);

  // URL 쿼리 문자열에서 클라이언트 인덱스를 추출합니다.
  const clientIndex = urlParams.get("clientIndex");

  console.log(clientIndex);

  // localStorage에서 해당 클라이언트 정보를 가져옵니다.
  const storageData = JSON.parse(
    localStorage.getItem(`user-info${parseInt(clientIndex) + 1}`)
  );

  console.log(storageData);

  // 추출한 클라이언트 정보를 페이지 내의 요소에 채워넣습니다.
  const userUrlElement = document.getElementById("user-url");
  const userMnameElement = document.getElementById("user-m_name");
  const userWnameElement = document.getElementById("user-w_name");
  const userDataElement = document.getElementById("user-data");
  const userPlaceElement = document.getElementById("user-place");
  const userNumberElement = document.getElementById("user-number");
  const userRegionElement = document.getElementById("user-region");

  console.log(userUrlElement);

  // 페이지 내의 요소에 클라이언트 정보를 설정합니다.
  if (
    userUrlElement &&
    userMnameElement &&
    userWnameElement &&
    userDataElement &&
    userPlaceElement &&
    userNumberElement &&
    userRegionElement &&
    storageData
  ) {
    userUrlElement.innerHTML = `<img class="dataImg" src="${storageData.url}">`;
    userMnameElement.textContent = storageData.m_name;
    userWnameElement.textContent = storageData.w_name;
    userDataElement.textContent = storageData.data;
    userPlaceElement.textContent = storageData.place;
    userNumberElement.textContent = storageData.number;
    userRegionElement.textContent = storageData.region;
  } else {
    console.log("값이 없음 !!!!!!");
  }
});

document.querySelector(".remove-image").addEventListener("click", remove);

function remove() {
  console.log("삭제");
  document.querySelector(".dataImg").remove();
}
