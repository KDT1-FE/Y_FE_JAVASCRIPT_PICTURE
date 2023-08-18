import { getEmployeeList } from "../../api/api"
import Component from "../../core/Component"
import Employee from "./Employee"

export default class EmployeeList extends Component {
  constructor() {
    super() 
    this.el.classList.add("employee-list")
  }
  async render() {
    const data = await getEmployeeList() // data.data.listUsers.items = 데이터 배열
    data.data.listUsers.items.map(item => {
      const employee = new Employee(item)
      this.el.append(employee.el)
    })
  }
}