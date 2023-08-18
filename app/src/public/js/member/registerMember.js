const form = document.querySelector('.profile-form');
const imageInput = document.getElementById('profile-image-input');

const homeButton = document.querySelector('.profile-actions__btn--back');

// 직원 등록
async function registerMember() {
  const body = {
    id: form['profile-id'].value,
    name: form['profile-name'].value,
    position: form['profile-position'].value,
  };

  const response = await fetch('http://localhost:3000/member/registerMember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('직원 등록에 실패하였습니다.');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
}

// 프로필 이미지 업로드
async function uploadProfileImage() {
  const formData = new FormData();
  formData.append('id', form['profile-id'].value);
  formData.append('name', form['profile-name'].value);
  formData.append('position', form['profile-position'].value);
  formData.append('profileImage', imageInput.files[0]);

  const response = await fetch(
    'http://localhost:3000/member/uploadProfileImage',
    {
      method: 'POST',
      body: formData,
    },
  );
  if (!response.ok) {
    throw new Error('프로필 이미지 업로드에 실패하였습니다.');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
}

// 등록 폼 제출
async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    await registerMember();
    if (imageInput.files.length > 0) {
      await uploadProfileImage();
    }
    alert('회원가입에 성공하였습니다.');
    window.location.href = '/';
  } catch (error) {
    console.error(`에러가 발생했습니다: ${error.message}`);
    alert(error.message);
  }
}

// 이미지 선택 및 변경시 미리보기
function handleImageChange() {
  const file = imageInput.files[0];
  const previewImage = document.querySelector('.profile-image-preview');
  const profileUploadLabel = document.querySelector('.profile-upload-label');

  if (!file) {
    previewImage.style.display = 'none';
    profileUploadLabel.style.opacity = 1;
    return;
  }

  const imageUrl = URL.createObjectURL(file);
  previewImage.src = imageUrl;
  previewImage.style.display = 'block';
  profileUploadLabel.style.opacity = 0;
}

// 뒤로가기 버튼 클릭
function handleBackButtonClick(event) {
  event.preventDefault();
  window.location.href = '/';
}

imageInput.addEventListener('change', handleImageChange);
homeButton.addEventListener('click', handleBackButtonClick);
form.addEventListener('submit', handleFormSubmit);
