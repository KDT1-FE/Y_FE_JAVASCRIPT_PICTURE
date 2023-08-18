function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/')
  }

  const routerView = document.querySelector('router-view')
  const [hash, queryString = ''] = location.hash.split('?')

  if (queryString !== '') {
      const query = queryString
      .split('&')
      .reduce((acc, cur) => {
        const [key,value] = cur.split('=')
        acc[key] = value
        return acc
    }, {})
    history.replaceState(query, '')
  }

  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  routerView.innerHTML = ''
  routerView.append(new currentRoute.component().el)

  window.scrollTo(0,0)
}
export function createRouter(routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}