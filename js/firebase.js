// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, addDoc, getDocs, collection, query, orderBy, limit, where } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXjktja_jwgeu_cQ9ajtG-vtP5nGHZzjo",
  authDomain: "cms-solution-86408.firebaseapp.com",
  projectId: "cms-solution-86408",
  storageBucket: "cms-solution-86408.appspot.com",
  messagingSenderId: "714447279928",
  appId: "1:714447279928:web:219c3429fc0f4c5ed213cd",
  measurementId: "G-E4Q9HYTK7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let storage = getStorage(app);
let db = getFirestore(app);

// try {
//     const docRef = await addDoc(collection(db, "employee"), {
//         /* users라는 객체에 아래 데이터가 담기게 된다 */
//         date: "Ada",
//         last: "Lovelace",
//         born: 1815
//     });
//     console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//     console.error("Error adding document: ", e);
// }

let inputVal = document.querySelector('.dropdown__container input');

const getList = async () => {
    let q;
    if (inputVal.value === 1) q = query(collection(db, "employee"), orderBy("name", "desc")); // 이름순 정렬
    else if (inputVal.value === 2) q = query(collection(db, "employee"), orderBy("email", "desc")); // 이메일순 정렬
    else q = query(collection(db, "employee"), orderBy("date", "desc")); // 최신순 정렬

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const employee = doc.data()
        const table = document.querySelector('.table__list')
        const trEl = document.createElement("tr");
        // const date = employee.date.toDate();
        trEl.innerHTML = `
            <td>
                <div id="checkbox" class="checkbox">
                    <input type="checkbox">
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
    });
}
getList();
inputVal.addEventListener("change", getList);

// 체크박스 input 대체
const table = document.querySelector(".table")
const checkbox = table.querySelectorAll(".checkbox")

checkbox.forEach(selectCheck => {
    selectCheck.addEventListener("click",(e)=>{
        const target = e.target
        const inputCheck = target.parentElement.parentElement.firstElementChild
            target.classList.toggle("true")
            console.log(inputCheck.checked)
            inputCheck.checked = target.classList;
            selectAll(inputCheck)    
    })
})

function selectAll(selectAll)  {
    if (selectAll.value === "all") {
        checkbox.forEach(check => {
            const inputCheck = check.firstElementChild
            
            const checkAll = selectAll.checked
            inputCheck.checked = checkAll;
        })
    }
}



//function userAuth (){
//    try{
//        const auth = getAuth();
//        const { user } = await signInWithEmailAndPassword(auth, email, password);
//        const { stsTokenManager, uid } = user;
//    }
//}


