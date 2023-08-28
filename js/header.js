// 스크롤하면 헤더에 그림자 추가
const throttle = (callback, delayTime) => {
  let timerId;

  return () => {
    if (timerId) return;

    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, delayTime);
  };
};

const throttleCallback = () => {
  const headerContainer = document.querySelector('.header-container');
  window.scrollY
    ? headerContainer.classList.add('shadow')
    : headerContainer.classList.remove('shadow');
};

window.addEventListener('scroll', throttle(throttleCallback, 300));
