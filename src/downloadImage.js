import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

getDownloadURL(ref(storage, "images/hi.jpeg"))
  .then((url) => {
    // Or inserted into an <img> element
    console.log(url);
    const img = document.getElementById("myimg");
    img.setAttribute("src", url);
  })
  .catch((error) => {
    // Handle any errors
  });
