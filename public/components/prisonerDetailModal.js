import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
require('dotenv').config();

// Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

// Initialize the Firebase app
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
    let currentPrisonCell = null; // 현재 선택된 prisonCell

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

        saveNameBtn.removeEventListener('click', saveNameClickHandler); // 기존 이벤트 리스너 삭제
        saveNameBtn.addEventListener('click', saveNameClickHandler); // 새로운 이벤트 리스너 등록

        saveLvBtn.removeEventListener('click', saveLvClickHandler); // 기존 이벤트 리스너 삭제
        saveLvBtn.addEventListener('click', saveLvClickHandler); // 새로운 이벤트 리스너 등록

        saveMugshotBtn.removeEventListener('change', saveMugshotChangeHandler); // 기존 이벤트 리스너 삭제
        saveMugshotBtn.addEventListener('change', saveMugshotChangeHandler); // 새로운 이벤트 리스너 등록

        currentPrisonCell = prisonCell; // 현재 prisonCell 업데이트
    };

    const saveNameClickHandler = async (event) => {
        event.preventDefault();
        const name = detailName.value;
        const prisonerId = currentPrisonCell.getAttribute('dataId');

        // Use setDoc to create or overwrite a document
        const prisonerDocRef = doc(db, "prisoner", prisonerId);
        const prisonerData = {
            name: name
        };

        try {
            await setDoc(prisonerDocRef, prisonerData, { merge: true }); // Use merge option to merge new data with existing document
            console.log("Name updated in Firestore: ", name);
        } catch (error) {
            console.error("Error updating name in Firestore: ", error);
        }

        // Update the displayed prisoner name in the UI
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

        // Update the Firestore document's prisonerLv field using setDoc
        const prisonerDocRef = doc(db, "prisoner", prisonerId);
        const prisonerData = {
            prisonerLv: detailLv.value
        };

        try {
            await setDoc(prisonerDocRef, prisonerData, { merge: true }); // Use merge option to merge new data with existing document
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

                 // Get the old mugshot image URL from storage and attempt to delete it
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

        // Upload the new mugshot image to storage    
        const storageRef = ref(storage, `mugshot/${currentPrisonCell.id}_${Date.now()}`);
        try {
            await uploadBytes(storageRef, newDetailMugshot);
            console.log("New image uploaded to storage");
        } catch (error) {
            console.error("Error uploading new image to storage: ", error);
            return; // if there's an error uploading, we don't want to proceed.
        }

        // Get the download URL of the new uploaded image
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
