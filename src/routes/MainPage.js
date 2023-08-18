import EmployeeList from "../components/MainPage/EmployeeList"
import Menu from "../components/Menu/Menu"
import Component from "../core/Component"

export default class MainPage extends Component {
  render() {
    this.el.classList.add("mainpage")
    const menu = new Menu()
    const employeeList = new EmployeeList()
    this.el.append(menu.el, employeeList.el)
  }
}