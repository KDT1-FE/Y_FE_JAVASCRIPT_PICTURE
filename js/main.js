import app from './firebase.js';

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

let peoples = [];

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
  addNewPeople(nameEl, emailEl, phoneEl);
  screen.classList.remove('click-x');
  changeHidden(information);
  changeHidden(wall);
});

function addNewPeople(name, email, phone) {
  const people = {
    id: new Date().getTime(),
    img: '',
    name: `${name.value}`,
    email: `${email.value}`,
    phone: `${phone.value}`,
    check: false,
  };
  name.value = '';
  email.value = '';
  phone.value = '';
  peoples.unshift(people);
  const itemEl = addPeopleEl(people);
  console.log(peoples);
  list.append(itemEl);
}

function addPeopleEl(people) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = people.check;

  const peopleName = document.createElement('div');
  peopleName.classList.add('name');
  const peopleEmail = document.createElement('div');
  peopleEmail.classList.add('email');
  const peoplePhone = document.createElement('div');
  peoplePhone.classList.add('phone');

  checkbox.addEventListener('change', () => {
    peoples.forEach((e) => {
      if (e.id === people.id) {
        e.check = checkbox.checked;
      }
    });
  });

  itemEl.append(checkbox);
  itemEl.append(peopleName);
  itemEl.append(peopleEmail);
  itemEl.append(peoplePhone);

  return itemEl;
}

function deletePeopleEl() {
  peoples = peoples.filter((e) => e.check === false);
  for (let i = list.childNodes.length - 1; i >= 0; i--) {
    const e = list.childNodes[i];
    if (e.querySelector('input').checked === true) {
      e.remove();
    }
  }
}

function changeVisible(item) {
  item.classList.remove('hidden');
  item.classList.add('visible');
}
function changeHidden(item) {
  item.classList.add('hidden');
  item.classList.remove('visible');
}

const aaap = app;
console.log(aaap);
