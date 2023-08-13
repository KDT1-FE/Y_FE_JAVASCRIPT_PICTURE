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

      window.addEventListener('load',()=>{
        if(endEl.getBoundingClientRect().top < window.innerHeight){
          console.log('intersecting by window onload')
          searchChampions(++championStore.state.page)
        }
      })

      if(championStore.state.storage.length>10){
        observer.observe(endEl)
      }
      
      }

}