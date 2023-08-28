export class Component {
  constructor(payload = {}) {
    const { tagName = 'div', props = {}, state = {} } = payload;
    this.componentRoot = document.createElement(tagName);
    this.props = props;
    this.state = state;
    this.render();
  }
  render() {}
}
