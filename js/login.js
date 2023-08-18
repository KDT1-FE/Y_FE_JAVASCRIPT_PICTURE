const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const submitEl = document.querySelector('#submit');

submitEl.addEventListener('click', addOwner);

// 이미 등록된 경우 main 페이지로 이동
if (localStorage.getItem('owner')) {
  location.replace('main.html');
}

// 등록 및 기본직원 데이터 생성
function addOwner() {
  localStorage.setItem(
    'owner',
    JSON.stringify({
      id: new Date().getTime(),
      name: nameEl.value,
      email: emailEl.value,
      phone: phoneEl.value,
    })
  );
  localStorage.setItem(
    '김한식',
    JSON.stringify({
      id: 1,
      type: 'defalt',
      name: '김한식',
      email: '1111@gmail.com',
      phone: '01011111111',
    })
  );
  localStorage.setItem(
    '김이랑',
    JSON.stringify({
      id: 2,
      type: 'defalt',
      name: '김이랑',
      email: '2222@gmail.com',
      phone: '01022222222',
    })
  );
  localStorage.setItem(
    '김삼식',
    JSON.stringify({
      id: 3,
      type: 'defalt',
      name: '김삼식',
      email: '3333@gmail.com',
      phone: '01033333333',
    })
  );
  localStorage.setItem(
    '김사랑',
    JSON.stringify({
      id: 4,
      type: 'defalt',
      name: '김사랑',
      email: '4444@gmail.com',
      phone: '01044444444',
    })
  );
  location.reload();
}
