import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const url = new URL(window.location);
const urlParams = url.searchParams;

const coustomerId = urlParams.get("id");

window.onload = async () => {
  const docRef = doc(db, "customers", coustomerId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const avatarImg = document.getElementById("avatarImg");
    avatarImg.src = docSnap.data().avatar;

    const nameInput = document.getElementById("nameInput");
    nameInput.value = docSnap.data().name;

    const emailInput = document.getElementById("emailInput");
    emailInput.value = docSnap.data().email;

    const phoneInput = document.getElementById("phoneInput");
    phoneInput.value = docSnap.data().phone;

    const gradeInput = document.getElementById("gradeInput");
    gradeInput.value = docSnap.data().grade;
  }
};
