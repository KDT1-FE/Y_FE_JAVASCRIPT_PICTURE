import db from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function handler(req, res) {
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
    };

    getData().then((data) => {
        res.status(200).json(data);
        console.log(data);
    });
}
