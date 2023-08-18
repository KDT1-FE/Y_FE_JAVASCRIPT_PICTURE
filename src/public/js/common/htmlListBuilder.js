import { handleTooltipClick } from './tooltip'
// import { handleupdateBtn } from './upadate'

export function buildHTMLList(member) {
  const membersRow = document.createElement('div')
  membersRow.className = 'members__row row'
  membersRow.setAttribute('data-id', member.id)

  // 이미지 요소 생성
  const membersCol = document.createElement('div')
  membersCol.className = 'members__image col'
  const membersColImg = document.createElement('div')
  membersColImg.className = 'members__image__wrap'
  const img = document.createElement('img')
  img.src = member.image // 이미지 URL 설정
  img.alt = member.name // 대체 텍스트 설정
  img.className = 'members-img'
  membersColImg.appendChild(img)

  // 인포 요소 생성
  const membersColInfo = document.createElement('div')
  membersColInfo.className = 'members__info col'
  const infoSpan = document.createElement('span')
  infoSpan.className = 'members__info__wrap'
  const nameSpan = document.createElement('span')
  nameSpan.className = 'members__info__name'
  nameSpan.textContent = member.name // 이름 설정
  const emailSpan = document.createElement('span')
  emailSpan.className = 'members__info__email'
  emailSpan.textContent = member.email // 이메일 설정
  membersColInfo.appendChild(infoSpan)
  infoSpan.appendChild(nameSpan)
  infoSpan.appendChild(emailSpan)

  // 포지션 요소 생성
  const membersColPosition = document.createElement('div')
  membersColPosition.className = 'members__position col'
  const positionSpan = document.createElement('span')
  positionSpan.className = 'members__position__txt'
  positionSpan.textContent = member.position // 포지션 설정
  membersColPosition.appendChild(positionSpan)

  // 팀 요소 생성
  const membersColTeam = document.createElement('div')
  membersColTeam.className = 'members__team col-auto'
  const teamSpan = document.createElement('span')
  teamSpan.className = 'members__team__txt'
  teamSpan.innerHTML = `<i class="fa-solid fa-bolt"></i> ${member.team}`
  membersColTeam.appendChild(teamSpan)

  // 이클립스 요소 생성 & 툴팁
  const membersColEllipsis = document.createElement('div')
  membersColEllipsis.className = 'members__ellipsis col-1'
  const tooltipSpan = document.createElement('span')
  tooltipSpan.className = 'members__ellipsis-btn tooltips'
  const ellipsisIcon = document.createElement('i')
  ellipsisIcon.className = 'fa-solid fa-ellipsis'
  const tooltipContent = document.createElement('span')
  tooltipContent.className = 'tooltipcontent'

  // 수정 버튼
  const button = document.createElement('button')
  button.type = 'button'
  button.id = 'openModal-btn'
  button.className = 'btn btn-sm btn-pink members__modal-btn update-btn tooltipitem'
  button.setAttribute('data-bs-toggle', 'modal')
  button.setAttribute('data-bs-target', '#editModal')
  button.innerHTML = '<i class="fa-solid fa-gear"></i>'
  const btnContainer = document.createElement('span')
  btnContainer.appendChild(button)
  const updateLink = document.createElement('a')
  updateLink.href = '#/update'
  updateLink.className = 'update-link'
  updateLink.appendChild(btnContainer)
  const updateTooltipItem = document.createElement('div')
  updateTooltipItem.className = 'update-btn tooltipitem'
  updateTooltipItem.appendChild(updateLink)

  // 제거 버튼
  const removeLink = document.createElement('a')
  removeLink.href = '#/remove'
  removeLink.className = 'remove-link'
  const removeIcon = document.createElement('i')
  removeIcon.className = 'fa-solid fa-trash-can'
  removeLink.appendChild(removeIcon)
  const removeTooltipItem = document.createElement('div')
  removeTooltipItem.className = 'remove-btn tooltipitem'
  removeTooltipItem.appendChild(removeLink)
  tooltipContent.appendChild(updateTooltipItem)
  tooltipContent.appendChild(removeTooltipItem)
  tooltipSpan.appendChild(ellipsisIcon)
  tooltipSpan.appendChild(tooltipContent)
  membersColEllipsis.appendChild(tooltipSpan)

  // 이클립스&툴팁 버튼 이벤트 리스너 등록
  handleTooltipClick()

  // 생성한 요소들을 구조에 추가
  membersRow.appendChild(membersCol)
  membersCol.appendChild(membersColImg)
  membersRow.appendChild(membersColInfo)
  membersRow.appendChild(membersColPosition)
  membersRow.appendChild(membersColTeam)
  membersRow.appendChild(membersColEllipsis)

  return membersRow
}
