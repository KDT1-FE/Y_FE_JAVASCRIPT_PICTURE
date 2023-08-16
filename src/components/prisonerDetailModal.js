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

    const saveNameClickHandler = (event) => {
        event.preventDefault();
        const name = detailName.value;
        currentPrisonCell.id = name;
        const prisonerName = currentPrisonCell.querySelector('.prisonerName');
        prisonerName.textContent = name;
        detailMugshot.alt = name;
        detailForm.reset();
        resetDetailModal();
    };

    const saveLvClickHandler = (event) => {
        event.preventDefault();
        const detailLv = document.getElementById('detailLv');
        currentPrisonCell.setAttribute('prisonerLv', detailLv.value);
        resetDetailModal();
    };

    const saveMugshotChangeHandler = () => {
        const newDetailMugshot = saveMugshotBtn.files[0];
        const imageUrl = URL.createObjectURL(newDetailMugshot);
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
