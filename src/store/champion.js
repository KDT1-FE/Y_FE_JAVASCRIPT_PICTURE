import { Store } from "../core/core";
import champInfo from "../info/champInfo.json"

const store = new Store({
  searchText: "",
  champions : [],
  loading : false,
  page: 1,
  maxLength: 0,
  message:"",
  storage : []
})

export default store
export const searchChampions = (page = 1) =>{
  setLocalStorage()
  store.state.loading = true
  store.state.page = page
  try{
    if(!store.state.storage.length){
      store.state.storage = JSON.parse(localStorage.getItem('champ'))['char']
    }
    // if(page === 1){
      
    // }
    store.state.maxLength = store.state.storage.length
    store.state.champions = [...store.state.storage
      .slice(0,page*10<=store.state.maxLength
        ? page*10
        : store.state.maxLength)]
  }catch(err){
    console.error(err)
  }finally{
    store.state.loading = false
  }

}

// 챔피언 정보를 LocalStorage에 저장
export const setLocalStorage = () => {
  // 개발용
  // localStorage.clear()

  if(!localStorage.length){
    localStorage.setItem('champ',JSON.stringify(champInfo))
  }
}