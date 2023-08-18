import { db, doc, getDoc, ref, deleteDoc, deleteObject, storage } from '../firebase.js';

let queryString = new URLSearchParams(window.location.search);
console.log(queryString.get('id'));

export const docRef = doc(db, 'characters', queryString.get('id'));
export const docSnap = await getDoc(docRef);
console.log(docSnap.data());

const $profileImage = document.querySelector('.profile__image');
const $infoName = document.querySelector('.info__name');
const $infoAppearance = document.querySelector('.info__appearance');
const $infoInterests = document.querySelector('.info__interests');

$profileImage.style.backgroundImage = `url(${docSnap.data().image})`;
$infoName.textContent = `이름 : ${docSnap.data().name}`;
$infoAppearance.textContent = `첫 등장 : ${docSnap.data().appearance}`;
$infoInterests.textContent = `좋아하는 것 : ${docSnap.data().interests}`;

const $body = document.querySelector('body');
const $modalBackground = document.querySelector('.modal--background');
const $modify = document.querySelector('.button--modify');
const $delete = document.querySelector('.button--delete');

$modify.addEventListener('click', () => {
  $modalBackground.classList.toggle('show');
  document.querySelector('.update').innerHTML = `
  <div class="form-field">
    <label for="image" class="image peanuts">사진:</label>
    <input type="file" name="image" class="update--image update__input" />
  </div>
  <div class="form-field">
    <label for="name" class="peanuts">이름:</label>
    <input type="text" name="name" value="${docSnap.data().name}" class="update__input" />
  </div>
  <div class="form-field">
    <label for="appearance" class="peanuts">첫 등장:</label>
    <input type="text" name="appearance" value="${docSnap.data().appearance}" class="update__input" />
  </div>
  <div class="form-field">
    <label for="interests" class="peanuts">좋아하는 것:</label>
    <input type="text" name="interests" value="${docSnap.data().interests}" class="update__input" />
  </div>
  <div class="form-field">
    <button class="button--save">저장</button>
    <button type="button" class="button--cancel">취소</button>
  </div>
  `;

  document.querySelector('.button--save').addEventListener('click', () => {
    $modalBackground.classList.toggle('show');
  });

  document.querySelector('.button--cancel').addEventListener('click', () => {
    $modalBackground.classList.toggle('show');
  });

  if ($modalBackground.classList.contains('show')) {
    $body.style.overflow = 'hidden';
  }
});

$delete.addEventListener('click', () => {
  $modalBackground.classList.toggle('show');

  document.querySelector('.update').innerHTML = `
    <div class="delete-field">
      <div class="message peanuts">삭제하시겠습니까?</div>
      <div class="message__button">
        <button type="button" class="button--yes">삭제</button>
        <button type="button" class="button--no">취소</button>
      </div>
    </div>

  `;

  document.querySelector('.button--yes').addEventListener('click', () => {
    $modalBackground.classList.toggle('show');

    const desertRef = ref(storage, `characters/${docSnap.data().filename}`);
    deleteObject(desertRef).then(() => {
      console.log('Delete successfully');
    });

    deleteDoc(docRef).then(() => {
      console.log('Delete successfully');
      window.location.replace('/index.html');
    });
  });

  document.querySelector('.button--no').addEventListener('click', () => {
    $modalBackground.classList.toggle('show');
  });

  if ($modalBackground.classList.contains('show')) {
    $body.style.overflow = 'hidden';
  }
});

$modalBackground.addEventListener('click', (event) => {
  if (event.target === $modalBackground) {
    $modalBackground.classList.toggle('show');

    if (!$modalBackground.classList.contains('show')) {
      $body.style.overflow = 'auto';
    }
  }
});
