import { Component } from "../core/core";
import championStore, { searchChampions } from "../store/champion";
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
    if(championStore.state.page === 1){
      searchChampions(championStore.state.page)
    }
    
    const championsEl = this.el.querySelector('.champions')
    
    championsEl.append(
      ...championStore.state.champions.map(e => new championItem(e).el)     
    )
    
    const endEl = this.el.querySelector('.champions-end')
    const observer1 = new IntersectionObserver(entries=>observercb(entries[0]))
    
    const observercb = entry => {
        if(entry.isIntersecting){
          searchChampions(++championStore.state.page)
        }
        if(championStore.state.page*10 >= championStore.state.maxLength){
          observer1.unobserve(endEl)
        }
    }
    
    observer1.observe(endEl)
  
  }
}