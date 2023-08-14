import { Component } from './core/core'
import {setLocalStorage} from './store/champion'

export default class App extends Component{
  render(){
    const routerView = document.createElement('router-view')
    history.scrollRestoration = 'manual'
    this.el.append(routerView)
    setLocalStorage()
  }
}