import { colRef, getDocs } from '../firebase.js';

getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const $character = document.createElement('a');
      $character.href = `/profile.html?id=${doc.id}`;
      $character.classList.add('character', 'sketchy');

      const $character__thumbnail = document.createElement('div');
      $character__thumbnail.classList.add('character__thumbnail', 'handy');
      $character__thumbnail.style.backgroundImage = `url(${doc.data().image})`;
      $character__thumbnail.style.backgroundSize = 'cover';
      $character__thumbnail.style.backgroundRepeat = 'no-repeat';
      $character__thumbnail.style.backgroundposition = 'right bottom';

      const $character__name = document.createElement('div');
      $character__name.classList.add('character__name', 'peanuts');
      $character__name.textContent = doc.data().name;

      $character.append($character__thumbnail);
      $character.append($character__name);

      document.querySelector('.character-list').append($character);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
