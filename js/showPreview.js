import {imgFileInput} from "../index.js";

export function showPreview(){
  const selectedFile = imgFileInput.files[0];
  const file = URL.createObjectURL(selectedFile);
  document.querySelector(".preview").src = file;
}