import { db } from '../../js/common/firebase'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { addTeamToHTML, createTeamCard } from '../../js/common/teamList'

import { lazyLoad } from '../../js/common/lazy-load'

import * as bootstrap from 'bootstrap'
import './teams.scss'

export function initTeams() {
  const sortByTeam = (members) => {
    members.sort((a, b) => {
      return a.team.localeCompare(b.team)
    })
    return members
  }

  const getAllTeams = () => {
    return new Promise((resolve, reject) => {
      try {
        const q = query(collection(db, 'members'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const teamNames = new Set()
          querySnapshot.forEach((doc) => {
            teamNames.add(doc.data().team)
          })

          const teamsArray = Array.from(teamNames)
          resolve(teamsArray)
        })
      } catch (error) {
        console.error('팀 목록 가져오기 오류:', error)
        reject(error)
      }
    })
  }

  const getUsersByTeam = (teamName) => {
    return new Promise((resolve, reject) => {
      try {
        const q = query(collection(db, 'members'), where('team', '==', teamName), orderBy('name'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const members = []
          querySnapshot.forEach((doc) => {
            members.push(doc.data())
          })
          resolve(members)
        })
      } catch (error) {
        console.error('데이터 가져오기 오류:', error)
        reject(error)
      }
    })
  }

  // 메인 함수: 모든 팀 목록 가져오기 및 사용자 정렬
  const main = async () => {
    try {
      const teamNames = await getAllTeams()
      for (const teamName of teamNames) {
        const members = await getUsersByTeam(teamName)
        const sortedMembers = sortByTeam(members)
        const teamData = {
          teamName: teamName,
          members: sortedMembers,
        }

        const teamCard = createTeamCard(teamData)

        addTeamToHTML(teamCard)
        lazyLoad()
      }
    } catch (error) {
      console.error('전체 프로세스 오류:', error)
    }
  }

  main()
}
