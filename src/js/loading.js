function loading() {
  const div = document.createElement('div');
  div.id = 'loading';
  div.innerHTML = `<div class="dot-spinner"><div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div></div>`;
  const body = document.querySelector('body');
  body.appendChild(div);
}

function hideLoading() {
  const loading = document.getElementById('loading');
  loading.remove();
}

export { loading, hideLoading };
