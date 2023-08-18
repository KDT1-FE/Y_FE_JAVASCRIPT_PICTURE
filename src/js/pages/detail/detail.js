// import loadData from './render.js';
import { getMember } from '../../firebase/firebase.js';
import loadData from './render.js';

const urlData = location.href.split('?')[1];
const $form = document.getElementById('detail-form');
const $editButton = document.getElementById('edit-button');

// $editButton.addEventListener('click', async e => {
//   e.preventDefault();

//   const receiveData = await getMember(urlData);

//   await loadData(receiveData);
// });

window.addEventListener('DOMContentLoaded', async e => {
  const receiveData = await getMember(urlData);

  loadData($form, receiveData);
});
