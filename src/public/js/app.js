import Members from '/src/public/views/members/Members.js'
import { initMembers } from '/src/public/views/members/members.controller.js'

const pathToRegex = (path) => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$')

const getParams = (match) => {
  const values = match.result.slice(1)

  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1])
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]]
    })
  )
}

const navigateTo = (url) => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  const routes = [{ path: '/', view: Members }]

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    }
  })

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null)

  // route에 정의된 곳으로 이동하지 않는다면 기본값으로 되돌린다.
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    }
  }

  const view = await new match.route.view(getParams(match))
  document.querySelector('#app').innerHTML = await view.getHtml()

  const path = location.pathname
  if (path === '/') {
    initMembers()
  }
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()
      navigateTo(e.target.href)
    }
  })

  router()
})
