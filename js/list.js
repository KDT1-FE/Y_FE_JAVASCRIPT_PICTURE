const list = document.querySelector(".list");
const deleteBtn = document.querySelector(".ex_delete_btn");

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

        console.log(infos[i]);
        list.append(itemEL);
    }
}

function getLocalStorage() {
    const data = localStorage.getItem("infoList");

    if(data) {
        infos = JSON.parse(data);
        console.log(infos);
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
        itemEl.classList.addd("checked");
    }

    const profileEl = document.createElement("img");
    profileEl.className="profile";
    profileEl.src = info.profileImgUrl;

    const nameEl = document.createElement("div");
    nameEl.className="name";
    nameEl.innerHTML =  info.name;
    console.log(nameEl);

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
    moreEl.className="action";
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
    itemEl.append(emailEl);
    itemEl.append(phoneNumEl);
    itemEl.append(statusEl);
    itemEl.append(moreEl);

    return itemEl;

}