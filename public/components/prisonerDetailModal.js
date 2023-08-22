import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBmLvUo54Jzhiin0qNBWwut9AG3z5n1zdE",
    authDomain: "azkaban-bef73.firebaseapp.com",
    projectId: "azkaban-bef73",
    storageBucket: "azkaban-bef73.appspot.com",
    messagingSenderId: "61881098784",
    appId: "1:61881098784:web:97038c5ce63f0d2ab95245"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const initPrisonerDetailModal = () => {
    const prison = document.querySelector('.prison');
    const detailModal = document.querySelector('.detailModal');
    const detailForm = document.getElementById('detailForm');
    const detailMugshot = document.querySelector('.detailMugshot');
    const detailName = document.getElementById('detailName');
    const saveMugshotBtn = document.getElementById('saveMugshotBtn');
    const saveNameBtn = document.getElementById('saveNameBtn');
    const saveLvBtn = document.getElementById('saveLvBtn');
    const lvOptions = document.querySelectorAll('.lvOption');
    let currentPrisonCell = null;

    const openPrisonerDetailModal = (prisonCell) => {
        const prisonerName = prisonCell.querySelector('.prisonerName');
        const prisonerLv = prisonCell.getAttribute('prisonerLv');

        detailModal.classList.remove('hidden');
        detailMugshot.alt = prisonCell.id;
        detailMugshot.src = prisonCell.style.backgroundImage.slice(5, -2);
        detailName.placeholder = prisonCell.id;

        lvOptions.forEach(option => {
            if (option.value === prisonerLv) {
                option.setAttribute('selected', 'selected');
            } else {
                option.removeAttribute('selected');
            }
        });

        saveNameBtn.removeEventListener('click', saveNameClickHandler);
        saveNameBtn.addEventListener('click', saveNameClickHandler);

        saveLvBtn.removeEventListener('click', saveLvClickHandler);
        saveLvBtn.addEventListener('click', saveLvClickHandler);

        saveMugshotBtn.removeEventListener('change', saveMugshotChangeHandler);
        saveMugshotBtn.addEventListener('change', saveMugshotChangeHandler);

        currentPrisonCell = prisonCell;
    };

    const saveNameClickHandler = async (event) => {
        event.preventDefault();
        const name = detailName.value;
        const prisonerId = currentPrisonCell.getAttribute('dataId');

        const prisonerDocRef = doc(db, "prisoner", prisonerId);
        const prisonerData = {
            name: name
        };

        try {
            await setDoc(prisonerDocRef, prisonerData, { merge: true });
            console.log("Name updated in Firestore: ", name);
        } catch (error) {
            console.error("Error updating name in Firestore: ", error);
        }

        const prisonerName = currentPrisonCell.querySelector('.prisonerName');
        prisonerName.textContent = name;

        detailMugshot.alt = name;
        detailForm.reset();
        resetDetailModal();
    };

    const saveLvClickHandler = async (event) => {
        event.preventDefault();
        const detailLv = document.getElementById('detailLv');
        const prisonerId = currentPrisonCell.getAttribute('dataId');

        const prisonerDocRef = doc(db, "prisoner", prisonerId);
        const prisonerData = {
            prisonerLv: detailLv.value
        };

        try {
            await setDoc(prisonerDocRef, prisonerData, { merge: true });
            console.log("prisonerLv updated in Firestore");
        } catch (error) {
            console.error("Error updating prisonerLv in Firestore: ", error);
        }

        currentPrisonCell.setAttribute('prisonerLv', detailLv.value);
        resetDetailModal();
    };


    const saveMugshotChangeHandler = async () => {
        const newDetailMugshot = saveMugshotBtn.files[0];
        const prisonerId = currentPrisonCell.getAttribute('dataId');

        const oldImageUrl = currentPrisonCell.style.backgroundImage.slice(5, -2);
        const oldImageFileName = oldImageUrl.split('/').pop().split('?')[0];

        if (oldImageUrl) {
            const oldStorageRef = ref(storage, `mugshot/${oldImageFileName}`);
            try {
                await deleteObject(oldStorageRef);
                console.log("Old image deleted from storage");
            } catch (error) {
                console.warn("Error deleting old image from storage or image didn't exist: ", error);
            }
        }

        const storageRef = ref(storage, `mugshot/${currentPrisonCell.id}_${Date.now()}`);
        try {
            await uploadBytes(storageRef, newDetailMugshot);
            console.log("New image uploaded to storage");
        } catch (error) {
            console.error("Error uploading new image to storage: ", error);
            return;
        }

        try {
            const imageUrl = await getDownloadURL(storageRef);
            const prisonerDocRef = doc(db, "prisoner", prisonerId);
            const prisonerData = {
                imageURL: imageUrl
            };
            await setDoc(prisonerDocRef, prisonerData, { merge: true });
            console.log("Image URL updated in Firestore");

            currentPrisonCell.style.backgroundImage = `url(${imageUrl})`;
            resetDetailModal();
        } catch (error) {
            console.error("Error updating imageURL in Firestore: ", error);
        }
    };


    const resetDetailModal = () => {
        lvOptions.forEach(option => option.removeAttribute('selected'));
        detailMugshot.alt = '';
        detailMugshot.src = '';
        detailName.placeholder = '';
        detailModal.classList.add('hidden');
    };

    prison.addEventListener('click', (event) => {
        const prisonCell = event.target.closest('.prisonCell');
        if (prisonCell) {
            openPrisonerDetailModal(prisonCell);
        }
    });

    const detailModalBg = document.getElementById('detailModalBg');
    detailModalBg.addEventListener('click', () => {
        lvOptions.forEach(option => option.removeAttribute('selected'));
        detailMugshot.alt = '';
        detailMugshot.src = '';
        detailName.placeholder = '';
        detailModal.classList.add('hidden');
    });
};

initPrisonerDetailModal();
