import { Component } from "../core";
import { TheHeader } from "../components/commons/TheHeader";
import { TheFooter } from "../components/commons/TheFooter";

export default class App extends Component {
  render() {
    const routerView = document.createElement("router-view");
    this.el.append(new TheHeader().el, routerView);
    this.el.append(new TheFooter().el);
  }
}
