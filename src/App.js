import { Component } from './core/core'

export default class App extends Component{
  render(){
    const routerView = document.createElement('router-view')
    history.scrollRestoration = 'manual'
    this.el.append(routerView)
  }
}