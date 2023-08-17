import storage from "../../storage.js";
import { ref, deleteObject } from "firebase/storage";

export default function deleteDriverImg(imgUrl) {
  const desertRef = ref(storage, imgUrl);

  // storage안 파일 삭제
  deleteObject(desertRef)
    .then(() => {
      console.log("파일 삭제 완료");
      // File deleted successfully
    })
    .catch(error => {
      // Uh-oh, an error occurred!
    });
}
