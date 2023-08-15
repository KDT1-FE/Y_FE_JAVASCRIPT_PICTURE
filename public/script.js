const firebaseConfig = {
    apiKey: "AIzaSyCIwWG1nwrROZ-ZmSq47DEQ9UMJNIZQPys",
    authDomain: "employee-management-d1bad.firebaseapp.com",
    projectId: "employee-management-d1bad",
    storageBucket: "employee-management-d1bad.appspot.com",
    messagingSenderId: "386195527226",
    appId: "1:386195527226:web:948bf0058e117d7d418703"
};
  firebase.initializeApp(firebaseConfig);
  

const db = firebase.firestore();
const storage = firebase.storage();


db.collection('employee').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        var row = `
        <tr>
            <td>
                <span class="custom-checkbox">
                    <input type="checkbox" id="checkbox${doc.id}" name="options[]" value="${doc.id}">
                    <label for="checkbox${doc.id}"></label>
                </span>
            </td>
            <td><img class="img" src="${doc.data().photoURL}" alt="Employee Photo"></td>
            <td>${doc.data().name}</td>
            <td>${doc.data().email}</td>
            <td>${doc.data().phone}</td>
            <td>${doc.data().position}</td>
            <td>
                <button class="button--state-edit" data-id="${doc.id}">수정</button>
                <button class="button button--state-delete2" data-id="${doc.id}">삭제</button>
            </td>
        </tr>`;
        document.querySelector('tbody').insertAdjacentHTML('beforeend', row);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // 'send' 버튼에 이벤트 리스너 추가
    let sendButton = document.getElementById('send');
    if(sendButton) { // sendButton이 존재하면 이벤트 리스너를 추가
        sendButton.addEventListener('click', function() {
            // 'image' 엘리먼트를 찾고 파일을 가져옵니다.
            let imageInput = document.getElementById('input-file');
            if (imageInput && imageInput.files.length > 0) { // imageInput이 존재하고, 선택된 파일이 있으면 다음을 실행
                let file = imageInput.files[0];
                let storageRef = firebase.storage().ref();
                let filePath = 'image/' + file.name;
                let uploadTask = storageRef.child(filePath).put(file);

                uploadTask.on('state_changed', null, function(error) {
                    console.error('Upload failed:', error);
                }, function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                        let employeeData = {
                            name: document.getElementById('name').value,
                            phone: document.getElementById('phone').value,
                            email: document.getElementById('email').value,
                            position: document.getElementById('position').value,
                            image: url
                        };
                        firebase.firestore().collection('employee').add(employeeData).then(function(result){
                            console.log(result);
                            window.location.href = "/index.html";
                        }).catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
                    });
                });
            } else {
                console.error('No files selected or image input does not exist');
            }
        });
    } else {
        console.error('Send button does not exist');
    }
});



