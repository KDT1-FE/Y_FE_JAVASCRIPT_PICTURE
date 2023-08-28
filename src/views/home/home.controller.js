import { downloadCollection } from '../../utils/firebaseUtils'
import { miniDownloadCollection } from './minimembersDown'
import { initTeams } from '../teams/teams.controller'
import gsap from 'gsap'

import * as bootstrap from 'bootstrap'
import './home.scss'

export async function initHome() {
  await miniDownloadCollection()
  initTeams()
  const headerContainer = document.querySelector('.header__container')
  headerContainer.style.setProperty('--import-bg-color', 'rgb(147, 255, 255, 0.8117647059)')

  const item1 = document.querySelector('.jumbotron__wrap__imgbox__item1')
  const item2 = document.querySelector('.jumbotron__wrap__imgbox__item2')
  const item3 = document.querySelector('.jumbotron__wrap__imgbox__item3')

  gsap.from(item1, { y: 100, opacity: 0, duration: 1, delay: 0 })
  gsap.from(item2, { y: 100, opacity: 0, duration: 1, delay: 0.5 })
  gsap.from(item3, { y: 100, opacity: 0, duration: 1, delay: 1 })
}
