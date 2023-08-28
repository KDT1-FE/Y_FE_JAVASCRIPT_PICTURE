import storage from "../../shared/firebase/storage.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDriverImg } from "./updateDriverImg.js";

export function createDriverImg(id, img, redirectUrl) {
  try {
    if (id && img && redirectUrl) {
      const driverImgsRef = ref(storage, `driverImgs/${img.name}`);
      const uploadTask = uploadBytesResumable(driverImgsRef, img);

      // 업로드 상황에 맞는 동작 구현
      uploadTask.on(
        "state_changed",
        snapshot => {
          const submitAlert = document.querySelector(".submitAlert");
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          submitAlert.textContent =
            "Upload is " + Math.floor(progress) + "% done";
        },
        err => {
          console.log(err);
        },
        // 업로드 완료 후
        // 원하는 Doc id에 imgUrl 데이터 등록
        () => {
          completeUpload(uploadTask, id, redirectUrl);
        }
      );
    } else throw "404 페이지로";
  } catch (err) {
    console.log(err);
  }
}

function completeUpload(uploadTask, id, redirectUrl) {
  getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
    if (downloadURL) {
      updateDriverImg(id, downloadURL);

      // 업로드 완료 후 보험자 main 페이지로 이동
      setTimeout(() => {
        location.href = redirectUrl;
      }, 1000);
    } else throw "404 페이지로???";
  });
}
