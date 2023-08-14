// Modal open
const openModal = () => {
    document.querySelector(".modal").classList.remove("hidden");
}

const closeModal = () => {
    document.querySelector(".modal").classList.add("hidden");
}

document.querySelector(".imprisonBtn").addEventListener("click", openModal);
document.querySelector(".dismissBtn").addEventListener("click", closeModal);
document.querySelector(".modalBg").addEventListener("click", closeModal);

// form submit
const infoForm = document.getElementById('infoForm');
const responseBox = document.getElementById('responseBox');

infoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const prisonerName = document.getElementById('prisonerName').value;
    const prisonerPhoto = document.getElementById('prisonerPhoto').files[0];
    // const prisonerLv = document.getElementById('prisonerLv').value;

    const reader = new FileReader();
    reader.onload = function (e) {
    const responseBox = document.querySelector('.prison');
    const newPrisonerCell = document.createElement('div');
    newPrisonerCell.classList.add('prisonCell');
    newPrisonerCell.style.backgroundImage = `url(${e.target.result})`;
    newPrisonerCell.alt = `${prisonerName} Mugshot`;
    newPrisonerCell.innerHTML = /*html*/`
        <p class="prisonerName">${prisonerName}</p>
    `;                            
    responseBox.appendChild(newPrisonerCell);
};
    reader.readAsDataURL(prisonerPhoto);
    closeModal();
});