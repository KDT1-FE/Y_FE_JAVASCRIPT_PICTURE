function is_allchecked() {
  
  const allcheckbox = document.getElementById("allcheckbox");
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = allcheckbox.checked;
  });
}

const defaultcheckbox = document.querySelectorAll('.defaultcheckbox');
defaultcheckbox.forEach(element => {
  element.addEventListener('click',()=>{
    notcheck();
    element.checked = false;
  })
});

function notcheck(){
  Swal.fire({
    title: '조작 금지',
    text: "기본 프로필은 조작 못합니다.",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '확인',
  })
}