const nameInput = document.querySelector(".name_input");
const emailInput = document.querySelector(".email_input");
const phoneNumberInput = document.querySelector(".phoneNum_input");
const submitBtn = document.querySelector(".submit_btn");

class Info {
    constructor(isChecked,profileImg, name, email, phoneNumber, isActive) {
        this.isChecked = isChecked;
        this.profileImg = profileImg;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isActive = isActive;
    }
}



function submitBtnClick() {

    let name = nameInput.value;
    let email = emailInput.value;
    let phoneNumber = phoneNumberInput.value;

    console.log(name, email, phoneNumber);

    if (name && email && phoneNumber) {
        // Create an instance of Info class
        const infoInstance = new Info(false, "", name, email, phoneNumber, true);
        console.log(infoInstance);
    } else {
        alert("값을 입력해주세요");
    }


    

}

submitBtn.addEventListener("click",submitBtnClick);



