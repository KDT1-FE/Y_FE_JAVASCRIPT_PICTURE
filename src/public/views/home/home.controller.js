const init = () => {
  console.log('home')

  const course = document.querySelector('.container')
  course.addEventListener('click', () => {
    console.log('헤더클릭')
  })
}

export default init
