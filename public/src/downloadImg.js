// 스토리지 서비스에 대한 참조
const storage = firebase.storage();

// 스토리지 내 특정 이미지에 대한 참조
const imageRef = storage.ref().child("apple.webp");
const imageRef1 = storage.ref().child("flurry.webp");

// 이미지의 다운로드 URL 가져오기
imageRef
  .getDownloadURL()
  .then((url) => {
    // URL을 사용하여 이미지를 표시하거나 원하는 작업 수행
    const imageElement = document.getElementById("villager-img");
    imageElement.src = url;
  })
  .catch((error) => {
    // 오류 처리
    console.error("다운로드 URL을 가져오는 중 오류 발생:", error);
  });

imageRef1
  .getDownloadURL()
  .then((url) => {
    // URL을 사용하여 이미지를 표시하거나 원하는 작업 수행
    const imageElement = document.getElementById("villager-img1");
    imageElement.src = url;
  })
  .catch((error) => {
    // 오류 처리
    console.error("다운로드 URL을 가져오는 중 오류 발생:", error);
  });
