import { Component } from "../../modules";
import employeeStore, { getEmployee } from "../../store/employee";
import EmployeeItem from "./EmployeeItem";

export default class EmployeeList extends Component {
  constructor() {
    super();
    employeeStore.subscribe("employees", () => {
      this.render();
    });
    employeeStore.subscribe("loading", () => {
      this.render();
    });
  }
  render() {
    this.el.classList.add("employee-list");
    this.el.innerHTML = /* html */ `
        <div class="btn-container">
             <button class="btn btn-bring">불러오기</button>
            <a href="#/register">
                <button class="btn btn-plus">직원 등록</button>
            </a>
        </div>
        <div class="employee-list-template">
            <div class="image">프로필 사진</div>
            <div class="name">이름</div>
            <div class="email">이메일</div>
            <div class="phone">휴대폰 번호</div>
            <div class="division">직급</div>
        </div>
        <div class="employees"></div>
        <div class="the-loader hide"></div>
    `;

    const imployeesEl = this.el.querySelector(".employees");
    imployeesEl?.append(
      ...employeeStore.state.employees.map((item) => {
        return new EmployeeItem({ item }).el;
      })
    );
    const btnBringEl = this.el.querySelector(".btn-bring");
    btnBringEl.addEventListener("click", () => {
      getEmployee();
    });

    const loaderEl = this.el.querySelector(".the-loader");
    employeeStore.state.loading
      ? loaderEl.classList.remove("hide")
      : loaderEl.classList.add("hide");
  }
}
