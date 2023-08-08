import { ref, getStorage } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage);
