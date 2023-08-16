

document.addEventListener('DOMContentLoaded', function() {
    const queryString = new URLSearchParams(window.location.search);
    const docId = queryString.get('id');
    const db = firebase.firestore();
    const storageRef = firebase.storage().ref();

    // Firestore에서 해당하는 직원의 데이터를 가져옴 input에 미리 채워져있음.
    db.collection('employee').doc(docId).get().then((result) => {
        const data = result.data();
        // HTML에 직원의 데이터를 동적으로 추가
        document.getElementById('edit_name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
        document.getElementById('position').value = data.position;
        document.getElementById('edit-image-preview').src = data.image;
    });

    // 이미지 파일 업로드 처리
    document.getElementById('photo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const imageRef = storageRef.child('images/' + file.name);
        imageRef.put(file).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
                document.getElementById('edit-image-preview').src = url;
            });
        });
    });

    //데이터 수정
    document.querySelector("#profile_edit").addEventListener('click', function() {
        const updatedImageURL = document.getElementById('edit-image-preview').src;
        db.collection('employee').doc(docId).update({
            name: document.querySelector("#edit_name").value,
            email: document.querySelector("#email").value,
            phone: document.querySelector("#phone").value,
            position: document.querySelector("#position").value,
            image: updatedImageURL
        }).then(() => {
            window.location.href = "/index.html";
        }).catch((err) => {
            console.log(err);
        });
    });

    // 데이터 삭제 처리
    document.querySelector('.button__delete--profile').addEventListener('click', function() {
        if (confirm('정말로 삭제하시겠습니까?')) {
            db.collection('employee').doc(docId).delete().then(() => {
                window.location.href = "index.html";
            }).catch((err) => {
                console.log(err);
            });
        }
    });
});

//취소버튼
document.querySelector('.button--state-cancel').addEventListener('click', function() {
    window.location.href = "index.html";
});


