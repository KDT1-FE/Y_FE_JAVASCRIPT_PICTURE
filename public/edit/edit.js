const employeeName = document.getElementById("name");
const ext = document.getElementById("tel");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const team = document.getElementById("team");
const rank = document.getElementById("rank");
const memo = document.getElementById("memo");
const deleteImg = document.getElementById("image-delete");
const previewImg = document.getElementById("preview-image");
const editBtn = document.querySelector(".edit-btn");

db.collection("member")
  .doc(queryString.get("id"))
  .get()
  .then((result) => {
    console.log(result.data());
    console.log("수정 전 이미지url::::" + result.data().img);
    employeeName.value = result.data().name;
    ext.value = result.data().ext;
    phone.value = result.data().phone;
    email.value = result.data().email;
    team.value = result.data().team;
    rank.value = result.data().rank;
    memo.value = result.data().memo;
    deleteImg.value = result.data().img;
    previewImg.src = result.data().img;

    // 수정버튼 클릭 시
    editBtn.addEventListener("click", function () {
      const editImg = document.querySelector("#image").files[0];
      const imgName = document.querySelector("#image").files.name;
      const storageRef = storage.ref();
      const editImgPath = storageRef.child("image/" + randomNum + imgName);
      const updateImg = editImgPath.put(editImg);

      updateImg.on(
        "state_changed",
        null,
        (err) => {
          console.log(err);
        },
        () => {
          updateImg.snapshot.ref.getDownloadURL().then((editUrl) => {
            console.log("수정된 경로는", editUrl);

            const editDB = {
              name: employeeName.value,
              ext: ext.value,
              phone: phone.value,
              email: email.value,
              team: team.value,
              rank: rank.value,
              memo: memo.value,
              img: editUrl,
            };

            if (previewImg.src === result.data().img) {
              editDB["img"] = result.data().img;
            }

            db.collection("member")
              .doc(queryString.get("id"))
              .update(editDB)
              .then(() => {
                alert(editDB.name + "님의 직원 정보가 수정되었습니다:)");
                window.location.href =
                  "/detail/detail.html?id=" + queryString.get("id");
              });
          });
        }
      );
    });
  });

//이미지만 삭제
document
  .getElementById("file-delete-btn")
  .addEventListener("click", function (e) {
    var deleteFilename = document.getElementById("image-delete").value;
    var deleteRef = storage.refFromURL(deleteFilename);
    // console.log(deleteRef)

    deleteRef
      .delete()
      .then(function () {
        alert("이미지가 삭제되었습니다!");
        window.location.reload();
      })
      .catch(function (error) {
        console.error("Error removing file.", error);
      });
  });
