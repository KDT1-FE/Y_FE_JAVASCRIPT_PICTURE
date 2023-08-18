const elements = document.querySelectorAll('.item')

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    console.log(entry) // entry is 'IntersectionObserverEntry'
  })
}, options)

io.observe(elements) // 관찰할 대상(요소) 등록