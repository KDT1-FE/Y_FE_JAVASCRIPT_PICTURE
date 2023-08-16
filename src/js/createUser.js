import { uploadImage } from "../libraries/firebase-storage";
import { fileValidation } from "./validate";
import Member from "./member";
import { createThumb } from "./thumbnail";
import { addMember, updateMember } from "../libraries/firebase-firestore";
import { loadersvg } from "./loadersvg";
import memberStore from "../store/memberlist";
/**
 * 모달 창안에 폼 데이터를 추출하는 함수 입니다.
 * @param {*} element form data를 추출하고 싶은 요소를 전달합니다.
 * @returns init() function, formData
 */
function createUser(element) {
  const form = element.querySelector("#create-contents form");
  const fileUpload = element.querySelector("#fileUpload");
  const dropZone = element.querySelector("#drop_zone");
  const member = new Member();
  let timer = null;

  return (mode) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearTimeout(timer);
      const submitBtn = form.querySelector("button[type=submit]");

      // 로더 애니메이션 삽입!
      submitBtn.disabled = true;
      submitBtn.innerHTML = loadersvg + " 업로드중..";

      try {
        if (mode === "create") {
          // 멤버 추가 모드
          if (memberStore.state.file === undefined) return;
          member.fullName = form.fullName.value;
          member.category = form.category.value;
          member.gender = form.gender.value;
          member.email = form.email.value;
          member.phone = form.phone.value;
          // 파일 업로드 하기 전에 비어 있는 지 확인 합니다.
          if (!member.isNotEmpty()) return;
          // 파일 업로드 시작
          const [imgUrl, fullFileName] = await uploadImage(
            memberStore.state.file,
          );
          member.fileUrl = imgUrl;
          member.fileName = fullFileName;

          // 직원을 firestore에 저장합니다.
          await addMember(member);

          // 폼의 내용들을 리셋합니다.
          const thumbContainer = element.querySelector("#img-thumb");
          thumbContainer.querySelector("img").remove();
          thumbContainer.querySelector(".layer").classList.add("hidden");
          thumbContainer.classList.remove("aspect-square");
          memberStore.state.file = undefined;
          timer = setTimeout(() => {
            form.reset();
          }, 200);
        } else {
          // 멤버 수정 모드
          const updateData = {};
          if (form.fullName.value) updateData.fullName = form.fullName.value;
          if (form.category.value) updateData.category = form.category.value;
          if (form.gender.value) updateData.gender = form.gender.value;
          if (form.email.value) updateData.email = form.email.value;
          if (form.phone.value) updateData.phone = form.phone.value;
          // 파일이 변경되었으면 업로드
          if (memberStore.state.file !== undefined) {
            const [imgUrl, fullFileName] = await uploadImage(
              memberStore.state.file,
            );
            updateData.fileUrl = imgUrl;
            updateData.fileName = fullFileName;
          }
          // 직원을 firestore에 업데이트 합니다.
          await updateMember(history.state.id, updateData);
          timer = setTimeout(() => {
            location.href = "#/";
          }, 200);
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = "추가 완료";
      } catch (error) {
        console.error(error.message);
        submitBtn.innerHTML = "에러 발생";
      } finally {
        memberStore.state.file = undefined;
      }
    });
    fileUpload.addEventListener("change", (e) => {
      memberStore.state.file = e.target.files[0];
      createThumb(memberStore.state.file, mode);
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
      dropZone.classList.remove("drop-zone--enter");
      dropZone.classList.remove("border-blue-500");
      dropZone.classList.add("border-gray-200");
    });
    dropZone.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add("drop-zone--enter");
      dropZone.classList.remove("border-gray-200");
      dropZone.classList.add("border-blue-500");
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
        memberStore.state.file = item.getAsFile();
        createThumb(memberStore.state.file, mode);
      }
    });
  };
}

export default createUser;
