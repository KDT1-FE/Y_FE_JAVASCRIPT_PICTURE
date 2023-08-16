const init = () => {
  console.log('route');

  const course = document.querySelector('.course');
  course.addEventListener('click', () => {
    console.log('코스클릭');
  });
};

export default init;
