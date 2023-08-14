const info_container = document.querySelector(".info_items");
const name_container = document.querySelector(".name");
const email_container = document.querySelector(".email");
const phoneNum_container = document.querySelector(".phoneNum");
const profile_container = document.querySelector(".profile_container");
const queryParams = new URLSearchParams(window.location.search);  // URL 쿼리 파라미터 읽기
const editBtn = document.querySelector(".edit_btn");
const logoBtn = document.querySelector(".logo");

const infos = JSON.parse(localStorage.getItem("infoList"));

const itemIndex = queryParams.get("index");  // URL에서 전달된 인덱스 값 읽기
const selectedItem = infos[itemIndex];  // 선택된 아이템 정보


function createInfoElement(info) {

    console.log(info);

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

    const emailEl = document.createElement("div");
    emailEl.className="email";
    emailEl.innerHTML =  info.email;

    const phoneNumEl = document.createElement("div");
    phoneNumEl.className="phoneNum";
    phoneNumEl.innerHTML =  info.phoneNumber;


    profile_container.append(profileEl);
    name_container.append(nameEl);
    email_container.append(emailEl);
    phoneNum_container.append(phoneNumEl);
    
    return ;

}
        // 디테일 페이지에 선택된 아이템 정보 표시
if (selectedItem) {
    //console.log(selectedItem);
    createInfoElement(selectedItem);
}

editBtn.addEventListener("click",()=> {
    window.location.href = `create.html?index=${itemIndex}`;
})

logoBtn.addEventListener("click",()=> {
    window.location.href = "main.html";

})


