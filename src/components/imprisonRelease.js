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

const releaseWordClickHandler = (event) => {
    const prisonCell = event.currentTarget.parentElement;
    prisonCell.remove();
    event.stopPropagation();
};

const handleReleaseBtnClick = () => {
    const releaseWords = document.querySelectorAll('.releaseWord');
    releaseWords.forEach(word => {
        word.classList.toggle('hidden');
    });
    const isReleaseActive = [...releaseWords].some(word => !word.classList.contains('hidden'));
    imprisonBtn.disabled = isReleaseActive;
    imprisonBtn.classList.toggle('hidden');
};

const initReleaseWords = () => {
    const releaseWords = document.querySelectorAll('.releaseWord');
    releaseWords.forEach(releaseWord => {
        releaseWord.addEventListener('click', releaseWordClickHandler);
    });
};

const infoForm = document.getElementById('infoForm');
const releaseBtn = document.querySelector('.releaseBtn');
const imprisonBtn = document.querySelector(".imprisonBtn");

infoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const prisonerName = document.getElementById('prisonerName').value;
    const prisonerPhoto = document.getElementById('prisonerPhoto').files[0];
    const prisonerLv = document.getElementById('prisonerLv').value;

    const reader = new FileReader();
    reader.onload = function (e) {
        const responseBox = document.querySelector('.prison');
        const newPrisonerCell = document.createElement('div');
        newPrisonerCell.classList.add('prisonCell');
        newPrisonerCell.style.backgroundImage = `url(${e.target.result})`;
        newPrisonerCell.alt = `${prisonerName} Mugshot`;
        newPrisonerCell.id = `${prisonerName}`;
        newPrisonerCell.setAttribute('prisonerLv', prisonerLv);
        newPrisonerCell.innerHTML = /*html*/`
            <p class="prisonerName">${prisonerName}</p>
            <span class="releaseWord hidden" id="releaseWord">Release</span>
        `;

        responseBox.appendChild(newPrisonerCell);
        const newReleaseWord = newPrisonerCell.querySelector('.releaseWord');
        newReleaseWord.addEventListener('click', () => {
            newPrisonerCell.remove();
        });

        initReleaseWords();
    };

    reader.readAsDataURL(prisonerPhoto);
    closeModal();
});

releaseBtn.addEventListener('click', handleReleaseBtnClick);
initReleaseWords();
imprisonBtn.addEventListener("click", () => {
    const releaseWords = document.querySelectorAll('.releaseWord');
    const isReleaseActive = [...releaseWords].some(word => !word.classList.contains('hidden'));
});
