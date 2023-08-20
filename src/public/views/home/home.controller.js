import { downloadCollection } from '../../js/common/firebaseUtils'
import { initTeams } from '../teams/teams.controller'

import * as bootstrap from 'bootstrap'
import './home.scss'

export function initHome() {
  downloadCollection()
  initTeams()
}
