const tBody = document.querySelector('tbody');

let getItem = localStorage.getItem('infos');
if (getItem) {
  getItem = JSON.parse(getItem);

  getItem.forEach((item) => {
    createStaffList(item);
  });
}

function createStaffList(item) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td><input type="checkbox" /></td>
    <td><img src="${item.imageUrl}" alt="사진이었던 것" /></td>
    <td>${item.name}</td>
    <td>${item.email}</td>
    <td>${item.phone}</td>
    <td>${item.address}</td>
  `;

  tBody.append(tr);

  // 임직원 클릭 시 임직원 상세정보 페이지로 이동
  tr.addEventListener('click', function () {
    const data = JSON.stringify(item);
    localStorage.setItem('lately-info', data);

    location.href = '/profile.html';
  });
}
