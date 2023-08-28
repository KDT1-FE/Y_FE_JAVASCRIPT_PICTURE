export function createTeamCard(team) {
  const card = document.createElement('div')
  const randomImageURL = `https://source.unsplash.com/collection/11649432/${Math.random()}`
  card.className = 'teams__col col'
  card.innerHTML = `
  <div class="teams__card card lazy-load">
    <img class="teams__card__bg-img" src="${randomImageURL}" alt="${team.teamName} Background">
    <div class="teams__card__content pb-3 text-shadow-1">
      <h3 class="teams__card__title">${team.teamName}</h3>
      <ul class="teams__card__list">
        <li class="teams__card__position me-auto d-flex">
        <div class="teams__card__position__wrap"></div>
        </li>
        <li class="teams__card__profile d-flex"></li>
      </ul>
    </div>
  </div>
  `

  const teamMemberProfile = card.querySelector('.teams__card__profile.d-flex')
  team.members.forEach((member) => {
    const memberImage = document.createElement('img')
    memberImage.src = member.image
    memberImage.alt = 'Avatar'
    memberImage.width = 32
    memberImage.height = 32
    memberImage.className = 'rounded-circle border border-white'

    const listItem = document.createElement('li')
    listItem.className = 'teams__card__profile__img'
    listItem.appendChild(memberImage)

    teamMemberProfile.appendChild(listItem)
  })

  const teamMembersPosition = card.querySelector('.teams__card__position__wrap')
  const positionSet = new Set()
  team.members.forEach((member) => {
    positionSet.add(member.position)
  })
  const PositionsList = Array.from(positionSet)
  PositionsList.forEach((position) => {
    const memberPosition = document.createElement('span')
    memberPosition.innerText = position
    memberPosition.className = 'teams__card__position__txt'
    teamMembersPosition.appendChild(memberPosition)
  })
  return card
}

export function addTeamToHTML(teamCard) {
  const teamsContainer = document.querySelector('.teams__contents')
  teamsContainer.appendChild(teamCard)
}
