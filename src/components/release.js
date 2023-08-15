const releaseBtn = document.querySelector('.releaseBtn');
const releaseWords = document.querySelectorAll('.releaseWord');

releaseBtn.addEventListener('click', () => {
    releaseWords.forEach(word => {
        word.classList.toggle('hidden'); 
    });
    releaseWords.forEach(releaseWord => {
        releaseWord.addEventListener('click', () => {
            const prisonCell = releaseWord.parentElement;                        
            prisonCell.remove();
        });
    });
});
