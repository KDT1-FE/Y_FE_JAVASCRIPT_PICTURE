import './common/firebase'
import { initializeDownload } from './common/download'
import './common/FormData'
import './common/htmlListBuilder'
import './common/tooltip'
import './common/removeDB'

import '../assets/styles/members.scss'

const init = () => {
  initializeDownload()
}

export default init
