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
  <tr class="employees__table__row">
    <td><input type="checkbox" /></td>
    <td><img  class="table__row__img"  src="${res}"></td>
    <td>${item.data().name}</td>
    <td>${item.data().employeeId}</td>
    <td>${item.data().position}</td>
    <td>${item.data().phonenum}</td>
    <td>${item.data().email}</td>
  </tr>
`
        );
      });
    });
  });


document.querySelector('.btn__add').addEventListener('click',()=>{window.location.href = '/employee_add.html'})