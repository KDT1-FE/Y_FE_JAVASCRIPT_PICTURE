import { Component } from "../modules";
import DetailHeadline from "../components/Detail/DetailHeadline";
import DetailItem from "../components/Detail/DetailItem";

export default class Detail extends Component {
  render() {
    const detailHeadline = new DetailHeadline().el;
    const detailItem = new DetailItem().el;

    this.el.classList.add("container");
    this.el.append(detailHeadline, detailItem);
  }
}
