// 메뉴 열고 닫기
const menuButton = document.querySelector('.nav__control a')
const menuWrap = document.querySelector('.nav__wrap')
menuButton.addEventListener("click",(e)=>{
    e.preventDefault();
    menuWrap.parentElement.classList.toggle('close')
})


// 메뉴 스크롤 따라다니기
 window.addEventListener("scroll", ()=>{
     menuWrap.style.transform = 'translateY('+document.documentElement.scrollTop+'px)'
 })


// 메뉴 브라우저 사이즈에 맞게 열고 닫기
function menuClose () {
    const BrowserWidth = window.innerWidth;
    if (BrowserWidth <= 1200) menuWrap.parentElement.classList.add('close')
    if (BrowserWidth >= 1400) menuWrap.parentElement.classList.remove('close')
}
menuClose()

// 브라우저 사이즈 실시간 감지 및 메뉴 축소/확대
window.addEventListener("resize", ()=>{
    menuClose()
})


// 드롭다운 열고 닫기
const dropDown = document.querySelectorAll('.dropdown')
for (i = 0; i<dropDown.length; i++) {

    const dropWrap = dropDown[i]
    const dropClick = dropWrap.lastElementChild.firstElementChild // dropdown__display

     dropClick.addEventListener("click",()=>{
        dropWrap.classList.toggle('dropdown--open');
     })
     document.addEventListener("mouseup", (e) => {
        if (!dropWrap.contains(e.target)) dropWrap.classList.remove('dropdown--open');
    })
}

// 탑버튼 처음 위치 잡기
const scrollTop = document.querySelector('.scrolltop')
function scrollTopTransition (){
    const TopHeight = window.innerHeight + document.documentElement.scrollTop - 70
    scrollTop.style.transform = 'translateY('+ TopHeight+'px)'
}
scrollTopTransition()

// 탑버튼 스크롤 따라다니기
window.addEventListener("scroll", ()=>{
    scrollTopTransition()
})


// 탑버튼 윈도우 스크롤탑
scrollTop.firstElementChild.addEventListener("click", ()=>{
    const BrowserTop = document.documentElement.scrollTop
    if (BrowserTop != 0) {
        window.scrollTo(0, 0);
    }
})
