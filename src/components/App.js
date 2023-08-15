import { Component } from "../core";
import { TheHeader } from "../components/commons/TheHeader";
import { TheFooter } from "../components/commons/TheFooter";

export default class App extends Component {
  render() {
    this.el.className = "App";
    const routerView = document.createElement("router-view");
    this.el.append(new TheHeader().el, routerView, new TheFooter().el);
  }
}
