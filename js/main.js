
// 검색창 포커스
const search = document.querySelector('.search__container')
const searchInput = search.firstElementChild
searchInput.onfocus = () => {
    search.classList.add('search__container--focus');
}
searchInput.onblur = () => {
    search.classList.remove('search__container--focus');
}

// 검색창 value 값 입력
const searchButton = document.querySelector('.search button')
let searchValue = false;
searchButton.addEventListener("click", ()=>{
    searchValue = searchInput.value
    console.log(searchValue)
})



const sort = document.querySelector('.dropdown--sort')
const sortWrap = sort.children[0].lastElementChild
const sortArr = sortWrap.querySelectorAll('.dropdown__list')

// drop list value 값 지정
for(i=0; i<sortArr.length; i++){
    const sortLi = sortWrap.children[0].children[i]
    sortLi.value = i 
}

// 정렬창 select 된 값으로 span 값 바꾸기
function sortOption (optionEl){
    const sortBox = sort.querySelector(".dropdown__display")
    const sortEl = sortBox.firstElementChild
    sortEl.textContent = optionEl.textContent;
}

// 클릭 시 타겟 지정, 드랍다운 닫기
sortArr.forEach(sortList => {
    sortList.addEventListener("click", (e)=>{
        const targetEl = e.target.parentElement;
        const isOptionEl = targetEl.classList.contains("dropdown__list")
        if(isOptionEl) sortOption(targetEl)
        sort.classList.remove('dropdown--open');
        valueReturn(targetEl)
    })
})

// value값 input으로 보내기
function valueReturn(optionEl){
    const value = optionEl.value
    sort.children[0].children[1].value = value
}


