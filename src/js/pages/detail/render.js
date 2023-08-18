// import { uploadImage } from '../../firebase/firebase';

const loadData = async ($form, data) => {
  const $profileImage = document.getElementById('profile-image');

  $profileImage.src = data.profileUrl;
  $form.person.value = data.person;
  $form.email.value = data.email;
  $form.contact.value = data.contact;
  $form.division.value = data.division;
};

const editMode = async ($form, data) => {
  const $profileImage = document.getElementById('profile-image');

  $profileImage.type = 'file';
  $profileImage.style.background = `url(${data.profileUrl}) no-repeat`;
  $profileImage.style.backgroundSize = 'cover';
  // $profileImage.style.border = '1px solid red';

  $profileImage.addEventListener('change', async e => {
    const newFile = $profileImage.files[0];
    const fileUrl = URL.createObjectURL(newFile);

    $profileImage.style.background = `url(${fileUrl})`;
    $profileImage.style.backgroundSize = 'cover';
  });

  $form.person.disabled = false;
  $form.email.disabled = false;
  $form.contact.disabled = false;
  $form.division.disabled = false;
};

export { loadData, editMode };
