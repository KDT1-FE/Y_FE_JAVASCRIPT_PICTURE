import { Component } from "../core/core";
import store, { searchChampions } from "../store/champion";
import championItem from "./ChampionItem"

export default class ChampionList extends Component{
  render(){
    this.el.classList.add('championlist')
    this.el.innerHTML = /* html */`
      <div class="champions"></div>
    `
    searchChampions(store.state.page)

    const championsEl = this.el.querySelector('.champions')
    console.log(store.state.champions)
    championsEl.append(
      ...store.state.champions.map(e => new championItem(e).el)     
    )

    console.log(store.state)
  }
}