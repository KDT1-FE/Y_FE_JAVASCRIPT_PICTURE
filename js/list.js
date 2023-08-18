import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getStorage, ref, deleteObject} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';


const firebaseConfig = {
    apiKey: "AIzaSyBO_nQ-frTFItkeS6UlWGnYjxuxsFgxwSU",
    authDomain: "kdt0-js-project.firebaseapp.com",
    projectId: "kdt0-js-project",
    storageBucket: "kdt0-js-project.appspot.com",
    messagingSenderId: "623556572356",
    appId: "1:623556572356:web:284b641a1703fc9e6ec591",
    measurementId: "G-CXEL9J682Z"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const list = document.querySelector(".list");
const deleteBtn = document.querySelector(".ex_delete_btn");
const dialog = document.querySelector("#dialog");
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const plusBtn = document.querySelector("#plus_btn");
const searchBtn = document.querySelector(".search_icon");
const searchInput = document.querySelector(".search_input");
let infos = [];

class Info {
    constructor(isChecked, profileImgUrl, name, email, phoneNumber, isActive) {
        this.isChecked = isChecked;
        this.profileImgUrl = profileImgUrl;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isActive = isActive;
    }
}

displayUsers();


function displayUsers() {
    getLocalStorage();
    for(let i=0; i<infos.length; i++) {
        const itemEL = createInfoElement(infos[i]);

        //console.log(infos[i]);
        list.prepend(itemEL);
    }
}

function getLocalStorage() {
    const data = localStorage.getItem("infoList");

    if(data) {
        infos = JSON.parse(data);
        //console.log(infos);
    }
}

function createInfoElement(info) {
    const itemEl = document.createElement("div");
    itemEl.className = "list_item";
    

    const checkboxEl = document.createElement("input");
    checkboxEl.type = 'checkbox';
    checkboxEl.id = "check_btn";
    checkboxEl.checked = info.isChecked;

    if(info.isChecked) {
        itemEl.classList.add("checked");
    }

    const profileEl = document.createElement("img");
    profileEl.className="profile";

    if(info.profileImgUrl !== " ") {
        profileEl.src = info.profileImgUrl;
    }
    else {
        profileEl.src = "assets/user.png";
    }
    

    const nameEl = document.createElement("div");
    nameEl.className="name";
    nameEl.innerHTML =  info.name;
    //console.log(nameEl);

    const emailEl = document.createElement("div");
    emailEl.className="email";
    emailEl.innerHTML =  info.email;

    const phoneNumEl = document.createElement("div");
    phoneNumEl.className="phoneNum";
    phoneNumEl.innerHTML =  info.phoneNumber;

    const statusEl = document.createElement("div");
    statusEl.className="status";

    const spanEl = document.createElement("span");
    const pEl = document.createElement("p");
    if(info.isActive) {
        spanEl.classList.remove("inactive");
        pEl.innerHTML = "active";

    }
    else {
        spanEl.classList.add("inactive");
        pEl.innerHTML = "inactive";

    }
    const moreEl = document.createElement("div");
    moreEl.className="more_btn";
    const iconEl = document.createElement("div");
    iconEl.className="icon";
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    iconEl.append(span1);
    iconEl.append(span2);
    iconEl.append(span3);

    moreEl.append(iconEl);



    statusEl.append(spanEl);
    statusEl.append(pEl);

    itemEl.append(checkboxEl);
    itemEl.append(profileEl);
    itemEl.append(nameEl);
    itemEl.append(statusEl);
    itemEl.append(emailEl);
    itemEl.append(phoneNumEl);
    
    itemEl.append(moreEl);

    return itemEl;

}

list.addEventListener("click", (event) => {
    const itemEl = event.target.closest(".list_item");
    console.log(itemEl);
    if (itemEl) {
        // 체크박스가 클릭되었을 때는 event.target이 checkbox이므로 클릭 이벤트를 무시
        if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
            return;
        }

        const itemIndex = list.children.length - Array.from(list.children).indexOf(itemEl) - 2;
        if (itemIndex >= 0) {
            showDetail(itemIndex);
            console.log("clicked!");
        }

    }
});

function showDetail(index) {
    window.location.href = `detail.html?index=${index}`;
}

const totalcheckBox = document.querySelector(".ex_select_all_btn");

totalcheckBox.addEventListener("click", () => {
    const checkBoxes = document.querySelectorAll("#check_btn");
    
    checkBoxes.forEach(checkbox => {
        checkbox.checked = !checkbox.checked; // Toggle the checked state
    });

    // Toggle the class name
    totalcheckBox.classList.toggle("ex_selected_all_btn_clicked");
});
;



function getIndexFromEvent(event) {
    const itemEl = event.target.closest(".list_item");
    if (itemEl) {
        const index = list.children.length - Array.from(list.children).indexOf(itemEl) - 2;
        return index >= 0 ? index : null;
    }
    return null;
}


deleteBtn.addEventListener("click", () => {
    dialog.showModal();
 
});
yesBtn.addEventListener("click",(e)=> {
    dialog.close();
    checkboxItemdelete();
})
noBtn.addEventListener("click",(e)=> {
    dialog.close();
})


function checkboxItemdelete() {
    const checkBoxes = document.querySelectorAll("#check_btn");
    const itemsToDelete = [];

    checkBoxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            itemsToDelete.push(infos.length - index - 1);
        }
    });

    
    itemsToDelete.forEach(index => {
        deleteItem(index);
    });

    // 체크박스 초기화
    totalcheckBox.checked = false;
}

function deleteItem(index) {
    if (index >= 0 && index < infos.length) {
        const imagePath = infos[index].profileImgUrl;
        
        // 이미지를 먼저 Firebase Storage에서 삭제
        deleteImageFromStorage(imagePath);
        infos.splice(index, 1);
        updateLocalStorage();
        updateList();
    }
}

function deleteImageFromStorage(filePath) {
    const storageRef = ref(storage, filePath);
    
    deleteObject(storageRef)
        .then(() => {
            console.log("이미지가 성공적으로 삭제되었습니다.");
        })
        .catch((error) => {
            console.error("이미지 삭제 중 오류 발생:", error);
        });
}



function updateLocalStorage() {
    localStorage.setItem("infoList", JSON.stringify(infos));
}

function updateList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
        if (list.firstChild === plusBtn) {
            plusBtn.remove(); 
        }
    }
    displayUsers(); // 변경된 정보로 리스트 업데이트
    if (!list.contains(plusBtn)) {
        list.appendChild(plusBtn);
    }
}

searchBtn.addEventListener("click", () => {
    const searchText = searchInput.value.toLowerCase().trim(); // 검색어를 소문자로 변환하여 공백 제거

    // 검색어가 비어있으면 모든 아이템 표시
    if (!searchText) {
        showAllItems();
        return;
    }

    // 검색어를 포함하는 아이템 필터링
    filteredItems(searchText);

    searchInput.value = "";
});

function showAllItems() {
    const itemEls = list.querySelectorAll(".list_item");
    itemEls.forEach(itemEl => {
        itemEl.style.display = "block"; // 모든 아이템 표시
    });
}

function filteredItems(searchText) {
    const itemEls = list.querySelectorAll(".list_item");
    itemEls.forEach(itemEl => {
        const nameEl = itemEl.querySelector(".name");
        const name = nameEl.textContent.toLowerCase();
        if (name.includes(searchText)) {
            itemEl.style.display = "block"; // 검색어가 포함되면 보이기
        } else {
            itemEl.style.display = "none"; // 검색어가 포함되지 않으면 숨기기
        }
    });
}

