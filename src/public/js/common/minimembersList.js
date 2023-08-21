export function miniMemberList(member) {
  const membersRow = document.createElement('div')
  membersRow.className = 'members__row row lazy-load'
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

  // 감싸는 요소
  const membersColWrap = document.createElement('div')
  membersColWrap.className = 'members__item__wrap col'
  const membersSpacer = document.createElement('div')
  membersSpacer.className = 'members__spacer col '
  membersColWrap.appendChild(membersColPosition)
  membersColWrap.appendChild(membersColTeam)
  membersColWrap.appendChild(membersSpacer)

  // 생성한 요소들을 구조에 추가
  membersRow.appendChild(membersCol)
  membersCol.appendChild(membersColImg)
  membersRow.appendChild(membersColInfo)
  membersRow.appendChild(membersColWrap)

  return membersRow
}
