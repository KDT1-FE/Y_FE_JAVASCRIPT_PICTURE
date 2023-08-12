import { createRouter } from '../core/core'
import Home from './Home'
import Champion from './Champion'

export default createRouter([
  { path: '#/',  component: Home},
  { path: '#/champion', component: Champion}
])