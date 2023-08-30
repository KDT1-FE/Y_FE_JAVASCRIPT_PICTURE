export class Component {
  constructor(payload = {}) {
    const {
      tagName = 'div',
      props = {},
      state = {},
      attributes = {},
    } = payload;
    this.componentRoot = document.createElement(tagName);
    this.props = props;
    this.state = state;
    for (const key of Object.keys(attributes)) {
      if (key === 'class') {
        this.componentRoot.classList.add(attributes[key]);
        continue;
      }
      this.componentRoot.setAttribute(key, attributes[key]);
    }
    this.render();
  }
  render() {}
}
