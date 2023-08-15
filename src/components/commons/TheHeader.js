import { Component } from "../../core/";

export class TheHeader extends Component {
  constructor() {
    super({
      tagName: "header",
    });
  }
  render() {
    this.el.className = "ems-header py-4";
    this.el.id = "ems-header";
    this.el.innerHTML = /* html */ `
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <a href="#/"><h1 class="text-md">EMS(Employees Management System) JS</h1></a>
          <div class="w-12 rounded-full overflow-hidden aspect-square">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/ems-js-222d0.appspot.com/o/blank-profile.png?alt=media&token=ab1a5363-67f6-4e0e-aed9-a9b8f784e43d"
              alt="User Profile" />
          </div>
        </div>
        
      </div>
    `;
  }
}
