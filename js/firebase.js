const firebaseConfig = {
    apiKey: "AIzaSyAXjktja_jwgeu_cQ9ajtG-vtP5nGHZzjo",
    authDomain: "cms-solution-86408.firebaseapp.com",
    projectId: "cms-solution-86408",
    storageBucket: "cms-solution-86408.appspot.com",
    messagingSenderId: "714447279928",
    appId: "1:714447279928:web:219c3429fc0f4c5ed213cd",
    measurementId: "G-E4Q9HYTK7N"
  };

  

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection('employee').get().then((list)=>{
    list.forEach((doc)=>{
        const employee = doc.data()
        const table = document.querySelector('.table__list')
        const trEl = document.createElement("tr");
        trEl.innerHTML = `
        <td>
            <div id="checkbox" class="checkbox">
                <input type="checkbox" id="" name="">
                <label for=""><span></span>${employee.name} 선택</label>
            </div>
        </td>
        <td>
            <div class="photo-wrap"><img src="${employee.imgUrl}" alt="${employee.name}"></div>
        </td>
        <td>
            <a class="link">${employee.name}</a>
        </td>
        <td>${employee.email}</td>
        <td class="phone">${employee.phone}</td>
        <td>${employee.grade}</td>
        `;
        table.appendChild(trEl)
    })
})

//function userAuth (){
//    try{
//        const auth = getAuth();
//        const { user } = await signInWithEmailAndPassword(auth, email, password);
//        const { stsTokenManager, uid } = user;
//    }
//}


