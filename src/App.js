import { Component } from "./modules";
import Header from "./components/Common/Header";

export default class App extends Component {
  render() {
    const theHeader = new Header().el;
    const routerView = document.createElement("router-view");
    this.el.append(theHeader, routerView);
  }
}
