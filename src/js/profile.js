const profileName = document.querySelector('.name');
const profileEmail = document.querySelector('.email');
const profilePhone = document.querySelector('.phone');
const profileAddress = document.querySelector('.address');
const profileImage = document.querySelector('.image');

// 방금 생성한 것이거나 마지막으로 클릭한 임직원 정보
const data = JSON.parse(localStorage.getItem('lately-info'));

profileName.innerText = data.name;
profileEmail.innerText = data.email;
profilePhone.innerText = data.phone;
profileAddress.innerText = data.address;
profileImage.src = data.imageUrl;
