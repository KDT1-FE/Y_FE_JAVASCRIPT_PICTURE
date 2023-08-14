const detailModal = document.querySelector('.detailModal');
        const detailModalBg = document.querySelector('.detailModalBg');
        const detailMugshot = document.querySelector('.detailMugshot');
        const detailName = document.querySelector('.detailName span');
        const detailLv = document.querySelector('.detailLv span');
        const editMugshotBtn = document.querySelector('.editMugshotBtn');
        const editNameBtn = document.querySelector('.editNameBtn');
        const editLvBtn = document.querySelector('.editLvBtn');

        const prisonCells = document.querySelectorAll('.prisonCell');
        prisonCells.forEach((prisonCell) => {
            prisonCell.addEventListener('click', () => {
                detailMugshot.src = prisonCell.style.backgroundImage.slice(5, -2);
                detailName.textContent = prisonCell.querySelector('.prisonerName').textContent;
                detailLv.textContent = prisonCell.getAttribute('prisonerLv');
                detailModal.classList.remove('hidden');
            });
        });
        detailModalBg.addEventListener('click', () => {
            detailModal.classList.add('hidden');
        });
        editMugshotBtn.addEventListener('click', () => {
            const newMugshot = prompt('Enter the new mugshot URL:');
            if (newMugshot) {
                const mugshotImage = detailModal.querySelector('.mugshotImage');
                mugshotImage.style.backgroundImage = `url(${newMugshot})`;
            }
        });


        editNameBtn.addEventListener('click', () => {
            const newName = prompt('Enter the new name:');
            if (newName) {
                const prisonerName = detailModal.querySelector('.prisonerName');
                prisonerName.textContent = newName;
            }
        });


        editLvBtn.addEventListener('click', () => {
            const newLv = prompt('Enter the new level:');
            if (newLv) {
                const prisonerLv = detailModal.querySelector('.prisonerLv');
                prisonerLv.textContent = newLv;
            }
        });