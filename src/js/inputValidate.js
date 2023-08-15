import { IsNameValid, IsEmailValid, IsPhoneValid } from "./validate";

/**
 * 폼 데이터의 값이 올바른지 확인 하는 함수 입니다.
 * @param {*} element 올바른지 확인이 필요한 form을 전달합니다.
 * @returns function
 */
function inputValidate(element) {
  const form = element.querySelector("form");
  const nameMsg = element.querySelector("#fullNameMessage");
  const emailMsg = element.querySelector("#emailMessage");
  const phoneMsg = element.querySelector("#phoneMessage");

  return () => {
    form.addEventListener("input", (event) => {
      if (["fullName", "email", "phone"].indexOf(event.target.name) < 0) return;
      const submitBtn = event.currentTarget.querySelector(
        "button[type=submit]",
      );
      const value = event.target.value;
      const errorClass = [
        "border",
        "border-red-500",
        "focus:ring-red-500",
        "focus:border-red-500",
      ];
      switch (event.target.name) {
        case "fullName":
          // 이름 유효한지 체크
          const isNameValid = IsNameValid(value);
          if (!isNameValid.result) {
            nameMsg.innerHTML = `<span class="material-icons md-18 align-middle">error</span> ${isNameValid.msg}`;
            event.target.classList.add(...errorClass);
            submitBtn.disabled = true;
          } else {
            nameMsg.innerHTML = "";
            event.target.classList.remove(...errorClass);
            submitBtn.disabled = false;
          }
          break;
        case "email":
          // 이메일 형식이 맞는지 체크
          const isEmailValid = IsEmailValid(value);
          if (!isEmailValid.result) {
            emailMsg.innerHTML = `<span class="material-icons md-18 align-middle">error</span> ${isEmailValid.msg}`;
            event.target.classList.add(...errorClass);
            submitBtn.disabled = true;
          } else {
            emailMsg.innerHTML = "";
            event.target.classList.remove(...errorClass);
            submitBtn.disabled = false;
          }
          break;
        case "phone":
          // 전화번호 형식이 맞는지 체크
          const isPhoneValid = IsPhoneValid(value);
          if (!isPhoneValid.result) {
            phoneMsg.innerHTML = `<span class="material-icons md-18 align-middle">error</span> ${isPhoneValid.msg}`;
            event.target.classList.add(...errorClass);
            submitBtn.disabled = true;
          } else {
            phoneMsg.innerHTML = "";
            event.target.classList.remove(...errorClass);
            submitBtn.disabled = false;
          }
          break;
      }
    });
  };
}

export default inputValidate;
