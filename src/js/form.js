import { uploadImage } from "../libraries/firebase-storage";
import { fileValidation } from "./validate";
import Member from "./member";
/**
 * 모달 창안에 폼 데이터를 추출하는 함수 입니다.
 * @param {*} element form data를 추출하고 싶은 요소를 전달합니다.
 * @returns init() function, formData
 */
function FormData(element) {
  const form = element.querySelector("form");
  const fileUpload = element.querySelector("#fileUpload");
  const dropZone = form.querySelector("#drop_zone");
  const member = new Member();
  let file = null;

  return {
    init() {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        uploadImage(file).then((imgUrl) => {
          member.fullName = form.fullName.value;
          member.email = form.email.value;
          member.phone = form.phone.value;
          member.category = form.category.value;
          member.fileUrl = imgUrl;
          member.fileName = file.name;

          console.log(member);
        });
      });
      fileUpload.addEventListener("change", (e) => {
        file = e.target.files[0];
      });
      if (dropZone) {
        dropZone.addEventListener("dragenter", function (e) {
          // console.log("dragenter");
          e.preventDefault();
          e.stopPropagation();
        });
        /* 박스 밖으로 Drag가 나갈 때 */
        dropZone.addEventListener("dragleave", function (e) {
          // console.log("dragleave");
          e.preventDefault();
          e.stopPropagation();
        });
        dropZone.addEventListener("dragover", function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
        dropZone.addEventListener("drop", function (e) {
          e.preventDefault();
          e.stopPropagation();
          // 파일이 없으면 리턴 합니다.
          if (!e.dataTransfer.items) return;
          // 첫번째 파일만 사용 합니다. (여러 파일 사용 불가)
          const item = e.dataTransfer.items[0];

          // file 이 아닐 경우 리턴 합니다.
          if (item.kind !== "file") return;
          // file 이 유효한 파일인 경우에만 file 변수에 할당합니다.
          if (fileValidation(item.getAsFile())) {
            file = item.getAsFile();
          }
        });
      }
    },
  };
}
export default FormData;
