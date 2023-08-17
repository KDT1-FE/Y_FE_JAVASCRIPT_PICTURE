import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmLvUo54Jzhiin0qNBWwut9AG3z5n1zdE",
    authDomain: "azkaban-bef73.firebaseapp.com",
    projectId: "azkaban-bef73",
    storageBucket: "azkaban-bef73.appspot.com",
    messagingSenderId: "61881098784",
    appId: "1:61881098784:web:97038c5ce63f0d2ab95245"
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
        console.log("New name:", name); // 변경된 이름 콘솔 출력
        console.log("Prisoner ID:", prisonerId);
        // Update the Firestore document's name field
        try {
            await updateDoc(doc(db, "prisoner", prisonerId), {
                name: name
            });
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

        // Update the Firestore document's prisonerLv field
        try {
            await updateDoc(doc(db, "prisoner", currentPrisonCell.getAttribute('dataId')), {
                prisonerLv: detailLv.value
            });
        } catch (error) {
            console.error("Error updating prisonerLv in Firestore: ", error);
        }

        currentPrisonCell.setAttribute('prisonerLv', detailLv.value);
        resetDetailModal();
    };

    const saveMugshotChangeHandler = async () => {
        const newDetailMugshot = saveMugshotBtn.files[0];
        const imageUrl = URL.createObjectURL(newDetailMugshot);

        // Update the Firestore document's imageURL field
        try {
            await updateDoc(doc(db, "prisoner", currentPrisonCell.getAttribute('dataId')), {
                imageURL: imageUrl
            });
        } catch (error) {
            console.error("Error updating imageURL in Firestore: ", error);
        }

        currentPrisonCell.style.backgroundImage = `url(${imageUrl})`;
        resetDetailModal();
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
