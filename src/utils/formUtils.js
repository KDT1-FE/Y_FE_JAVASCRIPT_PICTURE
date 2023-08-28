export function enableForm(inputEls, selectEl, fileEl) {
  inputEls.forEach((el) => {
    el.readOnly = false
    el.className = 'form-control forms'
  })
  selectEl.disabled = false
  selectEl.className = 'form-select forms'

  fileEl.disabled = false
}

export function disableForm(inputEls, selectEl, fileEl) {
  inputEls.forEach((el) => {
    el.readOnly = true
    el.className = 'form-control-plaintext forms'
  })
  selectEl.disabled = true
  selectEl.className = 'form-select-plaintext forms'

  fileEl.disabled = true
}
