// 연락처 하이픈 삽입 함수
const hypenTel = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};
const message = document.querySelector(".message");
const image = document.querySelector(".image");

//DropFile
function DropFile(dropAreaId) {
  let dropArea = document.getElementById(dropAreaId);

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(e) {
    preventDefaults(e);
    dropArea.classList.add("highlight");
  }

  function unhighlight(e) {
    preventDefaults(e);
    dropArea.classList.remove("highlight");
  }

  function handleDrop(e) {
    unhighlight(e);
    let date = e.dataTransfer; //드래그 앤 드롭 관련 정보 date 할당
    let files = date.files; // 드래그 앤 드롭으로 전송된 파일의 목록

    handleFiles(files);
  }

  //파일 데이터를 배열에 담기
  function handleFiles(files) {
    files = [...files];
    files.forEach(previewFile);
    // firebaseImgUpload(files); //파이어베이스 업로드
  }

  function previewFile(file) {
    console.log(file);
    renderFile(file);
  }

  // 이미지 미리보기 수행 & 이미지 숨기기
  function renderFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file); //파일을 Data URL 형태로 읽기
    reader.onloadend = function () {
      let img = document.getElementById("preview"); //미리보기할 이미지 클래스
      console.log(img + "preview 주소");
      if (img) {
        img.src = reader.result; // reader.result는 파일을 Data URL 형식으로 읽어온 결과
        img.style.display = "block"; //img block 변경
        // message.style.display = "none";
        // image.style.display = "none";
      } else {
        console.log("미리보기 이미지 요소를 찾을 수 없습니다.");
      }
    };
  }

  // 사진 하이라이팅
  dropArea.addEventListener("dragenter", highlight, true); //드래그한 아이템이 드롭 영역으로 들어갈 때
  dropArea.addEventListener("dragover", highlight, true); //드래그한 아이템이 드롭 영역 위에 위치 할 때
  dropArea.addEventListener("dragleave", unhighlight, false); // 드래그한 아이템이 드롭 영역을 벗어날 때
  dropArea.addEventListener("drop", handleDrop, false); //드래그한 아이템이 드롭 영역에서 드롭되었을 때

  return {
    handleFiles,
  };
}

const dropFile = new DropFile("drop-file");
