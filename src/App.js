import { Component } from "./core/core";

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    const routerView = document.createElement("router-view");
    this.el.append(routerView);
  }
}
