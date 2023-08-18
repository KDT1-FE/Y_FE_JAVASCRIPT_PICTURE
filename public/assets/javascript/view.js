const nameInput = document.getElementById("name_ID");
const emailInput = document.getElementById("email_ID");
const phoneInput = document.getElementById("phone_ID");
const rankInput = document.getElementById("rank_ID");

const nameText = document.getElementById("name_text");
const emailText = document.getElementById("email_text");
const phoneText = document.getElementById("phone_text");
const rankText = document.getElementById("rank_text");

const fileInput = document.getElementById('file_input');
const viewImage = document.getElementById('view_img_ID');

// 입력 필드의 값이 변경될 때마다 view_text, view_img 업데이트 함수를 호출
nameInput.addEventListener("input", updateViewText);
emailInput.addEventListener("input", updateViewText);
phoneInput.addEventListener("input", updateViewText);
rankInput.addEventListener("input", updateViewText);
fileInput.addEventListener('change', updateViewImage);

// view_text를 업데이트하는 함수
function updateViewText() {
  nameText.textContent = nameInput.value;
  emailText.textContent = emailInput.value;
  phoneText.textContent = phoneInput.value;
  rankText.textContent = rankInput.value;
}

// view_img를 업데이트하는 함수
function updateViewImage(event) {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function (e) {
            viewImage.src = e.target.result;
        };

        reader.readAsDataURL(selectedFile);
    }
}