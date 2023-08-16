const init = () => {
  console.log('course');
  const course = document.querySelector('.dashboard');
  course.addEventListener('click', () => {
    console.log('대쉬보드클릭');
  });
};

export default init;
