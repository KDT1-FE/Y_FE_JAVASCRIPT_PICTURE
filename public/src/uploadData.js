const fileInput = document.getElementById("fileInput");
const villagerImg = document.getElementById("villager-img");
const addButton = document.querySelector(".add-btn");

//데이터 가져오는 함수
function gatherVillageInfo(fields) {
  const values = {};

  for (const field of fields) {
    const value = document.querySelector(`.villager-info-${field}`).value;

    if (!value) {
      return null;
    }
    values[field] = value;
  }
  return values;
}

addButton.addEventListener("click", async () => {
  const fields = [
    "name",
    "engName",
    "sex",
    "birthday",
    "personality",
    "favoriteColor",
    "speechHabit",
  ];

  const values = gatherVillageInfo(fields);

  if (values === null) {
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

  //이미지 url가져오기
  const imageUrl = await imageRef.getDownloadURL();

  const db = firebase.firestore();
  //데이터 id를 최초 engName으로 설정 (engName을 사용자가 바꾼다고 해도 id값은 바뀌지 않음)
  await db.collection("villager").doc(values.engName).set({
    name: values.name,
    engName: values.engName,
    sex: values.sex,
    birthday: values.birthday,
    personality: values.personality,
    favoriteColor: values.favoriteColor,
    speechHabit: values.speechHabit,
    imageUrl,
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
