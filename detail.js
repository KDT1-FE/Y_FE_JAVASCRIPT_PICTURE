const profileImageElement = document.getElementById("profile-image");
const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const phoneElement = document.getElementById("phone");
const categoryElement = document.getElementById("category");

// URL에서 쿼리 파라미터 가져오기
const queryParams = new URLSearchParams(window.location.search);

// 쿼리 파라미터에서 직원 정보 추출
const profileImage = queryParams.get("profileImage");
const name_ = queryParams.get("name");
const email = queryParams.get("email");
const phone = queryParams.get("phone");
const category = queryParams.get("category");

// 가져온 정보를 페이지에 표시
profileImageElement.src = profileImage;
nameElement.textContent = name_;
emailElement.textContent = email;
phoneElement.textContent = phone;
categoryElement.textContent = category;
