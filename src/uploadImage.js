import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export function uploadImage() {
  const imageUrl = document.getElementById("chooseFile").files[0];

  const uniqueImageUrl = new Date().getTime() + "-" + imageUrl.name;

  const storageRef = ref(storage, "profile_images/" + uniqueImageUrl);

  uploadBytes(storageRef, imageUrl)
    .then((snapshot) => {
      console.log("Upload successfully");
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("Download URL:", downloadURL);
        // You can now use the downloadURL to display the image or save it to your database
      });
    })
    .catch((err) => console.log(err));
}
