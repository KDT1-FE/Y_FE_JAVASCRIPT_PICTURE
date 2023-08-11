// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, addDoc, getDocs, collection, query, orderBy, limit, where, or } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
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


const sort = document.querySelector('.dropdown--sort')
const sortWrap = sort.children[0].lastElementChild
const sortArr = sortWrap.querySelectorAll('.dropdown__list')

// drop list value 값 지정
for(i=0; i<sortArr.length; i++){
    const sortLi = sortWrap.children[0].children[i]
    sortLi.value = i 
}

// 정렬창 select 된 값으로 span 값 바꾸기
function sortOption (optionEl){
    const sortBox = sort.querySelector(".dropdown__display")
    const sortEl = sortBox.firstElementChild
    sortEl.textContent = optionEl.textContent;
}

// 클릭 시 타겟 지정, 드랍다운 닫기
sortArr.forEach(sortList => {
    sortList.addEventListener("click", (e)=>{
        const targetEl = e.target.parentElement;
        const isOptionEl = targetEl.classList.contains("dropdown__list")
        if(isOptionEl) sortOption(targetEl)
        sort.classList.remove('dropdown--open');
        const searchValue = searchInput.value;
        getList(targetEl.value,searchValue)
        valueReturn(targetEl)
    })
})

// value값 input으로 보내기
function valueReturn(optionEl){
    const value = optionEl.value
    sort.children[0].children[1].value = value
}

// 검색창 포커스
const search = document.querySelector('.search__container')
const searchInput = search.firstElementChild
searchInput.onfocus = () => {
    search.classList.add('search__container--focus');
}
searchInput.onblur = () => {
    search.classList.remove('search__container--focus');
}


// 검색창 value 값 입력
let searchValue = false;
function searchFunc (){
    searchValue = searchInput.value
    let inputVal = document.querySelector('.dropdown--sort').firstElementChild.children[1].value
    console.log(inputVal)
    getList(inputVal,searchValue)
}

// 검색창 엔터 시 버튼 click
searchInput.addEventListener("keydown", (e)=>{
    if(e.key === 'Enter') {
        searchFunc()
    }
})

// 검색 버튼 click 이벤트
const searchButton = document.querySelector('.search button')
searchButton.addEventListener("click", ()=>{
    searchFunc()
})


// 임직원 관리 리스팅
const getList = async (inputVal, value) => {
    const table = document.querySelector('.table__list')
    table.innerHTML = "";
    let q;

    if (inputVal === 1) {
        q = query(collection(db, "employee"), orderBy("name")); // 이름순 정렬
        if(value) {q = query(collection(db, "employee"), where("name", "==",value));}
    } else if (inputVal === 2) {
        q = query(collection(db, "employee"), orderBy("email")); // 이메일순 정렬
        if(value) {q = query(collection(db, "employee"), where("name", "==",value));}
    } else if (inputVal === 0) {
        q = query(collection(db, "employee"), orderBy("date", "desc")); // 최신순 정렬
        if(value) {q = query(collection(db, "employee"), or(where("name", "==",value), where("email", "==",value)));}
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const employee = doc.data()
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
getList(0);

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


