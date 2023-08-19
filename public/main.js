// import { firebaseConfig } from '/firebase.js';
const firebaseConfig = {
  apiKey: "AIzaSyBRDdAmcnRV3_Ui_Md_vhbyp9-9-eXqzbw",
  authDomain: "javascript-picture.firebaseapp.com",
  projectId: "javascript-picture",
  storageBucket: "javascript-picture.appspot.com",
  messagingSenderId: "487659103783",
  appId: "1:487659103783:web:e98479de1137818dfa9002",
  measurementId: "G-0RSTQFT7N8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

//url query string에 있던 자료를 object로 변환
const queryString = new URLSearchParams(window.location.search);
queryString.get("id");

db.collection("member")
  .get()
  .then((결과) => {
    console.log(결과);
    결과.forEach((doc) => {
      console.log(doc.data());

      const template = `
      <label class="profile check">
      <input class="ck" name ="ck" type="checkbox" value="${doc.id}">  
        <dl class="profile__dl">
          <dt class="thumbnail" style="background-image: url(${
            doc.data().img
          })"></dt> 
          <dt class="name"> ${doc.data().name}</dt>   
          <dd> ${doc.data().team}팀/${doc.data().rank}</dd>
          <dd class="tel"> ${doc.data().ext}</dd>   
          <dd>
            <a class="btn-s more" href="/detail/detail.html?id=${doc.id}">
            상세정보 <i class="fa-solid fa-circle-plus"></i>
            </a>
          </dd>       
        </dl>    
        </label>       
      `;

      const wrap = document.querySelector(".basic-container");
      wrap.insertAdjacentHTML("beforeend", template);
    });
  })
  .then(() => {
    // intersectionObserver

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // 주시 대상이 뷰포트 안으로 들어오면 active 클래스 추가
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("active");
        }
    
      });
    });

    // 주시 대상 선언, 주시 시작
    const boxElList = document.querySelectorAll(".profile");
    boxElList.forEach((el) => {
      io.observe(el);
    });
  });
