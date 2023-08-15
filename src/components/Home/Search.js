import { Component } from "../../modules";
import employeeStore, { searchEmployee } from "../../store/employee";

export default class Search extends Component {
  render() {
    this.el.classList.add("search");
    this.el.innerHTML = /* html */ `
            <input value="${employeeStore.state.searchText}" placeholder="직원의 이름을 입력해보세요">
            <button class="btn">검색</button>
    `;

    const inputEl = this.el.querySelector("input");
    inputEl.addEventListener("input", () => {
      employeeStore.state.searchText = inputEl.value;
    });
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && employeeStore.state.searchText.trim()) {
        searchEmployee(employeeStore.state.searchText);
      }
    });
    const btnEl = this.el.querySelector("button");
    btnEl.addEventListener("click", () => {
      searchEmployee(employeeStore.state.searchText);
    });
  }
}
