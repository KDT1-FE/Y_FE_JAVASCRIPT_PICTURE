import { Component } from './core/core'

export default class App extends Component{
  render(){
    const routerView = document.createElement('router-view')

    this.el.append(routerView)
  }
}