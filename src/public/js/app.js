import Members from '/src/public/views/members/Members.js'
import Teams from '/src/public/views/teams/Teams.js'
import Home from '/src/public/views/home/Home.js'
import { initHome } from '/src/public/views/home/home.controller.js'
import { initMembers } from '/src/public/views/members/members.controller.js'
import { initTeams } from '/src/public/views/teams/teams.controller.js'

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
    { path: '/', view: Home },
    { path: '/members', view: Members },
    { path: '/teams', view: Teams },
  ]

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    }
  })

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null)

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    }
  }

  const view = await new match.route.view(getParams(match))
  document.querySelector('#app').innerHTML = await view.getHtml()

  // const path = location.pathname
  // if (path === '/') {
  //   initMembers()
  // } else if (path === '/members') {
  //   initMembers()
  // } else if (path === '/teams') {
  //   initTeams()
  // }

  const path = location.pathname
  if (path === '/') initHome()
  if (path.includes('/members')) initMembers()
  if (path.includes('/teams')) initTeams()
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
