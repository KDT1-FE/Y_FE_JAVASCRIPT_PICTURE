const usersList = [];
const firebaseConfig = {
  apiKey: "AIzaSyCRGQbFr6N75QKYWEc87ize36EV0nZDkjk",
  authDomain: "member-management-bc4f1.firebaseapp.com",
  projectId: "member-management-bc4f1",
  storageBucket: "member-management-bc4f1.appspot.com",
  messagingSenderId: "6436543004",
  appId: "1:6436543004:web:c47939788df0d5b8f99dd9",
  measurementId: "G-L4Q3J34JT6",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
db.collection("userlist")
  .orderBy("date", "desc")
  .get()
  .then((res) => {
    res.forEach((doc) => {
      const usersListBox = document.querySelector(".users-list-box");
      const { image, name, email, phone, division } = doc.data();
      let userData = document.createElement("div");
      userData.classList.add("user-list-box");
      userData.innerHTML = `
        <input type="checkbox" name="" id="" />
        <img src=${image} alt="" />
        <span>${name}</span>
        <span>${email}</span>
        <span>${phone}</span>
        <span>${division}</span>
        <div class="user-list-btn-box data-01">
            <button class="user-list-btn-edit">수정</button>
            <button class="user-list-btn-delete">삭제</button>
        </div>`;
      usersListBox.append(userData);
    });
  });
