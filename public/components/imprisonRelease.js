import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

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

// Select the box for rendering Prison Cells
const responseBox = document.querySelector('.prison');

// Create a new Prison Cell element
const createPrisonerCell = (doc) => {
    // Extract data from the document
    const { name, prisonerLv, imageURL } = doc.data();
    const cell = document.createElement('div');
    cell.classList.add('prisonCell');
    cell.setAttribute('prisonerLv', prisonerLv);
    cell.setAttribute('dataId', doc.id);
    cell.setAttribute('id', name);
    cell.setAttribute('data-imageurl', imageURL);
    cell.style.backgroundImage = `url(${imageURL})`;
    cell.innerHTML = /*html*/`
        <p class="prisonerName">${name}</p>
        <span class="releaseWord hidden" id="releaseWord">Release</span>
    `;

    // Add event listener to the release button
    const releaseWord = cell.querySelector('.releaseWord');
    releaseWord.addEventListener('click', async () => {
        // Delete the document from Firestore
        await deleteDoc(doc.ref);
        // Remove the cell element from the UI
        cell.remove();
    });

    return cell;
};

// Render Prison Cells from Firebase data
const renderPrisonCells = async () => {
    try {
        // Get documents from the "prisoner" collection in Firestore
        const querySnapshot = await getDocs(collection(db, "prisoner"));

        // Clear the existing responseBox content and render new cells
        responseBox.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const prisonerCell = createPrisonerCell(doc);
            responseBox.appendChild(prisonerCell);
        });
    } catch (error) {
        console.error("Error fetching prisoners: ", error);
    }
};

// Initial rendering of Prison Cells
renderPrisonCells();

// Modal-related event handlers
const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("hidden");
};

const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("hidden");
    document.getElementById('infoForm').reset();
};

document.querySelector(".imprisonBtn").addEventListener("click", openModal);
document.querySelector(".dismissBtn").addEventListener("click", closeModal);
document.querySelector(".modalBg").addEventListener("click", closeModal);

// Event handler for releasing a prisoner
const releaseWordClickHandler = async (event) => {
    event.stopPropagation();
    const prisonCell = event.currentTarget.parentElement;

    // Get imageURL from the prisonCell's attributes
    const imageURL = prisonCell.getAttribute('data-imageurl'); // 'data-imageurl' 속성에서 이미지 URL 가져오기

    prisonCell.remove();
    // Delete the document from Firestore based on the dataId attribute
    await deleteDoc(db, prisonCell.getAttribute('dataId'));

    // Create a reference to the file to delete
    const fileRef = ref(storage, `mugshot/${imageURL}`);

    // Delete the file
    deleteObject(fileRef)
        .then(() => {
            console.log('File deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting file: ', error);
        });
};


// Handle the "Release" button click
const handleReleaseBtnClick = () => {
    const releaseWords = document.querySelectorAll('.releaseWord');
    releaseWords.forEach(word => {
        word.classList.toggle('hidden');
    });
    const isReleaseActive = [...releaseWords].some(word => !word.classList.contains('hidden'));
    imprisonBtn.disabled = isReleaseActive;
    imprisonBtn.classList.toggle('hidden');
};

// Initialize release word event listeners
const initReleaseWords = () => {
    const releaseWords = document.querySelectorAll('.releaseWord');
    releaseWords.forEach(releaseWord => {
        releaseWord.addEventListener('click', releaseWordClickHandler);
    });
};

// Handle the form submission for imprisoning a new prisoner
const infoForm = document.getElementById('infoForm');
const releaseBtn = document.querySelector('.releaseBtn');
const imprisonBtn = document.querySelector(".imprisonBtn");

infoForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get prisoner information from the form inputs
    const prisonerName = document.getElementById('prisonerName').value;
    const prisonerPhoto = document.getElementById('prisonerPhoto').files[0];
    const prisonerLv = document.getElementById('prisonerLv').value;

    // Create a reference to the storage location for the prisoner's photo
    const storageRef = ref(storage, `mugshot/${prisonerName}_${Date.now()}`);

    try {
        // Upload the prisoner's photo to the specified storage location
        const uploadTask = uploadBytes(storageRef, prisonerPhoto);
        const snapshot = await uploadTask;

        console.log('Uploaded a blob or file!');

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Create a new Prison Cell element with prisoner's information and the downloaded image
        const newPrisonerCell = document.createElement('div');
        newPrisonerCell.classList.add('prisonCell');
        newPrisonerCell.style.backgroundImage = `url(${downloadURL})`;
        newPrisonerCell.alt = `${prisonerName} Mugshot`;
        newPrisonerCell.id = `${prisonerName}`;
        newPrisonerCell.setAttribute('prisonerLv', prisonerLv);
        newPrisonerCell.innerHTML = /*html*/`
            <p class="prisonerName">${prisonerName}</p>
            <span class="releaseWord hidden" id="releaseWord">Release</span>
        `;

        // Add the new Prison Cell to the responseBox
        responseBox.appendChild(newPrisonerCell);

        // Add the prisoner's information to Firestore
        const docRef = await addDoc(collection(db, "prisoner"), {
            name: prisonerName,
            prisonerLv: prisonerLv,
            imageURL: downloadURL
        });
        console.log("Document written with ID: ", docRef.id);

        // Add event listener to the new release button
        const newReleaseWord = newPrisonerCell.querySelector('.releaseWord');
        newReleaseWord.addEventListener('click', () => {
            newPrisonerCell.remove();
        });

        // Reinitialize release word event listeners
        initReleaseWords();

        // Close the modal
        closeModal();
    } catch (error) {
        console.error("Error uploading file or adding document: ", error);
    }
});


// Add event listeners for the release button and initialize release words
releaseBtn.addEventListener('click', handleReleaseBtnClick);
initReleaseWords();
imprisonBtn.addEventListener("click", () => {
    const releaseWords = document.querySelectorAll('.releaseWord');
    const isReleaseActive = [...releaseWords].some(word => !word.classList.contains('hidden'));
});
