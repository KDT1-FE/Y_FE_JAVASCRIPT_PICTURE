import { firstBuildImg, buildImg, deleteImg } from './firestore.js';

const people = JSON.parse(localStorage.getItem('profile'));
const mainInner = document.querySelector('.main');
const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const editBtn = document.querySelector('#submit');
const returnBtn = document.querySelector('#return');

let pData = JSON.parse(localStorage.getItem('profile'));
console.log(pData);
const profileEl = buildProfile(people);
mainInner.append(profileEl);

function buildProfile(people) {
  const profileEl = document.createElement('div');
  profileEl.classList.add('profile', people.id);

  const textEl = document.createElement('div');
  textEl.classList.add('people-text');

  const peopleImg = document.createElement('img');
  peopleImg.classList.add('people-img', people.id);
  const peopleName = document.createElement('div');
  peopleName.classList.add('name', 'text');
  peopleName.innerHTML = people.name;
  const peopleEmail = document.createElement('div');
  peopleEmail.classList.add('email', 'text');
  peopleEmail.innerHTML = people.email;
  const peoplePhone = document.createElement('div');
  peoplePhone.classList.add('phone', 'text');
  peoplePhone.innerHTML = people.phone;

  profileEl.append(peopleImg);
  profileEl.append(textEl);
  textEl.append(peopleName);
  textEl.append(peopleEmail);
  textEl.append(peoplePhone);

  buildImg(people.name, people.id, people.type);

  nameEl.value = pData.name;
  emailEl.value = pData.email;
  phoneEl.value = pData.phone;
  return profileEl;
}

editBtn.addEventListener('click', editProfile);

function editProfile() {
  if (document.querySelector('#file').files[0]) {
    deleteImg(pData.name, pData.type);
    localStorage.removeItem(pData.name);
    localStorage.setItem(
      'profile',
      JSON.stringify({
        id: pData.id,
        name: nameEl.value,
        email: emailEl.value,
        phone: phoneEl.value,
        type: 'add',
      })
    );
    localStorage.setItem(
      nameEl.value,
      JSON.stringify({
        id: pData.id,
        name: nameEl.value,
        email: emailEl.value,
        phone: phoneEl.value,
        type: 'add',
      })
    );
    pData = JSON.parse(localStorage.getItem('profile'));
    const peopleName = document.querySelector('.name');
    peopleName.innerHTML = pData.name;
    peopleName.classList.add('blink');
    const peopleEmail = document.querySelector('.email');
    peopleEmail.innerHTML = pData.email;
    peopleEmail.classList.add('blink');
    const peoplePhone = document.querySelector('.phone');
    peoplePhone.innerHTML = pData.phone;
    peoplePhone.classList.add('blink');
    setTimeout(() => {
      peopleName.classList.remove('blink');
      peopleEmail.classList.remove('blink');
      peoplePhone.classList.remove('blink');
    }, 1000);
    firstBuildImg(pData.name, pData.id);
  } else {
    alert('이름과 이미지파일을 동시에 수정하셔야 합니다!');
  }
}

returnBtn.addEventListener('click', () => {
  location.href = 'main.html';
});
