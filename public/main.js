const firebaseConfig = {
    apiKey: "AIzaSyBRDdAmcnRV3_Ui_Md_vhbyp9-9-eXqzbw",
    authDomain: "javascript-picture.firebaseapp.com",
    projectId: "javascript-picture",
    storageBucket: "javascript-picture.appspot.com",
    messagingSenderId: "487659103783",
    appId: "1:487659103783:web:e98479de1137818dfa9002",
    measurementId: "G-0RSTQFT7N8"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig) 
  const db = firebase.firestore();

  db.collection('member').get().then((결과)=>{
    console.log(결과);
    결과.forEach((doc)=>{
      console.log(doc.data());
      var template = `<div class="employee">
                        <div class="thumbnail" style="background-image: url(${doc.data().이미지})"></div>
                        <div class="profile">
                          <h5 class="name"> ${doc.data().이름}</h6>
                          <p class="rank"><b>소속/직급</b>: ${doc.data().직급}</p>
                          <p class="phone"><b>연락처</b>: ${doc.data().연락처}</p>
                          <p class="email"><b>이메일</b>: ${doc.data().이메일}</p>
                          <p class="memo"><b>기타</b>: ${doc.data().기타}</p>
                        </div>
                    </div>`
      const wrap = document.querySelector('.container')
      wrap.insertAdjacentHTML('beforeend',template)

    })

  })