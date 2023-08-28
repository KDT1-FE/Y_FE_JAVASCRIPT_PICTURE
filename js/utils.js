// toast message
export function showToast(message) {
    const toast = document.querySelector('.toast-wrap');
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
  
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2000);
}
  

// 로딩 애니메이션
export function showLoadingAnimation() {
    const loadingAnimation = document.querySelector('.loading-animation');
    loadingAnimation.style.display = 'block';
}
  
export function hideLoadingAnimation() {
    const loadingAnimation = document.querySelector('.loading-animation');
    loadingAnimation.style.display = 'none';
}
  