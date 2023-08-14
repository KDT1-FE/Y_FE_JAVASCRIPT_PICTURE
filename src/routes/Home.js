import { Component } from "../core";
import { TheTitle } from "../components/commons/TheTitle";
import { HomeSearch } from "../components/index/HomeSearch";
import { HomeMember } from "../components/index/HomeMember";
import { HomeDeleteModal } from "../components/index/HomeDeleteModal";

export default class HomeContent extends Component {
  constructor() {
    super({
      tagName: "main",
    });
  }
  render() {
    const container = document.createElement("div");
    container.className = "container mx-auto px-4";
    this.el.className = "main-contents min-h-screen bg-[#f2f2f2] py-4";
    this.el.append(container);
    container.append(
      new TheTitle({
        props: {
          titleTxt: "직원 관리 페이지",
          descTxt: "직원의 정보 및 사진을 관리하는 페이지 입니다.",
        },
      }).el,
    );
    container.append(
      new HomeSearch().el,
      new HomeMember().el,
      new HomeDeleteModal().el,
    );
  }
}
