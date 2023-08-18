import Header from "./components/Header/Header"
import Component from "./core/Component"

export default class App extends Component {
  constructor() {
    super()
    this.el.classList.add("app")
    const header = new Header()
    const routerView = document.createElement('router-view')
    this.el.append(header.el, routerView)
  }
}