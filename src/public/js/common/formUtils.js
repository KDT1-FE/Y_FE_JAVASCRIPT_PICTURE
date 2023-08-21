export function enableForm(inputEls, selectEl, fileEl) {
  inputEls.forEach((el) => {
    el.removeAttribute('readonly')
    el.className = 'form-control forms'
  })
  selectEl.removeAttribute('disabled')
  selectEl.className = 'form-select forms'

  fileEl.removeAttribute('disabled')
}

export function readonlyForm(inputEls, selectEl, fileEl) {
  inputEls.forEach((el) => {
    el.setAttribute('readonly', '')
    console.log(selectEl)
    el.className = 'form-control-plaintext forms'
  })

  selectEl.setAttribute('disabled', '')
  selectEl.className = 'form-select-plaintext forms'

  fileEl.setAttribute('disabled', '')
}
