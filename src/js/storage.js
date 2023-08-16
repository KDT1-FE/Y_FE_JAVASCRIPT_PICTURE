import app from "./app";

import { getStorage } from "firebase/storage";

const storage = getStorage(app);

export default storage;
