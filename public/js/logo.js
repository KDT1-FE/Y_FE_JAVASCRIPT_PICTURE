/* Logo 클릭하면 index.html로 이동 */
const logo = document.querySelector('.logo__icon');

const MoveIndexPage = () =>{
    logo.addEventListener('click',()=>{
        window.location.href="index.html";
    })
} 
MoveIndexPage();