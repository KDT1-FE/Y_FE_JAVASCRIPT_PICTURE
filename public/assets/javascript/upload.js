// 임직원 등록 버튼 클릭 이벤트 처리
document.getElementById("modal_register").addEventListener("click", function () {
    var name = document.getElementById("name_ID").value;
    var email = document.getElementById("email_ID").value;
    var phone = document.getElementById("phone_ID").value;
    var rank = document.getElementById("rank_ID").value;

    // 이미지 파일 선택
    var fileInput = document.getElementById("file_input");
    var imageFile = fileInput.files[0];

    // Firebase Storage 참조
    var storageRef = firebase.storage().ref();
    var imageRef = storageRef.child("images/" + imageFile.name);

    // 이미지 업로드
    imageRef.put(imageFile).then(function (snapshot) {
      console.log("Uploaded a blob or file!");

      // 이미지 다운로드 URL 가져오기
      imageRef.getDownloadURL().then(function (imageUrl) {
        // Firestore에 데이터 추가
        db.collection("employees")
          .add({
            name: name,
            email: email,
            phone: phone,
            rank: rank,
            imageUrl: imageUrl,
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      });
    });
  });
