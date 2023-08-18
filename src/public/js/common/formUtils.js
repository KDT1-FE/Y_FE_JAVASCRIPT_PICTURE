export function enableForm(inputEls, selectEl, fileEl) {
  inputEls.forEach((el) => {
    el.removeAttribute('readonly')
    el.className = 'form-control'
  })

  selectEl.removeAttribute('disabled')
  selectEl.className = 'form-select'

  fileEl.removeAttribute('disabled')
}

export function readonlyForm(inputEls, selectEl, fileEl) {
  inputEls.forEach((el) => {
    el.setAttribute('readonly', '')
    el.className = 'form-control-plaintext readonly'
  })

  selectEl.setAttribute('disabled', '')
  selectEl.className = 'form-select-plaintext'

  fileEl.setAttribute('disabled', '')
}
