import Store from '../store/myValley.js';
import valleyList from '../store/valleyList.js';
import involvedValleyList from '../store/involvedValley.js';
import firebase from '../core/firebase.js';
import { query, where, setDoc, doc, getDoc, getDocs, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const db = firebase.db;
const storage = firebase.storage;

const getCollection = async () => {
    if (valleyList.state.valleyList.length !== 0) {
        valleyList.state.valleyList = [];
    }
    const querySnapshot = await getDocs(collection(db, 'valley'));
    querySnapshot.forEach((doc) => {
        // id를 같이 전해줄 수 있도록 object로 만들어준다.
        const dataObject = { id: doc.id, data: doc.data() };
        valleyList.state.valleyList.push(dataObject);
    });
};

const uploadImage = async (props) => {
    const storageRef = ref(storage, `${props}`);
    await uploadBytes(storageRef, Store.state.file);
    const url = await getDownloadURL(storageRef);
    Store.state.url = url;
};

const setData = async () => {
    const date = new Date();
    const dateId = Store.state.nickname + date.getTime().toString();

    await uploadImage(dateId);

    await setDoc(doc(db, 'valley', dateId), {
        nickname: Store.state.nickname,
        name: Store.state.name,
        province: Store.state.province,
        city: Store.state.city,
        address: Store.state.address,
        additional: Store.state.additional,
        url: Store.state.url,
    });
};

const getData = async (props) => {
    const docRef = doc(db, 'valley', props);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        Store.state.nickname = data.nickname;
        Store.state.name = data.name;
        Store.state.province = data.province;
        Store.state.city = data.city;
        Store.state.address = data.address;
        Store.state.additional = data.additional;
        Store.state.url = data.url;
    } else {
        console.log('No such document!');
    }
};

const updateData = async (props) => {
    const docRef = doc(db, 'valley', props);
    await uploadImage(props);
    await updateDoc(docRef, {
        nickname: Store.state.nickname,
        name: Store.state.name,
        province: Store.state.province,
        city: Store.state.city,
        address: Store.state.address,
        additional: Store.state.additional,
        url: Store.state.url,
    });
};

const deleteData = async (props) => {
    const docRef = doc(db, 'valley', props);
    await deleteDoc(docRef);

    const storageRef = ref(storage, `${props}`);
    await deleteObject(storageRef);
};

const getInvolvedData = async (_id, state, arrays) => {
    const valleyRef = collection(db, 'valley');
    const q = query(valleyRef, where(state, 'in', [arrays]));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (_id !== doc.id) {
            const dataObject = { id: doc.id, data: doc.data() };
            involvedValleyList.state.valleyList.push(dataObject);
        }
    });
};

export { setData, getCollection, uploadImage, getData, updateData, deleteData, getInvolvedData };
