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
      $('tbody').append(row);
    });
  });

//   document.querySelector('.button--state-add').addEventListener('click', function() {
//     const name = document.querySelector('.form-group input[type="text"]').value;
//     const email = document.querySelector('.form-group input[type="email"]').value;
//     const phone = document.querySelector('.form-group input[type="text"]').value;
//     const position = document.querySelector('.form-group input[type="text"]').value;
  
//     db.collection('employee').add({
//       name: name,
//       email: email,
//       phone: phone,
//       position: position
//     }).then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//     }).catch((error) => {
//       console.error("Error adding document: ", error);
//     });
//   }
//   )