const search = document.querySelector('.material-symbols-outlined');
const searchbox = document.querySelector('.searchbox')
var check = false;
search.addEventListener('click', ()=>{
  
  const profileList = document.querySelector('.profile-list')
  const names = profileList.querySelectorAll('.item .name')
  const allItems = profileList.querySelectorAll('.item');
    allItems.forEach(item => {
      item.style.display = 'flex';
    });
  names.forEach(name => {
    const item = name.closest('.item');
    if(name.innerHTML === searchbox.value){
      check=true
    }
    else{
      item.style.display='none';
    }
  })
  if (check === false) {
    const allItems = profileList.querySelectorAll('.item');
    allItems.forEach(item => {
      item.style.display = 'flex';
    });
    cantsearch();
  }

  check=false
})


function cantsearch(){
  Swal.fire({
    title: '결과 없음',
    text: "검색된 결과가 없습니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}
