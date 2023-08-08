import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const storageRef = ref(storage);

const gsReference = ref(storage, "gs://manager-c1f99.appspot.com/images/");

getDownloadURL(ref(storage, "images/cannes.jpg"))
  .then((url) => {
    // Or inserted into an <img> element
    const img = document.getElementById("myimg");
    img.setAttribute("src", url);
  })
  .catch((error) => {
    // Handle any errors
  });
