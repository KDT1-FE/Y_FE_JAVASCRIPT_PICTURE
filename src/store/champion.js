import { Store } from "../core/core";
import champInfo from "../info/champInfo.json"

const store = new Store({
  searchText: "",
  champions : [],
  loading : false,
  page: 1,
  maxLength: 0,
  message:"",
  storage : [],
  isDeleteState : false,
  deleteObj : {}
})

export default store

// state.storage에서 page 받을 수 만큼 slicing에서 state.champion 을 변경해줌
export const searchChampions = (page = 1) =>{
  setLocalStorage()
  store.state.page = page
  try{
    store.state.maxLength = store.state.storage.length
    store.state.champions = store.state.storage
      .slice(0,page*10<=store.state.maxLength
        ? page*10
        : store.state.maxLength)
  }catch(err){
    console.error(err)
  }
}

// localStorage에 있는 배열에서 특정 단어가 들어 있는 경우만 filter하여 state.storage를 변경하고 searchChampion 함수 호출
export const searchChampionsbyName = () => {
  store.state.page = 1
  
  const reg = new RegExp(store.state.searchText)

  store.state.storage = [
    ...JSON.parse(localStorage.getItem('champ'))['char']
    .filter(obj=>reg.test(obj['name']))
  ]
  searchChampions()
}

// Home 렌더링 시 한번 실행, 초기에 Home 렌더링 다 됐을 때 보여지는 화면 구성
export const initializeChampionList = ()=>{
  // localStorage가 비어 있는 경우 JSON 파일에서 정보 가져오기
  setLocalStorage()

  // storage, maxLength, champions 업데이트
  store.state.storage = JSON.parse(localStorage.getItem('champ'))['char']
  store.state.maxLength = store.state.storage.length
  store.state.champions = store.state.storage
  .slice(0, 10 <= store.state.maxLength
    ? 10
    : store.state.maxLength)
}

// 챔피언 정보를 LocalStorage에 저장
export const setLocalStorage = () => {
  // 개발용
  // localStorage.clear()

  if(!localStorage.length){
    localStorage.setItem('champ',JSON.stringify(champInfo))
  }
}

