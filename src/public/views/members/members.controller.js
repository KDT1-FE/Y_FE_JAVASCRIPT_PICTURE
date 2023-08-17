import '../../js/common/firebase'
import '../../js/common/tooltip'
import '../../js/common/removeDB'
import '../../js/common/FormData'
import '../../js/common/htmlListBuilder'
import { initDownload } from '../../js/common/download'
import '../../js/common/previewimg'
import '../../js/common/validation'
import { initModal } from '../../js/common/modal'
import { initUpload } from '../../js/common/upload'
import './members.scss'

export async function initMembers() {
  initDownload()
  initModal()
  initUpload()
}
