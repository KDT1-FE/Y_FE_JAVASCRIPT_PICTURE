const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in')
      observer.unobserve(entry.target)
    }
  })
}, options)

export function lazyLoad() {
  const lazyLoadImages = document.querySelectorAll('.lazy-load')
  lazyLoadImages.forEach((img) => {
    observer.observe(img)
  })
}
