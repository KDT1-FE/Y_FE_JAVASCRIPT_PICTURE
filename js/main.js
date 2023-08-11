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


// modal 열기
const registerButton = document.getElementById('register-button');
const modalContainer = document.querySelector('.modal-container');
const modalIframe = document.querySelector('.modal-iframe');

registerButton.addEventListener('click', () => {
    modalContainer.style.display = 'flex';
    modalIframe.contentWindow.postMessage('openModal', '*');
});


// modal 닫기
window.addEventListener('message', (event) => {
    if (event.data === 'modalClosed') {
        modalContainer.style.display = 'none';
    }
});


