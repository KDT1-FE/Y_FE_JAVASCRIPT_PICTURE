import { Component } from "../core";
import { TheTitle } from "../components/commons/TheTitle";
import CreateContents from "../components/create/CreateContents";
import ImageEditorModal from "../components/create/ImageEditorModal";
import { getMember } from "../libraries/firebase-firestore";
import memberStore from "../store/memberlist";

export default class UpdateContent extends Component {
  constructor() {
    super({
      tagName: "main",
    });
  }
  async render() {
    const container = document.createElement("div");
    container.className = "container mx-auto px-4";
    this.el.className = "main-contents min-h-screen bg-[#f2f2f2] py-4";
    this.el.append(container);

    await getMember(history.state.id);
    const { memberDetail } = memberStore.state;

    container.append(
      new TheTitle({
        props: {
          titleTxt: "직원 정보 수정 페이지",
          descTxt: "직원의 정보 및 사진을 수정하는 페이지 입니다.",
        },
      }).el,
      new CreateContents({ props: { mode: "update", memberDetail } }).el,
      new ImageEditorModal().el,
    );
  }
}
