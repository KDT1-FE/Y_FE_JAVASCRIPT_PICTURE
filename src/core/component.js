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
    this.setAttributes(attributes);
    this.render();
    this.setEvent();
  }
  render() {
    this.componentRoot.innerHTML = this.template();
    this.mounted();
  }

  setAttributes(attributes) {
    for (const key of Object.keys(attributes)) {
      if (key === 'class') {
        this.componentRoot.classList.add(attributes[key]);
        continue;
      }
      this.componentRoot.setAttribute(key, attributes[key]);
    }
  }

  template() {}

  setEvent() {}

  addEvent(eventType, selector, callback) {
    this.componentRoot.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }

  mounted() {}
}
