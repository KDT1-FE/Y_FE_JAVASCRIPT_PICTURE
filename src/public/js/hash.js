const navigateTo = (url) => {
  history.pushState(null, null, url)
}

window.onload = () => {
  router()
  const membersRows = document.querySelectorAll('.members__row')
  console.log(membersRows)
  membersRows.forEach((row) => {
    row.addEventListener('click', (e) => {
      const memberId = row.getAttribute('data-id')
      const newHash = `#${memberId}`
      console.log(newHash)
      navigateTo(newHash)
    })
  })
}
