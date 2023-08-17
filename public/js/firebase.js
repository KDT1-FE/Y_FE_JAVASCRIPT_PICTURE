const firebaseConfig = {
  apiKey: "AIzaSyCWmqUxiOZLUzFRh8FfSrJOoUV07w1GuUw",
  authDomain: "admin2-b0193.firebaseapp.com",
  projectId: "admin2-b0193",
  storageBucket: "admin2-b0193.appspot.com",
  messagingSenderId: "1072988199668",
  appId: "1:1072988199668:web:8828bd6010963e9694dca1",
  measurementId: "G-X2LTK1KD4L"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection('profile').get().then((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.data())
    let profileList = `
      <div class="employee-list__content">
        <div class="list">
          <div class="picture">
            <img src="https://via.placeholder.com/100x100" alt="">
          </div>
          <div class="name">${doc.data().name}</div>
          <div class="mail">${doc.data().mail}</div>
          <div class="phone">${doc.data().phone}</div>
          <div class="group">${doc.data().group}</div>
          <div class="position">${doc.data().position}</div>
          <div class="etc">${doc.data().etc}</div>
        </div>
      </div>
    `
    document.querySelector('.employee-list').innerHTML += profileList;
  })
})

document.querySelector('.btn__save').addEventListener('click', function() {
  let saveData = {
    name: document.querySelector('.input__name').value,
    mail: document.querySelector('.input__mail').value,
    phone: Number(document.querySelector('.input__phone').value),
    group: document.querySelector('.input__group').value,
    position: document.querySelector('.input__position').value,
    etc: document.querySelector('.input__etc').value,
  }

  db.collection('profile').add(saveData).then((res) => {
    location.reload();
  }).catch((err) => {
    console.log(err);
  });
});
