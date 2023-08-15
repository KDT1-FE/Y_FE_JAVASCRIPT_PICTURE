import { Component } from "../modules";
import Headline from "../components/Home/Headline";
import Search from "../components/Home/Search";
import EmployeeList from "../components/Home/EmployeeList";

export default class Home extends Component {
  render() {
    const headline = new Headline().el;
    const search = new Search().el;
    const employeeList = new EmployeeList().el;

    this.el.classList.add("container");
    this.el.append(headline, search, employeeList);
  }
}
