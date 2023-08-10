const list = document.querySelector(".list");
const deleteBtn = document.querySelector(".ex_delete_btn");

let people_list = [];

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

function createInfo() {
    const infoEl = document.createElement("div");
    infoEl.className = "list_item";
}