export function formValidation(formsSelector, callback) {
  const forms = document.querySelectorAll(formsSelector)

  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      let isValid = true
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        isValid = false
      }
      console.log('검사진행완료!')
      form.classList.add('was-validated')
      callback(isValid)
    })
  })
}
