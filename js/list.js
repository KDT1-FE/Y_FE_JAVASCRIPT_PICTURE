const list = document.querySelector(".list");
const createBtn = document.querySelector(".ex_create_btn");
const deleteBtn = document.querySelector(".ex_delete_btn");

let people_list = [];

class Info {
    constructor(isChecked,profileImg, name, email, phoneNumber, isActive) {
        this.isChecked = isChecked;
        this.profileImg = profileImg;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isActive = this.isActive;
    }
}

function createInfo() {
    const infoEl = document.createElement("div");
    infoEl.className = "list_item";
}