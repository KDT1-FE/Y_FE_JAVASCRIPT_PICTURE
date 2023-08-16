import { Component } from "../../core";
import TuiImageEditor from "tui-image-editor";
import memberStore from "../../store/memberlist";
import { url2File } from "../../js/dataUrlConverter.js";

import "tui-image-editor/dist/tui-image-editor.css";

export default class ImageEditor extends Component {
  constructor() {
    super();
    memberStore.subscribe("file", () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.id = "tui-image-editor";

    const completeBtn = document.createElement("button");
    completeBtn.className =
      "absolute top-2.5 right-2.5 text-white rounded-md border-0 bg-blue-600 p-3";
    completeBtn.innerHTML = /* html */ `
      <span class="material-icons md-18 align-middle">edit</span>수정완료
    `;
    completeBtn.addEventListener("click", async () => {
      const imageEditorModal = document.getElementById("ImageEditorModal");
      const dataUrl = instance.toDataURL();
      const imgThumb = document.querySelector("#img-thumb img");
      imgThumb.src = dataUrl;

      memberStore.state.file = await url2File(
        dataUrl,
        memberStore.state.file.name,
      );
      console.log(memberStore.state.file);
      imageEditorModal.close();
    });
    this.el.className = "h-[800px] relative";
    this.el.append(wrapper, completeBtn);

    const instance = new TuiImageEditor(
      this.el.querySelector("#tui-image-editor"),
      {
        includeUI: {
          loadImage: {
            path: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            name: "Blank",
          },
          menuBarPosition: "bottom",
        },
        cssMaxWidth: 700,
        cssMaxHeight: 700,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70,
        },
      },
    );

    if (memberStore.state.file !== undefined) {
      //
      const {
        state: { file },
      } = memberStore;

      setTimeout(() => {
        instance.loadImageFromFile(file, "annotatedFile").then(() => {});
      }, 100);
    } else {
      // TODO: 정보수정 페이지에서
    }
  }
}
