import { firstBuildImg, buildImg, deleteImg } from './firestore.js';

const screen = document.querySelector('.screen-wrap');
const formBtnEl = document.querySelector('#form-btn');
const deleteBtnEl = document.querySelector('#delete-btn');
const listBox = document.querySelector('.list');
const list = listBox.querySelector('.list-main');
const information = document.querySelector('.information');
const wall = document.querySelector('.wall');
const formExitBtn = document.querySelector('#form-exit');
const submit = document.querySelector('#submit');
const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const allCheckEl = document.querySelector('#all-check');
const employees = document.querySelector('.owner-employees');
let peoples = [];
let hadPeoples = localStorage.length - 1;

formBtnEl.addEventListener('click', () => {
  screen.classList.add('click-x');
  changeVisible(information);
  changeVisible(wall);
});
deleteBtnEl.addEventListener('click', deletePeopleEl);
wall.addEventListener('click', () => {
  screen.classList.remove('click-x');
  changeHidden(information);
  changeHidden(wall);
});
formExitBtn.addEventListener('click', () => {
  screen.classList.remove('click-x');
  changeHidden(information);
  changeHidden(wall);
});
information.addEventListener('click', function (event) {
  event.stopPropagation();
});
submit.addEventListener('click', () => {
  if (!localStorage.getItem(nameEl.value)) {
    addNewPeople(nameEl, emailEl, phoneEl);
    screen.classList.remove('click-x');
    changeHidden(information);
    changeHidden(wall);
  } else {
    alert('이미 존재하는 이름입니다.');
  }
});
allCheckEl.addEventListener('change', allCheck);

function addNewPeople(name, email, phone) {
  const people = {
    id: new Date().getTime(),
    img: '',
    name: name.value,
    email: email.value,
    phone: phone.value,
    check: false,
  };
  localStorage.setItem(
    name.value,
    JSON.stringify({
      id: people.id,
      name: name.value,
      email: email.value,
      phone: phone.value,
    })
  );
  firstBuildImg(people.name, people.id);
  name.value = '';
  email.value = '';
  phone.value = '';
  peoples.unshift(people);
  const itemEl = addPeopleEl(people);
  console.log(peoples);
  list.append(itemEl);
  addHadPeoples();
  blink();
}

function addPeopleEl(people) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  const checkImg = document.createElement('div');
  checkImg.classList.add('checkbox-img-wrap');

  const textEl = document.createElement('div');
  textEl.classList.add('people-text');

  const checkbox = document.createElement('input');
  checkbox.classList.add('check-box');
  checkbox.type = 'checkbox';
  checkbox.checked = people.check;

  const peopleImg = document.createElement('img');
  peopleImg.classList.add('people-img', people.id);
  const peopleName = document.createElement('div');
  peopleName.classList.add('name', 'text');
  peopleName.innerHTML = people.name;
  const peopleEmail = document.createElement('div');
  peopleEmail.classList.add('emaie', 'text');
  peopleEmail.innerHTML = people.email;
  const peoplePhone = document.createElement('div');
  peoplePhone.classList.add('phone', 'text');
  peoplePhone.innerHTML = people.phone;

  checkbox.addEventListener('change', () => {
    peoples.forEach((e) => {
      if (e.id === people.id) {
        e.check = checkbox.checked;
      }
    });
  });

  itemEl.append(checkImg);
  itemEl.append(textEl);
  checkImg.append(checkbox);
  checkImg.append(peopleImg);
  textEl.append(peopleName);
  textEl.append(peopleEmail);
  textEl.append(peoplePhone);

  return itemEl;
}

function deletePeopleEl() {
  peoples.forEach((e) => {
    localStorage.removeItem(e.name);
    deleteImg(e.name);
  });
  peoples = peoples.filter((e) => e.check === false);
  for (let i = list.childNodes.length - 1; i >= 0; i--) {
    const e = list.childNodes[i];
    if (e.querySelector('input').checked === true) {
      e.remove();
      addHadPeoples();
    }
  }
  allCheckEl.checked = false;
  blink();
}

function changeVisible(item) {
  item.classList.remove('hidden');
  item.classList.add('visible');
}
function changeHidden(item) {
  item.classList.add('hidden');
  item.classList.remove('visible');
}

function buildList() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === 'owner') {
      console.log(
        `${JSON.parse(localStorage.getItem('owner')).name}님이 접속하셨습니다.`
      );
    } else {
      const a = JSON.parse(localStorage.getItem(localStorage.key(i)));
      buildPeoples(a);
    }
  }
  addHadPeoples();
}

async function buildPeoples(item) {
  const people = {
    id: item.id,
    img: '',
    name: item.name,
    email: item.email,
    phone: item.phone,
    check: false,
  };
  peoples.unshift(people);
  const itemEl = addPeopleEl(people);
  list.append(itemEl);
  await buildImg(people.name, people.id);
}

buildList();

function allCheck(event) {
  peoples.forEach((e) => {
    e.check = event.target.checked;
  });
  const checkBox = document.querySelectorAll('.check-box');
  checkBox.forEach((e) => {
    e.checked = event.target.checked;
  });
}

function addHadPeoples() {
  hadPeoples = localStorage.length - 1;
  console.log(`현재 직원 수 = ${hadPeoples}`);
  employees.innerHTML = `직원: ${hadPeoples}`;
}

function blink() {
  employees.classList.add('blink');
  setTimeout(() => {
    employees.classList.remove('blink');
  }, 1000);
}

function ownerProfile() {
  const name = document.querySelector('#owner-name');
  const email = document.querySelector('#owner-email');
  const phone = document.querySelector('#owner-phone');
  const owner = JSON.parse(localStorage.getItem('owner'));
  name.innerHTML = owner.name;
  email.innerHTML = owner.email;
  phone.innerHTML = owner.phone;
}
ownerProfile();
