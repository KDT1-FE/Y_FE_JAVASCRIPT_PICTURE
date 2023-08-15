import { Component } from "../../modules";

export default class Header extends Component {
  constructor() {
    super({
      tagName: "header",
      state: {
        menus: [
          {
            name: "직원 검색",
            href: "#/",
          },
          {
            name: "직원 등록",
            href: "#/register",
          },
          {
            name: "직원 상세",
            href: "#/detail",
          },
        ],
      },
    });
    window.addEventListener("popstate", () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
            <a href="#/" class="logo"><span>Employee</span>DB</a>
            <nav>
            <ul>
                ${this.state.menus
                  .map((menu) => {
                    const href = menu.href.split("?")[0];
                    const hash = location.hash.split("?")[0];

                    const isActive = href === hash;

                    return /* html */ `
                        <li>
                            <a 
                                class="${isActive ? "active" : ""}"
                                href="${menu.href}">
                                ${menu.name}
                            </a>
                        </li>
                    `;
                  })
                  .join("")}
            </ul>
        </nav>
        `;
  }
}
