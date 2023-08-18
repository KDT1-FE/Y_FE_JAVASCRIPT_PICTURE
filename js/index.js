const $body = document.querySelector('body');
const $modalBackground = document.querySelector('.modal--background');
const $add = document.querySelector('.button--add');
const $upload = document.querySelector('.upload');
const $enroll = document.querySelector('.button--enroll');
const $cancel = document.querySelector('.button--cancel');

window.addEventListener('scroll', () => {
  const $scrollY = window.scrollY;
  console.log($scrollY);
  $modalBackground.style.top = `${$scrollY}px`;
});

$add.addEventListener('click', () => {
  $modalBackground.classList.toggle('show');

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

$enroll.addEventListener('click', () => {
  $modalBackground.classList.toggle('show');
  $body.style.overflow = 'auto';
});

$cancel.addEventListener('click', () => {
  $modalBackground.classList.toggle('show');
  $body.style.overflow = 'auto';
  $upload.reset();
});
