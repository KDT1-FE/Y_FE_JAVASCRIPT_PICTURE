import { uploadImage } from "../libraries/firebase-storage";
import { fileValidation } from "./validate";
import Member from "./member";
import { createThumb } from "./thumbnail";
import { addMember } from "../libraries/firebase-firestore";
import { loadersvg } from "./loadersvg";
/**
 * 모달 창안에 폼 데이터를 추출하는 함수 입니다.
 * @param {*} element form data를 추출하고 싶은 요소를 전달합니다.
 * @returns init() function, formData
 */
function FormData(element, type = "create") {
  const form = element.querySelector("form");
  const fileUpload = element.querySelector("#fileUpload");
  const dropZone = form.querySelector("#drop_zone");
  const member = new Member();
  let file = null;
  let timer = null;

  return {
    init() {
      if (type === "create") {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          clearTimeout(timer);
          const submitBtn = form.querySelector("button[type=submit]");

          if (file === null || form.file === undefined) return;
          try {
            (async () => {
              member.fullName = form.fullName.value;
              member.category = form.category.value;
              member.gender = form.gender.value;
              member.email = form.email.value;
              member.phone = form.phone.value;
              // 파일 업로드 하기 전에 비어 있는 지 확인 합니다.
              if (!member.isNotEmpty()) {
                return;
              }
              // 로더 애니메이션 삽입!
              submitBtn.disabled = true;
              submitBtn.classList.add("cursor-not-allowed");
              submitBtn.classList.add("disabled:opacity-75");
              submitBtn.innerHTML = loadersvg + " 업로드중..";

              // 파일 업로드 시작
              const [imgUrl, fullFileName] = await uploadImage(file);
              member.fileUrl = imgUrl;
              member.fileName = fullFileName;

              // 직원을 firestore에 저장합니다.
              const mid = await addMember(member);
              if (mid) {
                submitBtn.disabled = false;
                submitBtn.classList.remove("cursor-not-allowed");
                submitBtn.classList.remove("disabled:opacity-75");
                submitBtn.innerHTML = "추가 완료";
                // 폼의 내용들을 리셋합니다.

                timer = setTimeout(() => {
                  form.reset();
                  // 모달창을 닫습니다.
                  element.close();
                }, 1000);
              }
            })();
          } catch (error) {
            console.error(error.message);
          }
        });
        fileUpload.addEventListener("change", (e) => {
          file = e.target.files[0];
          createThumb(file);
        });
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
            createThumb(file);
          }
        });
      }
      // delete mode
      if (type === "delete") {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
        });
      }
    },
  };
}
export default FormData;
