import { db, doc, getDoc, ref, deleteDoc, deleteObject, storage } from '../firebase.js';

const queryString = new URLSearchParams(window.location.search);
export const docRef = doc(db, 'characters', queryString.get('id'));
const docSnap = await getDoc(docRef);
export const profileData = docSnap.data();

const $body = document.querySelector('body');
const $modalBackground = document.querySelector('.modal--background');
const $modify = document.querySelector('.button--modify');
const $delete = document.querySelector('.button--delete');

(function profile() {
  showProfile(profileData);
  drawUpdateModal(profileData);
  drawDeleteModal();
})();

function showProfile(profileData) {
  const $profileImage = document.querySelector('.profile__image');
  const $infoName = document.querySelector('.info__name');
  const $infoAppearance = document.querySelector('.info__appearance');
  const $infoInterests = document.querySelector('.info__interests');

  $profileImage.style.backgroundImage = `url(${profileData.image})`;
  $infoName.textContent = `이름 : ${profileData.name}`;
  $infoAppearance.textContent = `첫 등장 : ${profileData.appearance}`;
  $infoInterests.textContent = `좋아하는 것 : ${profileData.interests}`;
}

function drawUpdateModal(profileData) {
  $modify.addEventListener('click', () => {
    $modalBackground.classList.toggle('show');
    $body.style.overflow = 'hidden';

    document.querySelector('.update').innerHTML = `
    <div class="form-field">
      <label for="image" class="image peanuts">사진:</label>
      <input type="file" name="image" class="update--image update__input" />
    </div>
    <div class="form-field">
      <label for="name" class="peanuts">이름:</label>
      <input type="text" name="name" value="${profileData.name}" class="update__input" />
    </div>
    <div class="form-field">
      <label for="appearance" class="peanuts">첫 등장:</label>
      <input type="text" name="appearance" value="${profileData.appearance}" class="update__input" />
    </div>
    <div class="form-field">
      <label for="interests" class="peanuts">좋아하는 것:</label>
      <input type="text" name="interests" value="${profileData.interests}" class="update__input" />
    </div>
    <div class="form-field">
      <button class="button--save">저장</button>
      <button type="button" class="button--cancel">취소</button>
    </div>
    `;

    const $save = document.querySelector('.button--save');
    const $cancel = document.querySelector('.button--cancel');

    addToggleToButton($save);
    addToggleToButton($cancel);
    addToggleToModal();
  });
}

function drawDeleteModal() {
  $delete.addEventListener('click', () => {
    $modalBackground.classList.toggle('show');
    $body.style.overflow = 'hidden';

    document.querySelector('.update').innerHTML = `
      <div class="delete-field">
        <div class="message peanuts">삭제하시겠습니까?</div>
        <div class="message__button">
          <button type="button" class="button--yes">삭제</button>
          <button type="button" class="button--no">취소</button>
        </div>
      </div>
    `;

    const $yes = document.querySelector('.button--yes');
    const $no = document.querySelector('.button--no');

    addToggleToButton($yes);
    addToggleToButton($no);
    addToggleToModal();

    $yes.addEventListener('click', deleteData);
  });
}

function addToggleToButton($button) {
  $button.addEventListener('click', () => {
    $modalBackground.classList.toggle('show');
    $body.style.overflow = 'auto';
  });
}

function addToggleToModal() {
  $modalBackground.addEventListener('click', (event) => {
    if (event.target === $modalBackground) {
      $modalBackground.classList.toggle('show');
      $body.style.overflow = 'hidden';
    }
  });
}

async function deleteData() {
  const desertRef = ref(storage, `characters/${profileData.filename}`);
  await deleteObject(desertRef);
  await deleteDoc(docRef);

  window.location.replace('/index.html');
}
