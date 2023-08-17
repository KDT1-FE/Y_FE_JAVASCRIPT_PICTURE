import { storage, db } from './firebase.js';

// firebase에서 image,profile 가져와서 직원리스트 생성
const table = document.querySelector('.employees__table');
db.collection('profile')
  .get()
  .then((res) => {
    res.forEach((item) => {
      const storageRef = storage.ref();
      const profile = storageRef.child('image/' +item.data().employeeId+'.jpg');
      profile.getDownloadURL().then((res) => {
        table.insertAdjacentHTML(
          'beforeend',
          `
  <tr  class="employees__table__row">
    <td><input type="checkbox" class="checkbox" id="profile" /></td>
    <td><img  class="table__row__img"  src="${res}"></td>
    <td class="employeeName">${item.data().name}</td>
    <td class="employeeId">${item.data().employeeId}</td>
    <td>${item.data().position}</td>
    <td>${item.data().phonenum}</td>
    <td>${item.data().email}</td>
    </label>
    
  </tr>
`
        );
      });
    });
  });
  function deleteFirestore (collection,doc){
    const docRef = db.collection(collection).doc(doc);
    docRef.delete()
}
// 직원 추가페이지 이동
document.querySelector('.btn__add').addEventListener('click',()=>{window.location.href = '/employee_add.html'})

// 직원 삭제
function getCheckEmployeeId (){
    const rows = document.querySelectorAll('.checkbox:checked');
    const employeeIds = [];
    
    rows.forEach(row=>{
        let employeeId = row.closest('.employees__table__row').querySelector('.employeeId');
        employeeIds.push(employeeId.textContent)
    })
    return employeeIds;
}
document.querySelector('.btn__del').addEventListener('click',()=>{
  let checkIds = getCheckEmployeeId();
    const userConfirmed = confirm(`직원 ${checkIds.length}명을 삭제하시겠습니까?`)
    if (userConfirmed) {
        checkIds.forEach(checkId=>{
            deleteFirestore('profile',checkId)
            setTimeout(()=>window.location.href = "/index.html",500)
            
        })
    } else {
        
    }
})

async function renderTotalEmployees () {
    let totalEmployees = 0;
    const test = await db.collection('profile').get();
    
    test.forEach(()=>{
        totalEmployees++;
    })
    document.querySelector('.search__total').innerHTML += totalEmployees    
}

renderTotalEmployees();


table.addEventListener('click',(e)=>{
  if(e.target.value === undefined){
    let selectEmployee = e.target.parentNode.querySelector('.employeeId')
  localStorage.setItem('selectEmployee',selectEmployee.innerHTML);
  setTimeout(()=>window.location.href = "/employee_detail.html",500)
  }
  
});

function changeAllcheckbox (){
  const allCheckbox = document.querySelector('.checkbox__all');
  const checkboxs = document.querySelectorAll('.checkbox');
  
  allCheckbox.addEventListener('change',(e)=>{
    const checkboxs = document.querySelectorAll('.checkbox');
   
    checkboxs.forEach(item=>{
      
      if (e.target.checked){
        item.checked = e.target.checked;
        
      }
      else if (!e.target.checked){
        item.checked = e.target.checked;
      }
    })
  })
}
changeAllcheckbox()

function searchList () {
  
  const searchInput = document.querySelector('.search__input');
  searchInput.addEventListener('input',(e)=>{
  const tableRow = document.querySelectorAll('.employees__table__row');

    if (e.target.value.length >= 2){
      tableRow.forEach(item=>{
        const employeeName = item.querySelector('.employeeName');
      
        if (employeeName.innerHTML.includes(e.target.value)){
          const employee = employeeName.closest('.employees__table__row');
          employee.classList.contains('hide') ? employee.classList.remove('hide') : undefined;
        }
        else {
          const employee = employeeName.closest('.employees__table__row');
          employee.classList.add('hide');
          
        }
      })
    }
    else if (e.target.value.length === 0 ){
      tableRow.forEach((item)=>{
        if (item.classList.contains('hide')){
          item.classList.remove('hide')
        }
      })
    }
  })
}
searchList()