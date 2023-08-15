export function fileValidation(file) {
  const allowedImageTypes = ["image/jpeg", "image/gif", "image/png"];
  if (!allowedImageTypes.includes(file.type)) return false;
  if (file.size > 1024 * 1024 * 5) return false;
  return true;
}

export function searchFormIsEmpty(form) {
  const categorySelected = Array.from(
    form.querySelectorAll("input[name='category']:checked"),
  ).map((el) => el.value);
  const genderSelected = Array.from(
    form.querySelectorAll("input[name='gender']:checked"),
  ).map((el) => el.value);

  if (
    categorySelected.length === 0 &&
    genderSelected.length === 0 &&
    form.keywords.value === ""
  )
    return true;
  return false;
}

export function IsNameValid(value) {
  if (new RegExp(/[^가-힣\w\s]/g).test(value))
    return { result: false, msg: "이름은 영문, 한글, 숫자만 허용 됩니다." };
  if (value.length > 20) return { result: false, msg: "이름이 너무 깁니다." };
  if (value === "") return { result: false, msg: "이름은 필수 입니다." };
  return { result: true, msg: "" };
}

export function IsEmailValid(value) {
  if (
    !new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(value)
  )
    return { result: false, msg: "이메일 형식에 맞게 입력 해주세요" };
  if (value.length > 30)
    return { result: false, msg: "이메일 주소가 너무 깁니다." };
  if (value === "") return { result: false, msg: "이메일은 필수 입니다." };
  return { result: true, msg: "" };
}

export function IsPhoneValid(value) {
  if (!new RegExp(/^0[0-9]{10,11}$/).test(value))
    return {
      result: false,
      msg: "휴대전화 번호를 숫자로 입력 해주세요 ( '-' 기호 생략)",
    };
  if (value === "") return { result: false, msg: "휴대전화는 필수 입니다." };
  return { result: true, msg: "" };
}
