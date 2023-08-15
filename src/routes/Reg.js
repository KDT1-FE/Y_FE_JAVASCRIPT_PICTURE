import { Component } from "../modules";
import RegHeadline from "../components/Reg/RegHeadline";
import RegForm from "../components/Reg/RegForm";

export default class Reg extends Component {
  render() {
    const regHeadline = new RegHeadline().el;
    const regForm = new RegForm().el;

    this.el.classList.add("container");
    this.el.append(regHeadline, regForm);
  }
}
