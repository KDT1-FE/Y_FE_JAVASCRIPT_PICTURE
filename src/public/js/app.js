import '../assets/styles/main.scss'
import Home from '../views/Home.js'
import Members from '../views/Members'
import { initMembers } from './members.controller.js'
import * as bootstrap from 'bootstrap'

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

// const loadView = async (viewPath, match) => {
//   console.log(`Loading view from: ../views/${viewPath}.js`)
//   const { default: View } = await import(`../views/${viewPath}.js`)
//   const viewInstance = new View(getParams(match))

//   // await viewInstance.init()
//   // console.log('View initialized')
//   return viewInstance
// }

const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/members', view: Members },
    // { path: '/members/:id', view: 'Profile' },
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

  const view = await new match.route.view(getParams(match))
  document.querySelector('#app').innerHTML = await view.getHtml()

  const path = location.pathname
  if (path === '/') {
    // HomeApp()
  }
  if (path.includes('/members')) {
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
