
// 메뉴 열고 닫기
const menuButton = document.querySelector('.nav__control a')
menuButton.addEventListener("click",(e)=>{
    e.preventDefault();
    menuButton.classList.toggle('open')
})


// 드롭다운 열고 닫기
const dropDown = document.querySelectorAll('.dropdown')

for (const i in dropDown) {

    const dropWrap = dropDown[i].lastElementChild;
    const dropClick = dropWrap.children[0] // dropdown__display

    // dropClick.addEventListener("click",()=>{
    //     dropDown.classList.toggle('dropdown--open')
    // })
}



