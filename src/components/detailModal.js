const prison = document.querySelector('.prison');
const detailModal = document.querySelector('.detailModal');
const detailModalBg = document.getElementById('detailModalBg');
const detailForm = document.getElementById('detailForm');
const detailMugshot = document.querySelector('.detailMugshot');
const saveMugshotBtn = document.getElementById('saveMugshotBtn');
const detailName = document.getElementById('detailName');
const saveNameBtn = document.getElementById('saveNameBtn');
const saveLvBtn = document.getElementById('saveLvBtn');


//Open Prisoner Detail Modal
prison.addEventListener('click', (event) => {
    const prisonCell = event.target;
    const prisonerName = prisonCell.querySelector('.prisonerName');
    if (prisonCell.classList.contains('prisonCell')) {
        const prisonerLv = prisonCell.getAttribute('prisonerLv');
        const lvOptions = document.querySelectorAll('.lvOption');
        detailModal.classList.remove('hidden');
        detailMugshot.alt = prisonCell.id;
        detailMugshot.src = prisonCell.style.backgroundImage.slice(5, -2);
        detailName.placeholder = prisonCell.id;
        lvOptions.forEach(option => {
            if (option.value === prisonerLv) {
                option.setAttribute('selected', 'selected');
            }
        });
    }
    // Save Detail Name    
    saveNameBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const name = detailName.value;
        prisonCell.id = name;
        prisonerName.textContent = name;
        detailMugshot.alt = name;
        detailForm.reset();
        detailName.placeholder = name;
        const lvOptions = document.querySelectorAll('.lvOption');
        detailMugshot.alt = '';
        detailMugshot.src = '';
        detailName.placeholder = '';
        lvOptions.forEach(option => {
            option.removeAttribute('selected');
        });
        detailModal.classList.add('hidden');
        detailModal.classList.add('hidden');
    });
    // Save Detail Lv
    saveLvBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const detailLv = document.getElementById('detailLv');
        console.log(detailLv.value);
        prisonCell.setAttribute('prisonerLv', detailLv.value);
        console.log(prisonCell);
        const lvOptions = document.querySelectorAll('.lvOption');
        detailMugshot.alt = '';
        detailMugshot.src = '';
        detailName.placeholder = '';
        lvOptions.forEach(option => {
            option.removeAttribute('selected');
        });
        detailModal.classList.add('hidden');
        detailModal.classList.add('hidden');
    })
    // Save Detail Mugshot
    saveMugshotBtn.addEventListener('change', () => {
        const newDetailMugshot = saveMugshotBtn.files[0];
        const imageUrl = URL.createObjectURL(newDetailMugshot);
        prisonCell.style.backgroundImage = `url(${imageUrl})`;
        const lvOptions = document.querySelectorAll('.lvOption');
        detailMugshot.alt = '';
        detailMugshot.src = '';
        detailName.placeholder = '';
        lvOptions.forEach(option => {
            option.removeAttribute('selected');
        });
        detailModal.classList.add('hidden');
        detailModal.classList.add('hidden');
    });

})


// Close Prisoner Detail Modal
detailModalBg.addEventListener('click', () => {
    const lvOptions = document.querySelectorAll('.lvOption');
    detailMugshot.alt = '';
    detailMugshot.src = '';
    detailName.placeholder = '';
    lvOptions.forEach(option => {
        option.removeAttribute('selected');
    });
    detailModal.classList.add('hidden');
});