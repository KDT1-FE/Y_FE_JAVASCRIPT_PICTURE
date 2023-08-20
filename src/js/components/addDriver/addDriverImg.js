// addDriver 페이지에서
// storage에 보험자 이미지 등록
import storage from "../../firebase/storage.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// 동일한 id를 가진 firestore doc에 보험자 이미지 url 업데이트
import updateDriverImg from "./updateDriverImg";

// storage에 보험자 이미지 등록 후
// db에 보험자 이미지 url 업데이트
export default function addDriverImg(id, img, redirectUrl) {
  try {
    if (id && img && redirectUrl) {
      // 원본 storage 폴더를 가리키는 포인터 사용 (메모리 부담 감소 및 재사용 가능)
      const driverImgsRef = ref(storage, `driverImgs/${img.name}`);

      // 'driverImgs' storage에 이미지 등록
      const uploadTask = uploadBytesResumable(driverImgsRef, img);

      // 업로드 상황(progress, paused, running)에 맞는 동작 구현
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        err => {
          console.log(err);
        },
        // 업로드 완료 후
        // 동일한 id를 가진 firestore doc에 보험자 이미지 url 업데이트
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            if (downloadURL) {
              updateDriverImg(id, downloadURL);
            } else throw "404 페이지로";

            // 업로드 완료 후 보험자 리스트 페이지로 이동
            setTimeout(() => {
              location.href = redirectUrl;
            }, 1000);
          });
        }
      );
    } else throw "404 페이지로";
  } catch (err) {
    console.log(err);
  }
}
