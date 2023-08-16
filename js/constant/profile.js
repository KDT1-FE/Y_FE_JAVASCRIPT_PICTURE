// 프로필 페이지 메인태그
export const main = document.getElementById("profile-main");

// 프로필 상세 컨테이너
export const profile = document.getElementsByClassName("profile")[0];
export const manageBar = document.getElementsByClassName("manage-bar")[0]; // 수정 및 삭제 버튼 컨테이너
export const openEditorBtn = document.getElementById("manage-bar__edit-btn");
export const removeBtn = document.getElementById("manage-bar__remove-btn");

// 프로필 수정 폼
export const editForm = document.getElementsByClassName("edit-form")[0];
export const previewImg = document.getElementById("preview");
export const submit = document.getElementsByClassName("edit-form__submit")[0];
export const cancel = document.getElementsByClassName("edit-form__cancel")[0];
export const edit_photo = document.getElementById("photo-input");
export const edit_name = document.getElementById("edit-name");
export const edit_email = document.getElementById("edit-email");
export const edit_phoneNum = document.getElementById("edit-phoneNum");
export const edit_position = document.getElementById("edit-position");
