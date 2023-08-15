//파이어베이스 초기화
const firebaseConfig = {
  apiKey: "AIzaSyBR1m3u3HD0SUquyD5uvNFNzyWEwczphDo",
  authDomain: "animal-crossing-project.firebaseapp.com",
  projectId: "animal-crossing-project",
  storageBucket: "animal-crossing-project.appspot.com",
  messagingSenderId: "242406919285",
  appId: "1:242406919285:web:ac497cd3bdee770eecfc3c",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// 삭제 함수 정의
function deleteProduct(docId) {
  const confirmDelete = confirm("정말 삭제하시겠습니까?");
  if (confirmDelete) {
    db.collection("product")
      .doc(docId)
      .delete()
      .then(() => {
        window.location.href = "/animal.html";
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
  } else {
    console.log("삭제가 취소되었습니다.");
  }
}

// 등록한 주민 목록
db.collection("product")
  .get()
  .then((결과) => {
    결과.forEach((doc) => {
      console.log(doc);
      const 템플릿 = `
                  <div class="product">
                    <div class="product__image">
                      <div class="img" style="background-image: url(${
                        doc.data().이미지
                      })"></div>
                    </div>
                    <div class="product__info">
                      <div class="title">
                        <div class="name">${doc.data().이름}</div>
                        <div class="birthday">${doc.data().생일}</div>
                      </div>
                      <div class="kind">종족 |  ${doc.data().종족}</div>
                      <div class="personality">성격 |  ${doc.data().성격}</div>
                      <div class="description">정보 |  ${doc.data().정보}</div>
                    </div>
                    <div class="animal-crud">
                      <div class="animal-edit">edit</div>
                      <div id="delete" class="animal-delete" data-doc-id="${
                        doc.id
                      }" onclick="button_event();">delete</div>
                    </div>
                  </div>
                  `;
      $(".container").append(템플릿);

      //       템플릿.addEventListener("click", () => {});
      //     });
      //   });
    });

    // 삭제 버튼에 이벤트 리스너 설정
    $(".animal-delete").on("click", function () {
      const docId = $(this).data("doc-id");
      deleteProduct(docId);
    });
  });

// 편집 버튼 클릭 이벤트 핸들러
$(document).on("click", ".animal-edit", function () {
  const productEl = $(this).closest(".product");
  const docId = productEl.find(".animal-delete").data("doc-id");
  $("#save-edit").attr("data-doc-id", docId);
  console.log("docId:", docId);

  const editForm = $(".edit-form");
  const editName = editForm.find("#edit-name");
  const editBirthday = editForm.find("#edit-birthday");
  const editKind = editForm.find("#edit-kind");
  const editPersonality = editForm.find("#edit-personality");
  const editDescription = editForm.find("#edit-description");

  const productInfo = productEl.find(".product__info");
  const name = productInfo.find(".name").text();
  const birthday = productInfo.find(".birthday").text();
  const kind = productInfo.find(".kind").text().split(" | ")[1]; // "종족 | " 부분 제거
  const personality = productInfo.find(".personality").text().split(" | ")[1]; // "성격 | " 부분 제거
  const description = productInfo.find(".description").text().split(" | ")[1]; // "정보 | " 부분 제거

  // 편집 폼에 기존 정보 채우기
  editName.val(name);
  editBirthday.val(birthday);
  editKind.val(kind);
  editPersonality.val(personality);
  editDescription.val(description);

  // 편집 폼 보이기
  editForm.show();
});

// 저장 버튼 클릭 이벤트 핸들러
$("#save-edit").on("click", async function () {
  const docId = $(this).attr("data-doc-id");

  if (docId) {
    const editedData = {
      이름: $("#edit-name").val(),
      생일: $("#edit-birthday").val(),
      종족: $("#edit-kind").val(),
      성격: $("#edit-personality").val(),
      정보: $("#edit-description").val(),
    };

    // 이미지 업로드 처리
    const imageInput = $("#edit-image")[0]; // 이미지 input 엘리먼트
    const imageFile = imageInput.files[0];

    if (imageFile) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${docId}/${imageFile.name}`);

      try {
        await imageRef.put(imageFile);
        const imageUrl = await imageRef.getDownloadURL();
        editedData.이미지 = imageUrl;

        // 이미지 업로드가 완료되면 이미지 뷰 업데이트
        const productEl = $(
          `.product .animal-delete[data-doc-id="${docId}"]`
        ).closest(".product");
        const productImage = productEl.find(".img");
        productImage.css("background-image", `url(${imageUrl})`);
      } catch (error) {
        console.error("이미지 업로드 중 오류가 발생했습니다.", error);
        return;
      }
    }

    try {
      await db.collection("product").doc(docId).update(editedData);
      console.log("주민 정보가 수정되었습니다.");
      $(".edit-form").hide();

      // 해당 주민 정보 업데이트하기
      const productEl = $(
        `.product .animal-delete[data-doc-id="${docId}"]`
      ).closest(".product");
      const productInfo = productEl.find(".product__info");
      productInfo.find(".name").text(`${editedData.이름}`);
      productInfo.find(".birthday").text(`${editedData.생일}`);
      productInfo.find(".kind").text(`종족 | ${editedData.종족}`);
      productInfo.find(".personality").text(`성격 | ${editedData.성격}`);
      productInfo.find(".description").text(`정보 | ${editedData.정보}`);
    } catch (error) {
      console.error("주민 정보 수정 중 오류가 발생했습니다.", error);
    }
  } else {
    console.error("유효하지 않은 문서 ID입니다.");
  }
});

// x 클릭시 exit
const exitBtn = document.querySelector(".edit-form__top-exit");
exitBtn.addEventListener("click", function () {
  const editForm = $(".edit-form");
  editForm.hide(); // 또는 .style.display = "none";
});

//클릭시 상단으로 이동
const toTopEl = document.querySelector("#to-top");

toTopEl.addEventListener("click", function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

// 이미지 미리보기
function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById("preview").src = "";
  }
}
