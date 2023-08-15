const form = document.getElementById('memberForm');
const imageInput = document.getElementById('profileImage');
const profileList = document.querySelector('.profile-list');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);

  registerMember(formData)
    .then((data) => {
      console.log('success!!!!', data);
      createProfileElement(data);
      alert(data.message);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function registerMember(formData) {
  try {
    const response = await fetch('http://localhost:3000/member/register', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function createProfileElement(data) {
  const profileEl = document.createElement('div');
  profileEl.classList.add('profile');

  const profileIdEl = createProfileInfoElement('ID', data.member.id);
  const profileNameEl = createProfileInfoElement('Name', data.member.name);
  const profileEmailEl = createProfileInfoElement('Email', data.member.email);
  const profilePositionEl = createProfileInfoElement(
    'Position',
    getPositionLabel(data.member.position),
  );
  const profileImageEl = document.createElement('img');
  const deleteButton = createDeleteButton(data);

  profileImageEl.src = data.profileImage.imgUrl;

  profileEl.appendChild(profileIdEl);
  profileEl.appendChild(profileNameEl);
  profileEl.appendChild(profileEmailEl);
  profileEl.appendChild(profilePositionEl);
  profileEl.appendChild(profileImageEl);
  profileEl.appendChild(deleteButton);

  profileList.appendChild(profileEl);
}

function getPositionLabel(positionValue) {
  const positionSelect = document.getElementById('position');
  const selectedOption = [...positionSelect.options].find(
    (option) => option.value === positionValue,
  );
  return selectedOption ? selectedOption.textContent : 'Unknown';
}

function createProfileInfoElement(label, text) {
  const element = document.createElement('span');
  element.textContent = `${label}: ${text}`;
  return element;
}

function createDeleteButton(data) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', async () => {
    try {
      /* const deleteResponse = await deleteMember(data.member.id);

      if (deleteResponse.ok) {
        deleteImageFromS3(data.profileImage.imgKey);
        deleteButton.parentElement.remove();
      } */

      deleteImageFromS3(data.profileImage.imgKey);
      // deleteButton.parentElement.remove();
    } catch (error) {
      console.error(error);
    }
  });

  return deleteButton;
}

async function deleteMember(id) {
  try {
    const response = await fetch(`http://localhost:3000/deleteMember`, {
      method: 'POST',
      body: JSON.stringify({ id }),
    });

    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteImageFromS3(imgKey) {
  console.log(imgKey);
  if (imgKey) {
    try {
      const deleteS3Response = await fetch(
        'http://localhost:3000/deleteImage',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imgKey }),
        },
      );

      alert(deleteS3Response.message);
    } catch (error) {
      console.error('Error deleting image from S3', error);
    }
  }
}

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  const imageUrl = URL.createObjectURL(file);
  const previewImage = document.querySelector('#previewImage');
  previewImage.src = imageUrl;
  previewImage.style.display = 'block';
});
