function handleInputChange() {
    const searchPrisonerInput = document.querySelector('.searchPrisoner');
    const searchText = searchPrisonerInput.value.toLowerCase().trim();
    
    const prisonCells = document.querySelectorAll('.prisonCell');
    
    prisonCells.forEach(cell => {
        const cellId = cell.id.toLowerCase();
        
        if (cellId.includes(searchText)) {
            cell.style.display = 'flex';
        } else {
            cell.style.display = 'none';
        }
    });
}
