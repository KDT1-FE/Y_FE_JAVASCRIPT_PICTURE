import { Component } from "../core";
import { TheTitle } from "../components/commons/TheTitle";
import CreateContents from "../components/create/CreateContents";
import ImageEditorModal from "../components/create/ImageEditorModal";
export default class CreateContent extends Component {
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
          titleTxt: "직원 추가 페이지",
          descTxt: "직원 사진을 추가하는 페이지 입니다.",
        },
      }).el,
      new CreateContents({ props: { mode: "create" } }).el,
      new ImageEditorModal().el,
    );
  }
}
