export function formValidation(formsSelector, callback) {
  const forms = document.querySelectorAll(formsSelector)

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      const isValid = form.checkValidity()
      if (!isValid) {
        event.preventDefault()
        event.stopPropagation()
      }
      console.log(isValid)

      form.classList.add('was-validated')
      callback(isValid)
    })
  })
}
