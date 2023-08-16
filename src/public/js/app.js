/**
 * client-side entry points
 * routers
 */
import '../assets/styles/style.scss'
import Dashboard from '../views/Dashboard.js'
import Members from '../views/Members.js'
import Profile from '../views/Profile.js'

import * as bootstrap from 'bootstrap'
// import HomeApp from './homeApp.js';
// import membersApp from './membersApp.js';
// import profileApp from './profileApp.js';

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
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/members', view: Members },
    // { path: '/members/:id', view: Profile },
  ]

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

  const view = new match.route.view(getParams(match))

  document.querySelector('#app').innerHTML = await view.getHtml()

  // match.route.script();
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
