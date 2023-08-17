const profileName = document.querySelector('.name');
const profileEmail = document.querySelector('.email');
const profilePhone = document.querySelector('.phone');
const profileAddress = document.querySelector('.address');
const profileImage = document.querySelector('.image');
const staffInfoEdit = document.querySelector('.staff-info-edit');

// 방금 생성한 것이거나 마지막으로 클릭한 임직원 정보
const data = JSON.parse(localStorage.getItem('lately-info'));
const phone1 = data['phone'].slice(0, 3);
const phone2 = data['phone'].slice(3, 7);
const phone3 = data['phone'].slice(7);

profileName.innerText = data.name;
profileEmail.innerText = data.email;
profilePhone.innerText = `${phone1}-${phone2}-${phone3}`;
profileAddress.innerText = data.address;
profileImage.src = data.imageUrl;

// 정보변경 페이지로 이동
staffInfoEdit.addEventListener('click', function () {
  location.href = './write.html';
});
