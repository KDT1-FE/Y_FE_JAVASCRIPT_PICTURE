const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const submitEl = document.querySelector('#submit');

submitEl.addEventListener('click', addOwner);

if (localStorage.getItem('owner')) {
  location.replace('main.html');
}

async function addOwner() {
  try {
    localStorage.setItem(
      'owner',
      JSON.stringify({
        id: new Date().getTime(),
        name: nameEl.value,
        email: emailEl.value,
        phone: phoneEl.value,
      })
    );
    location.reload();
  } catch {
    (err) => {
      console.log(err);
    };
  }
}
