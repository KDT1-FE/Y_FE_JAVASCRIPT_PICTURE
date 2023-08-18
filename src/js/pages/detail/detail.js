import { getMember, addData, uploadImage } from '../../firebase/firebase.js';
import { loadData, editMode } from './render.js';

const urlData = location.href.split('?')[1];
const $form = document.getElementById('detail-form');
const $editButton = document.getElementById('edit-button');
const $editComplete = document.getElementById('edit-complete');

window.addEventListener('DOMContentLoaded', async e => {
  const receiveData = await getMember(urlData);

  await loadData($form, receiveData);
});

$editButton.addEventListener('click', async e => {
  e.preventDefault();

  const receiveData = await getMember(urlData);

  $editComplete.classList.remove('hidden');
  await editMode($form, receiveData);
});

$editComplete.addEventListener('click', async e => {
  e.preventDefault();

  const $profileImage = document.getElementById('profile-image');
  const receiveData = await getMember(urlData);
  const profileUrl = await uploadImage($form.email.value, $profileImage.files[0]);
  console.log($profileImage);

  await addData($form.person.value, $form.email.value, $form.contact.value, $form.division.value, profileUrl);

  location.replace(`detail.html?${$form.email.value}`);
});
