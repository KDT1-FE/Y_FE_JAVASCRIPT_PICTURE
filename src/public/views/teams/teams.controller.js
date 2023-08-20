import { db } from '../../js/common/firebase'
import { doc, deleteDoc, addDoc, setDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { addTeamToHTML, createTeamCard } from '../../js/common/teamList'

import { lazyLoad } from '../../js/common/lazy-load'

import * as bootstrap from 'bootstrap'
import './teams.scss'

export function initTeams() {
  // 사용자를 팀 이름으로 정렬하는 함수
  const sortByTeam = (members) => {
    members.sort((a, b) => {
      return a.team.localeCompare(b.team)
    })
    return members
  }

  // 모든 팀 목록을 가져오는 함수
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

  // 특정 팀의 사용자를 가져오는 함수
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
        console.log(`${teamName} 사용자 (팀별 정렬):`, sortedMembers)

        // 팀 데이터 객체 생성
        const teamData = {
          teamName: teamName,
          members: sortedMembers,
        }

        // 팀 데이터를 사용하여 팀 카드 생성
        const teamCard = createTeamCard(teamData)

        // 팀 카드를 DOM에 추가
        addTeamToHTML(teamCard)
        lazyLoad()
      }
    } catch (error) {
      console.error('전체 프로세스 오류:', error)
    }
  }

  // 메인 함수 실행
  main()
}
