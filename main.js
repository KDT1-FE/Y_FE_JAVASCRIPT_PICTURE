// 검색 
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    const rows = document.querySelectorAll('.body-tr');
    
    rows.forEach((row) => {
        const name = row.querySelector('.td-name').textContent;
        const email = row.querySelector('.td-emial').textContent;
        
        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
});

