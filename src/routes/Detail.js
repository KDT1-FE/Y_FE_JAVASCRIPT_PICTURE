import { Component } from "../core";
import { TheTitle } from "../components/commons/TheTitle";
import { DetailContents } from "../components/detail/DetailContents";
import { DetailDeleteModal } from "../components/detail/DetailDeleteModal";

export default class DetailContent extends Component {
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
          titleTxt: "직원 상세 정보 페이지",
          descTxt: "직원의 정보 및 사진을 관리하는 페이지 입니다.",
        },
      }).el,
    );

    container.append(new DetailContents().el, new DetailDeleteModal().el);
  }
}
