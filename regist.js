// import { ref, uploadBytes } from "firebase/storage";
// import { storage } from "./firebase";

// const imageInputEl = document.getElementById("profile_pic");

// imageInputEl.addEventListener("change", (event) => {
//   const file = document.getElementById("profile_pic").files[0];
//   const storageRef = ref(storage, "images/mountains.jpg");
//   uploadBytes(storageRef, file).then((snapshot) => {
//     console.log("Uploaded a blob or file!");
//   });
// });

// const imageUploadFunc = () => {
//   //   console.log(file.name);
//   uploadBytes(storageRef, file).then((snapshot) => {
//     console.log("Uploaded a blob or file!");
//   });
// };
// var uploadTask = storageRef.child("images/" + file.name).put(file, metadata);
