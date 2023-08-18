document.addEventListener('DOMContentLoaded', () => {
  let isImageDeleted = false;
  // URL에서 회원 ID 가져오기
  const memberId = window.location.pathname.split('/').pop();
  const form = document.querySelector('.profile-form');
  const profileImageInput = document.getElementById('profile-image-input');
  const deleteBtn = document.querySelector('.profile-actions__btn--delete');
  const imageDeleteBtn = document.querySelector('.image-delete-btn');
  const backBtn = document.querySelector('.profile-actions__btn--back');

  // 회원 정보 가져오기
  fetch(`/member/getMemberInfo/${memberId}`)
    .then((response) => response.json())
    .then((data) => {
      bindMemberInfo(data.member);
    })
    .catch((error) => {
      console.error('Error fetching member info:', error);
    });

  // 회원 삭제 버튼 이벤트
  deleteBtn.addEventListener('click', (event) => {
    event.preventDefault();
    deleteMember(memberId);
  });

  // 프로필 이미지 교체
  profileImageInput.addEventListener('change', () => {
    const file = profileImageInput.files[0];

    if (file) {
      const reader = new FileReader();
      document.querySelector('.profile-upload-label').style.display = 'none';
      reader.onload = (e) => {
        document.querySelector('.profile-image-preview').src = e.target.result;
        document.querySelector('.profile-image-preview').style.display =
          'initial';
      };
      reader.readAsDataURL(file);
    }
  });

  // 프로필 이미지 삭제
  imageDeleteBtn.addEventListener('click', (event) => {
    event.preventDefault();

    document.querySelector('.profile-image-preview').style.display = 'none';
    document.getElementById('profile-image-input').value = '';
    document.querySelector('.profile-upload-label').style.display = 'flex';

    // 이미지 삭제 플래그
    isImageDeleted = true;
  });

  // 회원 정보 수정
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', form['profile-id'].value);
    formData.append('name', form['profile-name'].value);
    formData.append('position', form['profile-position'].value);
    formData.append('isProfileImageDeleted', isImageDeleted);

    if (profileImageInput.files.length > 0) {
      // 1. S3 업로드 후 url 받아오기
      // 2. 기존 image url과 비교 후 삭제
      // 3. 새로운 image url로 업데이
      formData.append('profileImage', profileImageInput.files[0]);
      uploadS3andEditMember(formData);
    } else {
      editMember(formData);
    }
  });

  // 돌아가기 버튼 이벤트
  backBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/';
  });
});

// 회원 정보 바인딩
function bindMemberInfo(data) {
  document.querySelector('.profile-image-preview').src =
    data.profileimageurl || '/asset/image/no-profile-image.png';
  document.getElementById('profile-id').value = data.id;
  document.getElementById('profile-name').value = data.name;
  document.getElementById('profile-position').value = data.position;
}

// 회원 삭제
function deleteMember(memberId) {
  // eslint-disable-next-line no-restricted-globals
  if (confirm('정말로 회원을 삭제하시겠습니까?')) {
    fetch(`/member/deleteMember/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('회원이 삭제되었습니다.');
          window.location.href = '/';
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      });
  }
}

// s3 업로드 & 회원 정보 수정
function uploadS3andEditMember(formData) {
  fetch('/member/uploadS3andEditMember', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      alert('회원 정보가 수정되었습니다.');
      window.location.href = '/';
    } else {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });
}

// 회원 정보만 수정
function editMember(formData) {
  fetch('/member/editMember', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      alert('회원 정보가 수정되었습니다.');
      window.location.href = '/';
    } else {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });
}
