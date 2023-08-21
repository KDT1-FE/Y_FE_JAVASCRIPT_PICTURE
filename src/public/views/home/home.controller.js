import { downloadCollection } from '../../js/common/firebaseUtils'
import { miniDownloadCollection } from '../../js/common/minimembersDown'
import { initTeams } from '../teams/teams.controller'
import gsap from 'gsap'

import * as bootstrap from 'bootstrap'
import './home.scss'

export async function initHome() {
  await miniDownloadCollection()
  initTeams()

  // 각 이미지 요소를 선택합니다.
  const item1 = document.querySelector('.jumbotron__wrap__imgbox__item1')
  const item2 = document.querySelector('.jumbotron__wrap__imgbox__item2')
  const item3 = document.querySelector('.jumbotron__wrap__imgbox__item3')

  // GSAP 애니메이션을 설정합니다.
  gsap.from(item1, { y: 100, opacity: 0, duration: 1, delay: 0 })
  gsap.from(item2, { y: 100, opacity: 0, duration: 1, delay: 0.5 })
  gsap.from(item3, { y: 100, opacity: 0, duration: 1, delay: 1 })
}
