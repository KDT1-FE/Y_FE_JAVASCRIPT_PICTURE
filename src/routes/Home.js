import { Component } from "../core/core";
import Headline from "../components/Headline";
import Search from "../components/Search";
import ChampionList from "../components/ChampionList";

export default class Home extends Component{
  render(){
    const headline = new Headline().el
    const search = new Search().el
    const championlist = new ChampionList().el
    this.el.classList.add('container')
    this.el.append(
      headline,
      search,
      championlist
      )
  }
}