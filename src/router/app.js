import Members from '/src/views/members/Members.js'
import Teams from '/src/views/teams/Teams.js'
import Home from '/src/views/home/Home.js'
import { initHome } from '/src/views/home/home.controller.js'
import { initMembers } from '/src/views/members/members.controller.js'
import { initTeams } from '/src/views/teams/teams.controller.js'

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
    { path: '/members/:id', view: Members },
    { path: '/teams', view: Teams },
  ]

  const potentialMatches = routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    }
  })

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result != null)

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    }
  }

  const view = await new match.route.view(getParams(match))
  document.getElementById('app').innerHTML = await view.getHtml()

  const path = location.pathname
  if (path === '/') await initHome()
  if (path.includes('/members')) initMembers()
  if (path.includes('/teams')) initTeams()
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  router()
  document.getElementById('app').addEventListener('click', (e) => {
    if (!e.target.classList.contains('members__row')) {
      return
    }
    const memberEl = e.target
    const memberId = memberEl.dataset.id
    const newUrl = `/members/${memberId}`
    navigateTo(newUrl)
  })
})
