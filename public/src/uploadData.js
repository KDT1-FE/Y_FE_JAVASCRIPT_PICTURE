const fileInput = document.getElementById("fileInput");
const villagerImg = document.getElementById("villager-img");
const addButton = document.querySelector(".add-btn");

addButton.addEventListener("click", async () => {
  const name = document.querySelector(".villager-info-name").value;
  const engName = document.querySelector(".villager-info-engName").value;
  const sex = document.querySelector(".villager-info-sex").value;
  const birthday = document.querySelector(".villager-info-birthday").value;
  const personality = document.querySelector(
    ".villager-info-personality"
  ).value;
  const favoriteColor = document.querySelector(
    ".villager-info-favoriteColor"
  ).value;
  const speechHabit = document.querySelector(
    ".villager-info-speechHabit"
  ).value;

  if (
    !name ||
    !engName ||
    !sex ||
    !birthday ||
    !personality ||
    !favoriteColor ||
    !speechHabit
  ) {
    alert("모든 정보를 입력해주세요!");
    return;
  }

  const selectedFile = fileInput.files[0];

  if (!selectedFile) {
    alert("이미지를 선택해주세요!");
    return;
  }

  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`${selectedFile.name}`);
  await imageRef.put(selectedFile);

  const db = firebase.firestore();
  //데이터 id를 engName으로 설정
  await db.collection("villager").doc(engName).set({
    name,
    engName,
    sex,
    birthday,
    personality,
    favoriteColor,
    speechHabit,
  });

  alert("주민이 등록되었습니다! 메인 화면으로 이동합니다");
  window.location.href = "/";
});

fileInput.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = (e) => {
      villagerImg.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
  }
});
