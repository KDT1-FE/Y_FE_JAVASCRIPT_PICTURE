// firebase 초기화
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
const storage = firebase.storage();

$("#send").click(function () {
  // 이미지 저장
  const file = document.querySelector("#image").files[0];
  const storageRef = storage.ref();
  const 저장할경로 = storageRef.child("image/" + file.name);
  const 업로드작업 = 저장할경로.put(file);

  업로드작업.on(
    "state_changed",
    // 변화시 동작하는 함수
    null,
    //에러시 동작하는 함수
    (error) => {
      console.error("실패사유는", error);
    },
    // 성공시 동작하는 함수
    () => {
      업로드작업.snapshot.ref.getDownloadURL().then((url) => {
        console.log("업로드된 경로는", url);
        const 저장할거 = {
          이름: $("#name").val(),
          생일: $("#birthday").val(),
          종족: $("#kind").val(),
          성격: $("#personality").val(),
          정보: $("#description").val(),
          이미지: url,
        };
        db.collection("product")
          .add(저장할거)
          .then((result) => {
            console.log(result);
            window.location.href = "/animal.html";
          })
          .catch(() => {
            console.log(err);
          });
      });
    }
  );
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
