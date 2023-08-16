// storage에 보험자 이미지 등록
import storage from "../../storage.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// db에 보험자 이미지 url 업데이트
import db from "../../db.js";
import { doc, updateDoc } from "firebase/firestore";

// storage에 보험자 이미지 등록 후
// db에 보험자 이미지 url 업데이트
export default function addDriverImg(id, img) {
  try {
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
      error => {
        console.log(`Can not add Data: ${err}`);
      },
      // 업로드 완료 후 firestore의 추가된 id에 imgUrl 데이터 업데이트
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          updateDriverDocImg(id, downloadURL);
        });
      }
    );
  } catch (err) {
    // 오류 처리 로직
    // console.log(`Can not add Data: ${err}`);
  }
}

// db에 보험자 이미지 url 업데이트
async function updateDriverDocImg(id, imgUrl) {
  console.log(id);
  try {
    // 보험자 등록
    await updateDoc(doc(db, "drivers", `${id}`), {
      imgUrl
    });
    // 업로드 완료 후 보험자 리스트 페이지로 이동
    location.href = "./driverList.html";
  } catch (err) {
    // 오류 처리 로직
    // console.log(`Can not add Data: ${err}`);
  }
}
