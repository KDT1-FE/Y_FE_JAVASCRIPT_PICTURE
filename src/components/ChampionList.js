import { Component } from "../core/core";
import championStore, { searchChampions} from "../store/champion";
import championItem from "./ChampionItem"

export default class ChampionList extends Component{
  constructor(){
    super()
    championStore.subscribe("champions",()=>{
      this.render()
    })
  }
  render(){
    this.el.classList.add('championlist')
    this.el.innerHTML = /* html */`
      <div class="champions"></div>
      <p class="champions-end"> </p>
    `
    const championsEl = this.el.querySelector('.champions')
    
    championsEl.append(
      ...championStore.state.champions.map(e => new championItem(e).el)     
    )
    
    const endEl = this.el.querySelector('.champions-end')
    const observer = new IntersectionObserver(entries=>{
      observerCb(entries)
    },{threshold:0.5})

    const observerCb = entries => {
      if(championStore.state.page*10 >= championStore.state.maxLength){
        observer.unobserve(endEl)
      }
      if(entries[0].isIntersecting){
        console.log('intersecting now')
        searchChampions(++championStore.state.page)
      }
    }

    if(championStore.state.storage.length>10){
      observer.observe(endEl)
    }

    // 이슈 발생! => 컴퓨터 화면에 옵저버 관측 요소가 나타나있음에도 스크롤 이벤트가 없으면
    // 옵저버 콜백함수가 실행되지 않음
    // 랜더링 될 때마다, endEl 요소가 화면에 나타났을 경우 Observer Intersection 강제 실행
    // window.addEventListener('load',()=>{
    //   if(endEl.getBoundingClientRect().top < window.innerHeight){
    //     console.log('why 계속 실행될까?', 'page',championStore.state.page)
    //     searchChampions(++championStore.state.page)
    //   }
    // })


  }
}