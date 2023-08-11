
// 검색창 포커스
const search = document.querySelector('.search__container')
const searchInput = search.firstElementChild
searchInput.onfocus = () => {
    search.classList.add('search__container--focus');
}
searchInput.onblur = () => {
    search.classList.remove('search__container--focus');
}

