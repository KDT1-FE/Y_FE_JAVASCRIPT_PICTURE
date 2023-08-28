const loadingEl = document.querySelector('.loading');

function showLoading() {
    loadingEl.classList.remove('hide');
}

function hideLoading() {
    loadingEl.classList.add('hide');
}

export { showLoading, hideLoading };
