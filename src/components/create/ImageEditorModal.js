import { Component } from "../../core";
import ImageEditor from "../editor/ImageEditor";

export default class ImageEditorModal extends Component {
  constructor() {
    super({
      tagName: "dialog",
    });
  }
  render() {
    this.el.className = "container m-auto h-screen md:h-[800px] md:rounded-xl";
    this.el.id = "ImageEditorModal";
    this.el.append(new ImageEditor().el);

    this.el.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.el.close();
    });
  }
}
